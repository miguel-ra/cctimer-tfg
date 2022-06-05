import { MeshStatus } from "./Mesh";
import { PeerId } from "./Peer";

type MessageId = string;

enum MessageType {
  Answer = "answer",
  Candidate = "candidate",
  Handshake = "handshake",
  Hello = "hello",
  Offer = "offer",
  Ping = "ping",
  Default = "default",
}

type DrafMessage = {
  uuid?: MessageId;
  type?: MessageType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  from?: PeerId;
  to?: PeerId;
};

type Message = DrafMessage & {
  type: MessageType;
  uuid: MessageId;
  from: PeerId;
};

type SubscriptionMessage = {
  type: MessageType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  status: MeshStatus;
  activePeers: PeerId[];
};

export type { MessageId, DrafMessage, Message, SubscriptionMessage };
export { MessageType };
