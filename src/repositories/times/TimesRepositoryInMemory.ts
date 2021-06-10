import { openDB, IDBPDatabase } from "idb/with-async-ittr.js";
import { PuzzleId, PuzzleKey, puzzlesData } from "models/puzzles/Puzzle";
import { TimeId, PuzzleTime, UnsavedPuzzleTime } from "models/times/Time";
import { PuzzleTimeUpdate, TimesRepository } from "models/times/TimesRepository";

type TimesDB = {
  [key in PuzzleKey]: {
    key: number;
    value: PuzzleTime;
    indexes: {
      id: TimeId;
      puzzleId: PuzzleId;
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
        const puzzlesKeys = Object.keys(puzzlesData) as PuzzleKey[];
        puzzlesKeys.forEach((puzzleKey) => {
          const store = db.createObjectStore(puzzleKey, {
            keyPath: "id",
            autoIncrement: true,
          });
          store.createIndex("id", "id");
          store.createIndex("puzzleId", "puzzleId");
        });
      },
    });
  }

  async add(puzzleKey: PuzzleKey, puzzleId: PuzzleId, time: UnsavedPuzzleTime) {
    const db = await this.dbPromise;
    const puzzleTime: PuzzleTime = {
      ...time,
      puzzleId,
      createdAt: new Date(),
    } as PuzzleTime;
    const addedId = await db.add(puzzleKey, puzzleTime);
    return { ...puzzleTime, id: addedId };
  }

  async update(puzzleKey: PuzzleKey, timeId: TimeId, dataToUpdate: PuzzleTimeUpdate) {
    const db = await this.dbPromise;
    const time = (await db.getFromIndex(puzzleKey, "id", timeId)) as PuzzleTime;
    const timeUpdated = { ...time, ...dataToUpdate };

    db.put(puzzleKey, timeUpdated);

    return timeUpdated;
  }

  async getAll(puzzleKey: PuzzleKey, puzzleId: PuzzleId) {
    const db = await this.dbPromise;
    return db.getAllFromIndex(puzzleKey, "puzzleId", puzzleId);
  }

  async delete(puzzleKey: PuzzleKey, timeId: number) {
    const db = await this.dbPromise;
    return db.delete(puzzleKey, timeId);
  }

  async deleteAll(puzzleKey: PuzzleKey, puzzleId: PuzzleId) {
    const db = await this.dbPromise;
    const index = db.transaction(puzzleKey, "readwrite").store.index("puzzleId");

    for await (const cursor of index.iterate(puzzleId)) {
      cursor.delete();
    }
  }
}

export default TimesRepositoryInMemory;
