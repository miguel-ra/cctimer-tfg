import { openDB, IDBPDatabase } from "idb";
import { PuzzleId, PuzzleKey, puzzlesData } from "models/puzzles/Puzzle";
import { PuzzleTime, Time } from "models/times/Time";
import { TimesRepository } from "models/times/TimesRepository";

type TimesDB = {
  [key in PuzzleKey]: {
    key: number;
    value: PuzzleTime;
    indexes: {
      puzzleId: PuzzleId;
      createdAt: Date;
    };
  };
};

const DB_NAME = "times";
const DB_VERSION = 1;

class TimesRepositoryInMemory implements TimesRepository {
  private dbPromise: Promise<IDBPDatabase<TimesDB>>;

  constructor() {
    this.dbPromise = openDB<TimesDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        const puzzlesKeys = Object.keys(puzzlesData) as Array<PuzzleKey>;
        puzzlesKeys.forEach((puzzleKey) => {
          const store = db.createObjectStore(puzzleKey, {
            keyPath: "id",
            autoIncrement: true,
          });
          store.createIndex("puzzleId", "puzzleId");
        });
      },
    });
  }

  async add(
    puzzleKey: PuzzleKey,
    puzzleId: PuzzleId,
    time: Time
  ): Promise<PuzzleTime> {
    const db = await this.dbPromise;
    const puzzleTime = {
      ...time,
      puzzleId,
      createdAt: new Date(),
    } as PuzzleTime;
    const addedId = await db.add(puzzleKey, puzzleTime);
    return { ...puzzleTime, id: addedId };
  }

  async getAll(puzzleKey: PuzzleKey, puzzleId: PuzzleId) {
    const db = await this.dbPromise;
    return await db.getAllFromIndex(puzzleKey, "puzzleId", puzzleId);
  }
}

export default TimesRepositoryInMemory;
