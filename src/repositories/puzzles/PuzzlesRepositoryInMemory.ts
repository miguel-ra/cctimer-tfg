import { openDB, IDBPDatabase, DBSchema } from "idb";
import { PuzzleKey, UserPuzzle } from "models/puzzles/Puzzle";
import { PuzzlesRepository } from "models/puzzles/PuzzlesRepository";

interface PuzzlesDB extends DBSchema {
  puzzles: {
    key: number;
    value: UserPuzzle;
  };
}

const DB_NAME = "puzzles";
const DB_VERSION = 1;

class PuzzlesRepositoryInMemory implements PuzzlesRepository {
  private dbPromise: Promise<IDBPDatabase<PuzzlesDB>>;

  constructor() {
    this.dbPromise = openDB<PuzzlesDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        const store = db.createObjectStore("puzzles", {
          keyPath: "id",
          autoIncrement: true,
        });
        store.add({ key: "cube3" } as UserPuzzle);
      },
    });
  }

  async add(puzzleKey: PuzzleKey) {
    const db = await this.dbPromise;
    db.add("puzzles", { key: puzzleKey } as UserPuzzle);
  }

  async getAll() {
    const db = await this.dbPromise;
    return await db.getAll("puzzles");
  }
}

export default PuzzlesRepositoryInMemory;
