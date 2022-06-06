import { PuzzleKey } from "models/puzzles/Puzzle";
import { Settings } from "models/settings/Settings";
import { Scramble } from "models/timer/scramble";
import { StopwatchStatus } from "models/timer/stopwatch";

type RoomId = string;

type Room = {
  id: RoomId;
  puzzleKey: PuzzleKey;
  nickname: string;
  createdAt: number;
  scramble?: Scramble;
  settings?: Settings;
  isHost?: boolean;
};

enum RoomDataType {
  AskScramble,
  SetScramble,
  AskSettings,
  SetSettings,
  AskStatus,
  SetStatus,
}

type RoomData =
  | {
      type: RoomDataType.AskScramble;
    }
  | {
      type: RoomDataType.SetScramble;
      scramble: Scramble;
    }
  | {
      type: RoomDataType.AskSettings;
    }
  | {
      type: RoomDataType.SetSettings;
      settings: Settings;
    }
  | {
      type: RoomDataType.AskStatus;
    }
  | {
      type: RoomDataType.SetStatus;
      status: StopwatchStatus;
      nickname: string;
    };

type RoomMessage = {
  loading: boolean;
  error?: Error;
  data?: RoomData;
  isHost: boolean;
  users?: string[];
  scramble?: Scramble;
  settings?: Settings;
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

  update(roomId: RoomId, update: Partial<Room>) {
    const room = this.findById(roomId);
    if (room) {
      const roomUpdated = { ...room, ...update } as Room;
      this.remove(roomId);
      this.add(roomUpdated);
    }
  }

  remove(roomId: RoomId) {
    this.rooms = this.rooms.filter((room) => room.id !== roomId);
  }
}

export { RoomStatus, RoomsCollection, RoomDataType };
export type { RoomId, Room, RoomUserStatus, RoomMessage, RoomData };
