import { PuzzleId, PuzzleKey, UserPuzzle } from "./Puzzle";

export interface PuzzlesRepository {
  add(puzzleKey: PuzzleKey): Promise<UserPuzzle>;
  delete(puzzleId: PuzzleId): Promise<void>;
  getAll(): Promise<UserPuzzle[]>;
}
