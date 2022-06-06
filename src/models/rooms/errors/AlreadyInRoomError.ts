class AlreadyInRoomError extends Error {
  constructor() {
    super();
    this.name = "AlreadyInRoom";
    this.message = "You have already joined the room";
  }
}

export default AlreadyInRoomError;
