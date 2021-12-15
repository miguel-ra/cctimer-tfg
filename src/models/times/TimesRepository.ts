import { PuzzleId, PuzzleKey } from "models/puzzles/Puzzle";
import { PuzzleTime, TimeId, UnsavedPuzzleTime } from "./Time";

type PuzzleTimeUpdate = Pick<PuzzleTime, "penalty" | "comment">;

type AddPuzzleReturnValue = {
  addedTime: PuzzleTime;
  puzzleTimesUpdated: PuzzleTime[];
};

interface TimesRepository {
  add(puzzleKey: PuzzleKey, puzzleId: PuzzleId, time: UnsavedPuzzleTime): Promise<AddPuzzleReturnValue>;
  update(puzzleKey: PuzzleKey, timeId: TimeId, dataToUpdate: PuzzleTimeUpdate): Promise<PuzzleTime>;
  getAll(puzzleKey: PuzzleKey, puzzleId: PuzzleId): Promise<PuzzleTime[]>;
  delete(puzzleKey: PuzzleKey, timeId: TimeId): Promise<void>;
  deleteAll(puzzleKey: PuzzleKey, puzzleId: PuzzleId): Promise<void>;
}

export type { TimesRepository, PuzzleTimeUpdate };
