import { PuzzleId } from "models/puzzles/Puzzle";
import { Scramble } from "models/timer/scramble";

enum TimePenalty {
  NoPenalty = "no-penalty",
  PlusTwo = "plus-two",
  Dnf = "dnf",
}

type TimeId = string;

type Time = {
  penalty: TimePenalty;
  elapsedTime: number;
};

type PuzzleTime = {
  id: TimeId;
  puzzleId: PuzzleId;
  scramble: Scramble;
  comment?: string;
  createdAt: number;
} & Time;

type PuzzleTimeValue = {
  id: TimeId;
  value: number;
};

type UnsavedPuzzleTime = Omit<PuzzleTime, "id" | "puzzleId" | "createdAt">;

export type { TimeId, PuzzleTime, Time, UnsavedPuzzleTime, PuzzleTimeValue };

export { TimePenalty };
