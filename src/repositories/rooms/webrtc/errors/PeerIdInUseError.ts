class PeerIdInUseError extends Error {
  constructor() {
    super();
    this.name = "PeerIdInUseInUse";
    this.message = "Peer id already in use";
  }
}

export default PeerIdInUseError;
