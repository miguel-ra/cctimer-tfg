import { PuzzleKey } from "models/puzzles/Puzzle";

type RoomId = string;

type Room = {
  id: RoomId;
  puzzleKey: PuzzleKey;
  nickname: string;
  createdAt: number;
};

type RoomMessage = {
  loading: boolean;
  error?: Error;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  isHost: boolean;
  users?: string[];
};

enum RoomStatus {
  Creating,
  Loading,
  WaitingUsers,
  Ready,
}

enum RoomUserStatus {
  Idle,
  Solving,
  Solved,
}

class RoomsCollection {
  private rooms: Room[] = [];

  getAll() {
    return this.rooms;
  }

  findById(id: RoomId) {
    return this.rooms.find((room) => room.id === id);
  }

  add(room: Room) {
    this.rooms = [...this.rooms, room];
  }

  remove(roomId: RoomId) {
    this.rooms = this.rooms.filter((room) => room.id !== roomId);
  }
}

export { RoomStatus, RoomsCollection };
export type { RoomId, Room, RoomUserStatus, RoomMessage };
