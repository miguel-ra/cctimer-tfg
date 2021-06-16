import { Scramble } from "cctimer-scrambles";
import { PuzzleId } from "models/puzzles/Puzzle";

enum TimePenalty {
  PlusTwo = "plus-two",
  Dnf = "dnf",
}

type TimeId = number;

type Time = {
  penalty?: TimePenalty;
  elapsedTime: number;
};

type PuzzleTime = {
  id: TimeId;
  puzzleId: PuzzleId;
  scramble: Scramble;
  comment?: string;
  createdAt: Date;
} & Time;

type UnsavedPuzzleTime = Omit<PuzzleTime, "id" | "puzzleId" | "createdAt">;

export type { TimeId, PuzzleTime, Time, UnsavedPuzzleTime };

export { TimePenalty };
