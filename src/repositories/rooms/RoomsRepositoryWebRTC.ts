import { Room, RoomId } from "models/rooms/Room";
import { RoomsRepository } from "models/rooms/RoomsRepository";

import Mesh from "./Mesh";

const DEFAULT_PUZZLE_TYPE = "cube3";

function generateRoomId() {
  return (Math.random() + 1).toString(36).substring(7).toUpperCase();
}

type RoomsMeshes = {
  [key in RoomId]: Mesh;
};

const roomsMeshes: RoomsMeshes = {};

class RoomsRepositoryWebRTC implements RoomsRepository {
  async create(nickname: string): Promise<Room> {
    const roomId = generateRoomId();
    const roomMesh = new Mesh(roomId, nickname);
    console.log(roomId, roomMesh);
    // Generate room code
    // Create offer
    // Assign offer to room code
    return { id: roomId, puzzleKey: DEFAULT_PUZZLE_TYPE, nickname };
  }

  async join(nickname: string, roomId: RoomId): Promise<Room> {
    const roomMesh = new Mesh(roomId, nickname);

    return { id: roomId, puzzleKey: DEFAULT_PUZZLE_TYPE, nickname };
  }
}

export default RoomsRepositoryWebRTC;
