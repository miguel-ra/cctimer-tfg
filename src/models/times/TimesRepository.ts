import { PuzzleId, PuzzleKey } from "models/puzzles/Puzzle";
import { PuzzleTime, Time } from "./Time";

export interface TimesRepository {
  add(
    puzzleKey: PuzzleKey,
    puzzleId: PuzzleId,
    time: Time
  ): Promise<PuzzleTime>;
  getAll(puzzleKey: PuzzleKey, puzzleId: PuzzleId): Promise<PuzzleTime[]>;
}
