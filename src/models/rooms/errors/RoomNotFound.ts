class RoomNotFoundError extends Error {
  constructor() {
    super();
    this.name = "RoomNotFound";
    this.message = "Room not found";
  }
}

export default RoomNotFoundError;
