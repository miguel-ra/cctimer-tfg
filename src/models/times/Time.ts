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

type PuzzleTime = Time & {
  id: TimeId;
  puzzleId: PuzzleId;
  scramble: Scramble;
  createdAt: Date;
};

type UnsavedPuzzleTime = Omit<PuzzleTime, "id" | "puzzleId" | "createdAt">;

export type { PuzzleTime, Time, UnsavedPuzzleTime };

export { TimePenalty };
