import { IDBPDatabase, openDB } from "idb";
import { v4 as uuidv4 } from "uuid";

import { PuzzleId, PuzzleKey, UserPuzzle } from "models/puzzles/Puzzle";
import { PuzzlesRepository } from "models/puzzles/PuzzlesRepository";

type StoreName = "puzzles";

type PuzzlesDB = {
  [key in StoreName]: {
    key: PuzzleId;
    value: UserPuzzle;
    indexes: {
      id: PuzzleId;
      createdAt: number;
    };
  };
};

const DB_NAME = "puzzles";
const DB_VERSION = 1;
const STORE_NAME = "puzzles";

class PuzzlesRepositoryInMemory implements PuzzlesRepository {
  private dbPromise: Promise<IDBPDatabase<PuzzlesDB>> | undefined;

  private openDB() {
    if (this.dbPromise) {
      return this.dbPromise;
    }

    this.dbPromise = openDB<PuzzlesDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: "id",
        });
        store.createIndex("id", "id");
        store.createIndex("createdAt", "createdAt");
        const id = uuidv4();
        const createdAt = Date.now();
        store.add({ id, key: "cube3", createdAt } as UserPuzzle);
      },
      terminated: () => {
        this.dbPromise = undefined;
      },
    });

    return this.dbPromise;
  }

  async add(puzzleKey: PuzzleKey): Promise<UserPuzzle> {
    const db = await this.openDB();
    const userPuzzle = { id: uuidv4(), key: puzzleKey, createdAt: Date.now() };
    await db.add(STORE_NAME, userPuzzle);
    return userPuzzle;
  }

  async delete(puzzleId: PuzzleId) {
    const db = await this.openDB();
    await db.delete(STORE_NAME, puzzleId);
  }

  async findById(puzzleId: PuzzleId) {
    const db = await this.openDB();

    return db.getFromIndex(STORE_NAME, "id", puzzleId);
  }

  async getAll() {
    const db = await this.openDB();
    const userPuzzles = await db.getAll(STORE_NAME);
    return userPuzzles.sort((a, b) => a.createdAt - b.createdAt);
  }
}

export default PuzzlesRepositoryInMemory;
