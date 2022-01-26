import { PuzzleId, PuzzleKey, UserPuzzle } from "./Puzzle";

export interface PuzzlesRepository {
  add(puzzleKey: PuzzleKey): Promise<UserPuzzle>;
  delete(puzzleId: PuzzleId): Promise<void>;
  findById(puzzleId: PuzzleId): Promise<UserPuzzle | undefined>;
  getAll(): Promise<UserPuzzle[]>;
}
