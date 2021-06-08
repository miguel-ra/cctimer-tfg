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
  scramble: Scramble;
};

type PuzzleTime = Time & {
  id: TimeId;
  puzzleId: PuzzleId;
  createdAt: Date;
};

export type { PuzzleTime, Time };

export { TimePenalty };
