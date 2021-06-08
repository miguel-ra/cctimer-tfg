import { PuzzleId, PuzzleKey } from "models/puzzles/Puzzle";
import { PuzzleTime, UnsavedPuzzleTime } from "./Time";

export interface TimesRepository {
  add(puzzleKey: PuzzleKey, puzzleId: PuzzleId, time: UnsavedPuzzleTime): Promise<PuzzleTime>;
  getAll(puzzleKey: PuzzleKey, puzzleId: PuzzleId): Promise<PuzzleTime[]>;
  deleteAll(puzzleKey: PuzzleKey, puzzleId: PuzzleId): Promise<void>;
}
