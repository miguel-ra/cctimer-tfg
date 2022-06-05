class RoomConnectionLostError extends Error {
  constructor() {
    super();
    this.name = "RoomConnectionLost";
    this.message = "Room connection lost";
  }
}

export default RoomConnectionLostError;
