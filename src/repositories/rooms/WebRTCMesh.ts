import { BloomFilter } from "bloomfilter";
import { child, get, onChildAdded, onValue, push, ref, set, update } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import webrtcAdapter from "webrtc-adapter";

import firebase from "shared/firebase";

import Observable from "./Observable";
import PeerIdInUseError from "./webrtc/errors/PeerIdInUseError";
import { MeshId, MeshStatus } from "./webrtc/Mesh";
import { DrafMessage, Message, MessageType, SubscriptionMessage } from "./webrtc/Message";
import {
  Peer,
  PeerAnswer,
  PeerCandidate,
  PeerId,
  PeerOffer,
  PeersCollection,
  PeerSignal,
} from "./webrtc/Peer";

enum Browser {
  firefox = "firefox",
}

type Path = "signal" | "offer" | "answer" | "candidates" | "peers";
type PathsCollection = { [key in Path]: string };

const RTC_CONFIG = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"], // free stun server
    },
    {
      username: "t2bV14SjMpprZKHwyVl2AYhfGvH1aP_giLcf1wBLppY-7ufVsVnWiSeyPi1t5YjpAAAAAGKjxAttaWd1ZWxyYQ==",
      credential: "c0e1a782-e90b-11ec-b8f9-0242ac120004",
      urls: [
        "turn:fr-turn1.xirsys.com:80?transport=udp",
        "turn:fr-turn1.xirsys.com:3478?transport=udp",
        "turn:fr-turn1.xirsys.com:80?transport=tcp",
        "turn:fr-turn1.xirsys.com:3478?transport=tcp",
        "turns:fr-turn1.xirsys.com:443?transport=tcp",
        "turns:fr-turn1.xirsys.com:5349?transport=tcp",
      ],
    },
  ],
  iceCandidatePoolSize: 10,
};
const PEER_CHANNEL_LABEL = "mesh";

class WebRTCMesh {
  public status: MeshStatus;
  public peerList: PeersCollection = {};
  private browser: string;
  private peerId: PeerId;
  private hostId?: PeerId;
  private bloomMessages: BloomFilter = new BloomFilter(32 * 256, 32);
  private paths: PathsCollection;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private observable: Observable<any> = new Observable();

  public get isHost() {
    return this.peerId === this.hostId;
  }

  static async init(meshId: MeshId, peerId: PeerId, skipPeerIdCheck = false) {
    const signalPath = `/signals/${meshId}`;
    const paths = {
      signal: signalPath,
      offer: `${signalPath}/offer`,
      answer: `${signalPath}/answer`,
      candidates: `${signalPath}/candidates`,
      peers: `${signalPath}/peers`,
    };

    const snapshot = await get(child(ref(firebase.db), paths.signal));
    const signal = snapshot.val() as PeerSignal | null;

    if (!skipPeerIdCheck && signal && signal.peers?.includes(peerId)) {
      throw new PeerIdInUseError();
    }

    return new WebRTCMesh({ peerId, paths, offer: signal?.offer });
  }

  constructor({ peerId, paths, offer }: { peerId: PeerId; paths: PathsCollection; offer?: PeerOffer }) {
    this.browser = webrtcAdapter.browserDetails.browser;
    this.peerId = peerId;
    this.paths = paths;

    if (!offer) {
      this.hostId = peerId;
      this.status = MeshStatus.creating;
      this.startHost();
    } else {
      this.status = MeshStatus.connecting;
      this.startNode();
    }

    this.handleDataChannelMessage = this.handleDataChannelMessage.bind(this);
  }

  private async createPeerConnection() {
    const peerConnection = new RTCPeerConnection(RTC_CONFIG);

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

    return peerConnection;
  }

  private configPeerChannel(peerChannel: RTCDataChannel, confimationPeer: PeerId): RTCDataChannel {
    peerChannel.onopen = () => {
      this.sendMessage({ type: MessageType.Handshake, to: confimationPeer });
      this.notifyUpdate();
    };

    peerChannel.onclose = () => {
      this.notifyUpdate();
    };
    peerChannel.onerror = () => {
      this.notifyUpdate();
    };
    peerChannel.onmessage = this.handleDataChannelMessage;

    return peerChannel;
  }

  private async createOffer() {
    const peerConnection = await this.createPeerConnection();

    const peerChannel = peerConnection.createDataChannel(PEER_CHANNEL_LABEL);

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

    await set(ref(firebase.db, this.paths.signal), {
      peers: this.getAllPeers(),
      offer,
      answer: null,
      hostId: this.peerId,
    });

    this.status = MeshStatus.connecting;
    this.notifyUpdate();

    onValue(ref(firebase.db, this.paths.answer), async (snapshot) => {
      const answer = snapshot.val() as PeerAnswer;

      if (answer) {
        channel = this.configPeerChannel(channel, answer.peerId);

        const answerDescription = new RTCSessionDescription(answer);
        connection.setRemoteDescription(answerDescription);

        this.peerList[answer.peerId] = {
          connection,
          channel,
        };
        this.status = MeshStatus.connected;
        this.notifyUpdate();

        ({ connection, channel, offer } = await this.createOffer());

        try {
          const updates = {
            [this.paths.peers]: this.getAllPeers(),
            [this.paths.offer]: offer,
            [this.paths.answer]: null,
          };

          return update(ref(firebase.db), updates);
        } catch (error) {}
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

      await set(ref(firebase.db, this.paths.answer), answer);
    }
  }

  private sendMessage({
    uuid = uuidv4(),
    from = this.peerId,
    type = MessageType.Default,
    ...draftMessage
  }: DrafMessage) {
    const message: Message = {
      ...draftMessage,
      uuid,
      from,
      type,
      browser: this.browser,
    };
    const rawMessage = JSON.stringify(message);

    this.bloomMessages.add(uuid);

    if (message.to && this.peerList[message.to].channel?.readyState === "open") {
      this.peerList[message.to].channel?.send(rawMessage);
    } else {
      Object.values(this.peerList).forEach((peer) => {
        if (peer.channel?.readyState === "open") {
          peer.channel.send(rawMessage);
        }
      });
    }
  }

  private async handleDataChannelMessage({ data: rawMessage }: MessageEvent) {
    const message: Message = JSON.parse(rawMessage);
    const { uuid, type, data, from, to, browser } = message;

    if (this.bloomMessages.test(uuid)) {
      return;
    }

    this.bloomMessages.add(uuid);

    if (!to) {
      this.sendMessage(message);
    } else if (to !== this.peerId) {
      this.sendMessage(message);
      return;
    }

    if (type !== MessageType.Default) {
      console.log({ type, data, from, to, browser });
    }

    switch (type) {
      case MessageType.Handshake: {
        if (this.status !== MeshStatus.connected) {
          this.status = MeshStatus.connected;
          this.sendMessage({ type: MessageType.Hello });
        }
        this.notifyUpdate();
        return;
      }

      case MessageType.Hello: {
        if (this.peerList[from]) {
          return;
        }

        if (browser === Browser.firefox && this.browser !== Browser.firefox) {
          this.sendMessage({ type: MessageType.Hello });
          return;
        }

        const { connection, channel, offer } = await this.createOffer();

        this.peerList[from] = {
          connection,
          channel: this.configPeerChannel(channel, from),
        };

        const peerId = this.peerId;
        connection.onicecandidate = (event) => {
          if (event.candidate?.candidate) {
            const candidate = {
              ...event.candidate.toJSON(),
              peerId: this.peerId,
            };

            console.log(event.candidate, this.peerId, from);
            this.sendMessage({
              type: MessageType.Candidate,
              data: { candidate },
              to: from,
            });
          }
        };

        setTimeout(() => {
          this.sendMessage({ type: MessageType.Offer, data: { offer }, to: from });
        }, 1000);

        return;
      }

      case MessageType.Offer: {
        const { offer } = data;

        const peer: Peer = {
          connection: new RTCPeerConnection(RTC_CONFIG),
        };

        peer.connection.ondatachannel = (event) => {
          this.peerList[offer.peerId].channel = this.configPeerChannel(event.channel, offer.peerId);
        };

        peer.connection.onicecandidate = (event) => {
          if (event.candidate?.candidate) {
            const candidate = {
              ...event.candidate.toJSON(),
              peerId: this.peerId,
            };
            console.log(event.candidate, this.peerId, from);

            this.sendMessage({
              type: MessageType.Candidate,
              data: { candidate },
              to: from,
            });
          }
        };

        await peer.connection.setRemoteDescription(new RTCSessionDescription(offer));
        const answerDescription = await peer.connection.createAnswer();
        await peer.connection.setLocalDescription(answerDescription);

        (peer.iceCandidates || []).forEach((candidate) => {
          peer.connection.addIceCandidate(new RTCIceCandidate(candidate as any));
        });
        peer.iceCandidates = [];

        this.peerList[offer.peerId] = {
          ...this.peerList[offer.peerId],
          ...peer,
        };

        const answer: PeerAnswer = {
          peerId: this.peerId,
          type: answerDescription.type,
          sdp: answerDescription.sdp,
        };

        setTimeout(() => {
          this.sendMessage({ type: MessageType.Answer, data: { answer }, to: from });
        }, 1000);

        return;
      }

      case MessageType.Answer: {
        const answerDescription = new RTCSessionDescription(data.answer);
        this.peerList[from].connection.setRemoteDescription(answerDescription);

        (this.peerList[from].iceCandidates || []).forEach((candidate) => {
          this.peerList[from].connection.addIceCandidate(new RTCIceCandidate(candidate as any));
        });
        this.peerList[from].iceCandidates = [];

        return;
      }

      case MessageType.Candidate: {
        const { peerId, ...candidate } = data.candidate;

        if (!this.peerList[peerId]) {
          this.peerList[peerId] = {
            ...this.peerList[peerId],
          };
        }

        const peer = this.peerList[peerId];

        if (!peer?.connection?.localDescription) {
          peer.iceCandidates = peer.iceCandidates || [];
          peer.iceCandidates?.push(candidate);
        } else {
          [...(peer.iceCandidates || []), data.candidate].forEach((candidate) => {
            setTimeout(() => {
              peer.connection.addIceCandidate(new RTCIceCandidate(candidate as any));
            }, 1000);
          });
          peer.iceCandidates = [];
        }
        return;
      }

      default: {
        this.notifyUpdate({ type, data });
        return;
      }
    }
  }

  private notifyUpdate(message?: Partial<SubscriptionMessage>) {
    this.observable.next({
      type: MessageType.Default,
      status: this.status,
      data: {},
      activePeers: this.getActivePeers(),
      ...message,
    });
  }

  getActivePeers() {
    const activePeers = Object.entries(this.peerList)
      .map(([key, peer]) => {
        if (peer.channel?.readyState === "open") {
          return key;
        }
        return undefined;
      })
      .filter(Boolean);

    return activePeers as string[];
  }

  private getAllPeers() {
    return [...Object.keys(this.peerList), this.peerId];
  }

  closeConnection() {
    Object.values(this.peerList).forEach((peer) => {
      if (peer.channel?.readyState === "open") {
        peer.connection.close();
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscribe(callback: (message: any) => void) {
    return this.observable.subscribe(callback);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendToAll(message: any) {
    this.sendMessage({ data: message });
  }
}

export default WebRTCMesh;
