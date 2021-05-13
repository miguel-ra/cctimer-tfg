import { PuzzleId, PuzzleKey, UserPuzzle } from "./Puzzle";

export interface PuzzlesRepository {
  add(puzzleKey: PuzzleKey): Promise<PuzzleId>;
  remove(puzzleId: PuzzleId): Promise<void>;
  getAll(): Promise<UserPuzzle[]>;
}
