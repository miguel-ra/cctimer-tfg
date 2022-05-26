import { child, get, onChildAdded, onValue, push, ref, set, update } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

import firebase from "shared/firebase";

type Paths = "signal" | "offer" | "answer" | "candidates" | "peers";

type MeshId = string;
enum MeshStatus {
  "connecting",
  "connected",
  "failed",
}

type PeerId = string;
enum PeerStatus {
  "closed",
  "connecting",
  "connected",
  "failed",
}
type Peer = {
  connection: RTCPeerConnection;
  status: PeerStatus;
  channel?: RTCDataChannel;
};
type PeerAnswer = {
  peerId: string;
  sdp: string | undefined;
  type: RTCSdpType;
};

type PeerCandidate = {
  peerId: PeerId;
  candidate?: string | undefined;
  sdpMLineIndex?: number | null | undefined;
  sdpMid?: string | null | undefined;
  usernameFragment?: string | null | undefined;
};
type PeerOffer = {
  peerId: string;
  sdp: string | undefined;
  type: RTCSdpType;
};
type PeerSignal = {
  answer: PeerAnswer;
  candidates: { [key in string]: PeerCandidate };
  offer: PeerOffer;
};
type Peers = {
  [key in PeerId]: Peer;
};

type MessageId = string;
enum MessageType {
  Answer = "answer",
  Candidate = "candidate",
  Handshake = "handshake",
  Hello = "hello",
  Offer = "offer",
  Ping = "ping",
}
type DrafMessage = {
  uuid?: MessageId;
  type: MessageType;
  data?: any;
  from?: PeerId;
  to?: PeerId;
};
type Message = DrafMessage & {
  uuid: MessageId;
  from: PeerId;
};

const rtcConfig = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"], // free stun server
    },
  ],
  iceCandidatePoolSize: 10,
};
const peerChannelLabel = "mesh";

class Mesh {
  private status: MeshStatus;
  private meshId: MeshId;
  private peerId: PeerId;
  private peerList: Peers = {};
  private messages: { [key in MessageId]: true } = {};
  private paths: { [key in Paths]: string };

  constructor(meshId: MeshId, peerId: PeerId) {
    this.meshId = meshId;
    this.peerId = peerId;
    this.status = MeshStatus.connecting;

    const signalPath = `/signals/${meshId}`;
    this.paths = {
      signal: signalPath,
      offer: `${signalPath}/offer`,
      answer: `${signalPath}/answer`,
      candidates: `${signalPath}/candidates`,
      peers: `${signalPath}/peers`,
    };

    get(child(ref(firebase.db), this.paths.offer))
      .then((snapshot) => {
        const offer = snapshot.val() as PeerOffer;
        if (!offer) {
          this.startHost();
        } else {
          this.startNode();
        }
      })
      .catch((error) => {
        console.log(error);
        this.status = MeshStatus.failed;
      });

    this.handleDataChannelMessage = this.handleDataChannelMessage.bind(this);
  }

  private async createPeerConnection() {
    const peerConnection = new RTCPeerConnection(rtcConfig);

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        const candidateKey = push(child(ref(firebase.db), this.paths.candidates)).key;
        const updates = {
          [`${this.paths.candidates}/${candidateKey}`]: {
            ...event.candidate.toJSON(),
            peerId: this.peerId,
          },
        };

        return update(ref(firebase.db), updates);
      }
    };

    peerConnection.onconnectionstatechange = (event) =>
      console.log(`onconnectionstatechange`, peerConnection.connectionState);
    peerConnection.oniceconnectionstatechange = (event) =>
      console.log(`oniceconnectionstatechange`, peerConnection.iceConnectionState);
    peerConnection.onicegatheringstatechange = (event) =>
      console.log(`onicegatheringstatechange`, peerConnection.iceGatheringState);
    peerConnection.onsignalingstatechange = (event) =>
      console.log(`onsignalingstatechange`, peerConnection.signalingState);

    return peerConnection;
  }

  private configPeerChannel(peerChannel: RTCDataChannel, confimationPeer: PeerId): RTCDataChannel {
    peerChannel.onopen = (event) => {
      console.log(`onopen`, event);
      this.sendMessage({ type: MessageType.Handshake, to: confimationPeer });
    };

    peerChannel.onclose = (event) => {
      console.log(`onclose`, event);
      this.peerList[confimationPeer].status = PeerStatus.closed;
    };
    peerChannel.onerror = (event) => {
      console.log(`onerror`, event);
      this.peerList[confimationPeer].status = PeerStatus.failed;
    };
    peerChannel.onmessage = this.handleDataChannelMessage;
    // peerChannel.onbufferedamountlow = (event) => console.log(`onbufferedamountlow`, event);

    return peerChannel;
  }

  private async createOffer() {
    const peerConnection = await this.createPeerConnection();

    const peerChannel = peerConnection.createDataChannel(peerChannelLabel);

    const offerDescription = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offerDescription);

    const offer: PeerOffer = {
      peerId: this.peerId,
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    return { connection: peerConnection, channel: peerChannel, offer };
  }

  private async startHost() {
    let { connection, channel, offer } = await this.createOffer();

    try {
      await set(ref(firebase.db, this.paths.signal), {
        peers: this.getPeerList(),
        offer,
        answer: null,
      });
    } catch (error) {
      console.log(error);
    }

    onValue(ref(firebase.db, this.paths.answer), async (snapshot) => {
      const answer = snapshot.val() as PeerAnswer;

      if (answer) {
        this.configPeerChannel(channel, answer.peerId);

        const answerDescription = new RTCSessionDescription(answer);
        connection.setRemoteDescription(answerDescription);

        this.peerList[answer.peerId] = {
          connection,
          channel,
          status: PeerStatus.connected,
        };

        ({ connection, channel, offer } = await this.createOffer());

        try {
          const updates = {
            [this.paths.peers]: this.getPeerList(),
            [this.paths.offer]: offer,
            [this.paths.answer]: null,
          };

          return update(ref(firebase.db), updates);
        } catch (error) {
          console.log(error);
        }
      }
    });

    onChildAdded(ref(firebase.db, this.paths.candidates), (snapshot) => {
      const { peerId: candidatePeerId, ...candidate } = snapshot.val() as PeerCandidate;

      if (candidatePeerId !== this.peerId) {
        this.peerList[candidatePeerId].connection.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });
  }

  private async startNode() {
    const signalSnapshot = await get(child(ref(firebase.db), this.paths.signal));

    if (signalSnapshot.exists()) {
      const signal = signalSnapshot.val() as PeerSignal;
      const offer = signal.offer;
      const candidates = Object.values(signal.candidates) as PeerCandidate[];

      const peer: Peer = {
        connection: await this.createPeerConnection(),
        status: PeerStatus.connecting,
      };
      this.peerList[offer.peerId] = peer;

      peer.connection.ondatachannel = (event) => {
        peer.channel = this.configPeerChannel(event.channel, offer.peerId);
      };

      await peer.connection.setRemoteDescription(new RTCSessionDescription(offer));
      const answerDescription = await peer.connection.createAnswer();
      await peer.connection.setLocalDescription(answerDescription);

      candidates.forEach(({ peerId: _peerId, ...candidate }) => {
        peer.connection.addIceCandidate(new RTCIceCandidate(candidate));
      });

      const answer: PeerAnswer = {
        peerId: this.peerId,
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };

      try {
        await set(ref(firebase.db, this.paths.answer), answer);
      } catch (error) {
        console.log(error);
        peer.status = PeerStatus.failed;
      }
    }
  }

  private sendMessage({ uuid = uuidv4(), from = this.peerId, ...draftMessage }: DrafMessage) {
    const message: Message = { ...draftMessage, uuid, from };
    const rawMessage = JSON.stringify(message);

    this.messages[uuid] = true;

    if (
      message.to &&
      this.peerList[message.to].status === PeerStatus.connected &&
      this.peerList[message.to]?.channel
    ) {
      this.peerList[message.to].channel?.send(rawMessage);
    } else {
      Object.values(this.peerList).forEach((peer) => {
        if (peer.status === PeerStatus.connected && peer.channel) {
          peer.channel.send(rawMessage);
        }
      });
    }
  }

  private async handleDataChannelMessage({ data: rawMessage }: MessageEvent) {
    const message: Message = JSON.parse(rawMessage);
    const { uuid, type, data, from, to } = message;

    if (this.messages[uuid]) {
      return;
    }

    this.messages[uuid] = true;
    console.log(message);

    if (!to) {
      this.sendMessage(message);
    } else if (to !== this.peerId) {
      this.sendMessage(message);
      return;
    }

    switch (type) {
      case MessageType.Handshake: {
        this.peerList[from].status = PeerStatus.connected;
        if (this.status !== MeshStatus.connected) {
          this.status = MeshStatus.connected;
          this.sendMessage({ type: MessageType.Hello });
        }
        return;
      }

      case MessageType.Hello: {
        if (this.peerList[from]) {
          return;
        }
        const { connection, channel, offer } = await this.createOffer();

        this.peerList[from] = {
          connection,
          channel,
          status: PeerStatus.connecting,
        };

        connection.onicecandidate = (event) => {
          if (event.candidate) {
            const candidate = {
              ...event.candidate.toJSON(),
              peerId: this.peerId,
            };

            this.sendMessage({
              type: MessageType.Candidate,
              data: { candidate },
              to: from,
            });
          }
        };

        this.sendMessage({ type: MessageType.Offer, data: { offer }, to: from });

        return;
      }

      case MessageType.Offer: {
        const { offer } = data;

        const peer: Peer = {
          connection: await this.createPeerConnection(),
          status: PeerStatus.connecting,
        };
        this.peerList[offer.peerId] = peer;

        peer.connection.ondatachannel = (event) => {
          peer.channel = this.configPeerChannel(event.channel, offer.peerId);
        };

        await peer.connection.setRemoteDescription(new RTCSessionDescription(offer));
        const answerDescription = await peer.connection.createAnswer();
        await peer.connection.setLocalDescription(answerDescription);

        const answer: PeerAnswer = {
          peerId: this.peerId,
          type: answerDescription.type,
          sdp: answerDescription.sdp,
        };

        this.sendMessage({ type: MessageType.Answer, data: { answer }, to: from });

        return;
      }

      case MessageType.Answer: {
        const answerDescription = new RTCSessionDescription(data.answer);
        this.peerList[from].connection.setRemoteDescription(answerDescription);

        this.peerList[from].connection.ondatachannel = (event) => {
          this.peerList[from].channel = this.configPeerChannel(event.channel, data.answer.peerId);
        };

        return;
      }

      case MessageType.Candidate: {
        this.peerList[from].connection.addIceCandidate(new RTCIceCandidate(data.candidate));
        return;
      }

      default: {
        console.log(type, data);
        return;
      }
    }
  }

  getPeerList() {
    return [...Object.keys(this.peerList), this.peerId];
  }
}

export default Mesh;
