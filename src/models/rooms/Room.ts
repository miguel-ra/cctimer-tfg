import { PuzzleKey } from "models/puzzles/Puzzle";

type RoomId = string;

type Room = {
  id: RoomId;
  puzzleKey: PuzzleKey;
  nickname: string;
};

export type { RoomId, Room };
