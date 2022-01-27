import { IDBPDatabase, openDB } from "idb";

import { PuzzleId, PuzzleKey, UserPuzzle } from "models/puzzles/Puzzle";
import { PuzzlesRepository } from "models/puzzles/PuzzlesRepository";

type StoreName = "puzzles";

type PuzzlesDB = {
  [key in StoreName]: {
    key: number;
    value: UserPuzzle;
    indexes: {
      id: PuzzleId;
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
          autoIncrement: true,
        });
        store.createIndex("id", "id");
        store.add({ key: "cube3" } as UserPuzzle);
      },
      terminated: () => {
        this.dbPromise = undefined;
      },
    });

    return this.dbPromise;
  }

  async add(puzzleKey: PuzzleKey): Promise<UserPuzzle> {
    const db = await this.openDB();
    const addedId = await db.add(STORE_NAME, { key: puzzleKey } as UserPuzzle);
    return { key: puzzleKey, id: addedId };
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
    return db.getAll(STORE_NAME);
  }
}

export default new PuzzlesRepositoryInMemory();
