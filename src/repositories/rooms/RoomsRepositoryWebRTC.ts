import NicknameInUseError from "models/rooms/errors/NicknameInUseError";
import RoomConnectionLostError from "models/rooms/errors/RoomConnectionLostError";
import RoomNotFoundError from "models/rooms/errors/RoomNotFound";
import { Room, RoomId, RoomMessage, RoomsCollection } from "models/rooms/Room";
import { RoomsRepository } from "models/rooms/RoomsRepository";

import PeerIdInUseError from "./webrtc/errors/PeerIdInUseError";
import { MeshStatus } from "./webrtc/Mesh";
import WebRTCMesh from "./WebRTCMesh";

type RoomsMeshes = {
  [key in RoomId]: WebRTCMesh;
};

const DEFAULT_PUZZLE_TYPE = "cube3";
const ROOM_CONNECTION_TIMEOUT = 10_000;

function generateRoomId() {
  return (Math.random() + 1).toString(36).substring(7).toUpperCase();
}

class RoomsRepositoryWebRTC implements RoomsRepository {
  private roomsCollection: RoomsCollection = new RoomsCollection();
  private roomsMeshes: RoomsMeshes = {};

  async getAll() {
    const storedRooms = this.roomsCollection.getAll();
    return storedRooms.sort((a, b) => a.createdAt - b.createdAt);
  }

  async create(nickname: string) {
    const roomId = generateRoomId();
    const roomMesh = await WebRTCMesh.init(roomId, nickname);
    const room: Room = { id: roomId, puzzleKey: DEFAULT_PUZZLE_TYPE, nickname, createdAt: Date.now() };

    this.roomsCollection.add(room);
    this.roomsMeshes[roomId] = roomMesh;

    return room;
  }

  async join(nickname: string, roomId: RoomId) {
    try {
      const roomMesh = await WebRTCMesh.init(roomId, nickname);
      const room: Room = { id: roomId, puzzleKey: DEFAULT_PUZZLE_TYPE, nickname, createdAt: Date.now() };

      this.roomsCollection.add(room);
      this.roomsMeshes[roomId] = roomMesh;

      return room;
    } catch (error) {
      if (error.constructor === PeerIdInUseError) {
        throw new NicknameInUseError();
      }
      throw error;
    }
  }

  async leave(roomId: RoomId) {
    this.roomsCollection.remove(roomId);
    this.roomsMeshes[roomId]?.closeConnection();

    return;
  }

  async findById(roomId: RoomId) {
    return this.roomsCollection.findById(roomId);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendMesasge(roomId: RoomId, message?: any) {
    const roomMesh = this.roomsMeshes[roomId];
    if (roomMesh) {
      roomMesh.sendToAll(message);
    }
  }

  async subscribe(roomId: RoomId, callback: (roomMessage: RoomMessage) => void) {
    const roomMesh = this.roomsMeshes[roomId];

    if (!roomMesh) {
      callback({ loading: false, error: new RoomNotFoundError(), isHost: false });
      return;
    }

    const isHost = roomMesh.isHost;
    callback({
      loading: roomMesh.status !== MeshStatus.connected,
      isHost: roomMesh.isHost,
      users: roomMesh.getActivePeers(),
    });

    const unsubscribe = roomMesh.subscribe(({ data, activePeers }) => {
      callback({ loading: false, data, isHost: roomMesh.isHost, users: activePeers });
    });

    setTimeout(() => {
      if (!roomMesh.isHost && roomMesh.status !== MeshStatus.connected) {
        callback({ loading: false, error: new RoomConnectionLostError(), isHost });
      }
    }, ROOM_CONNECTION_TIMEOUT);

    return unsubscribe;
  }

  // getUsers
  // roomData
  //  - Settings
  //  - Scramble
  //  - UserStatus
}

export default RoomsRepositoryWebRTC;
