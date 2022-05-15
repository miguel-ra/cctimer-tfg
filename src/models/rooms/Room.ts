import { PuzzleKey } from "models/puzzles/Puzzle";

type RoomId = string;

type Room = {
  id: RoomId;
  key: PuzzleKey;
};

export type { RoomId, Room };
