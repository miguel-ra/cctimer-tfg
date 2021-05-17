import { PuzzleId } from "models/puzzles/Puzzle";

type TimeId = number;

type Time = {
  penalty?: "plus-two" | "dnf";
  elapsedTime: number;
};

type PuzzleTime = Time & {
  id: TimeId;
  puzzleId: PuzzleId;
  createdAt: Date;
};

export type { PuzzleTime, Time };
