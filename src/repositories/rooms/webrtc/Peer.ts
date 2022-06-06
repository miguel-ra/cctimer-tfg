type PeerId = string;

type Peer = {
  connection: RTCPeerConnection;
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
  peers: PeerId[];
};

type PeersCollection = {
  [key in PeerId]: Peer;
};

export type { PeerId, Peer, PeerAnswer, PeerCandidate, PeerOffer, PeerSignal, PeersCollection };
