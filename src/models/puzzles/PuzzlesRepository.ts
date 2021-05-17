import { PuzzleId, PuzzleKey, UserPuzzle } from "./Puzzle";

export interface PuzzlesRepository {
  add(puzzleKey: PuzzleKey): Promise<UserPuzzle>;
  remove(puzzleId: PuzzleId): Promise<void>;
  getAll(): Promise<UserPuzzle[]>;
}
