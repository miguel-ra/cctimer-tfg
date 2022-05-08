import { child, Database, get, getDatabase, ref, remove, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

import { PuzzleId, PuzzleKey, UserPuzzle } from "models/puzzles/Puzzle";
import { PuzzlesRepository } from "models/puzzles/PuzzlesRepository";
import firebase from "shared/firebase";

class PuzzlesRepositoryFirebase implements PuzzlesRepository {
  private db: Database;

  constructor() {
    this.db = getDatabase();
  }

  async add(puzzleKey: PuzzleKey): Promise<UserPuzzle> {
    const puzzleId = uuidv4();
    const userPuzzle = { id: puzzleId, key: puzzleKey, createdAt: Date.now() };
    const puzzlePath = `/users/${firebase.auth.currentUser?.uid}/puzzles/${puzzleId}`;

    await set(ref(this.db, puzzlePath), userPuzzle);

    return userPuzzle;
  }

  async delete(puzzleId: PuzzleId) {
    const puzzlePath = `/users/${firebase.auth.currentUser?.uid}/puzzles/${puzzleId}`;
    await remove(child(ref(this.db), puzzlePath));
  }

  async findById(puzzleId: PuzzleId) {
    const puzzlePath = `/users/${firebase.auth.currentUser?.uid}/puzzles/${puzzleId}`;
    const puzzleSnapshot = await get(child(ref(this.db), puzzlePath));

    let userPuzzle: UserPuzzle | undefined = undefined;

    if (puzzleSnapshot.exists()) {
      userPuzzle = puzzleSnapshot.val();
    }

    return userPuzzle;
  }

  async getAll() {
    const puzzlesPath = `/users/${firebase.auth.currentUser?.uid}/puzzles`;
    const puzzlesSnapshot = await get(child(ref(this.db), puzzlesPath));

    let userPuzzles: UserPuzzle[] = [];

    if (puzzlesSnapshot.exists()) {
      userPuzzles = Object.values(puzzlesSnapshot.val());
    }

    return userPuzzles.sort((a, b) => a.createdAt - b.createdAt);
  }
}

export default PuzzlesRepositoryFirebase;
