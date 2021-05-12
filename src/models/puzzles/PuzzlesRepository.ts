import { PuzzleKey, UserPuzzle } from "./Puzzle";

export interface PuzzlesRepository {
  add(puzzleKey: PuzzleKey): Promise<void>;
  getAll(): Promise<UserPuzzle[]>;
}
