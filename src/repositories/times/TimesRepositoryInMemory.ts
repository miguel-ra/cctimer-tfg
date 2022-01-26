import { IDBPDatabase, openDB } from "idb/with-async-ittr";

import { PuzzleId, PuzzleKey, puzzlesConfig } from "models/puzzles/Puzzle";
import { PuzzleTime, TimeId, UnsavedPuzzleTime } from "models/times/Time";
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
  private dbPromise: Promise<IDBPDatabase<TimesDB>> | undefined;

  private openDB() {
    if (this.dbPromise) {
      return this.dbPromise;
    }

    this.dbPromise = openDB<TimesDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        const puzzlesKeys = Object.keys(puzzlesConfig) as PuzzleKey[];
        puzzlesKeys.forEach((puzzleKey) => {
          const store = db.createObjectStore(puzzleKey, {
            keyPath: "id",
            autoIncrement: true,
          });
          store.createIndex("id", "id");
          store.createIndex("puzzleId", "puzzleId");
        });
      },
      terminated: () => {
        this.dbPromise = undefined;
      },
    });

    return this.dbPromise;
  }

  async add(puzzleKey: PuzzleKey, puzzleId: PuzzleId, time: UnsavedPuzzleTime) {
    const db = await this.openDB();
    const puzzleTime: PuzzleTime = {
      ...time,
      puzzleId,
      createdAt: new Date(),
    } as PuzzleTime;
    const addedId = await db.add(puzzleKey, puzzleTime);
    const addedTime = { ...puzzleTime, id: addedId } as PuzzleTime;
    const puzzleTimesUpdated = await this.getAll(puzzleKey, puzzleId);
    return { addedTime, puzzleTimesUpdated };
  }

  async update(puzzleKey: PuzzleKey, timeId: TimeId, dataToUpdate: PuzzleTimeUpdate) {
    const db = await this.openDB();
    const time = (await db.getFromIndex(puzzleKey, "id", timeId)) as PuzzleTime;
    const timeUpdated = { ...time, ...dataToUpdate };

    db.put(puzzleKey, timeUpdated);

    return timeUpdated;
  }

  async getAll(puzzleKey: PuzzleKey, puzzleId: PuzzleId) {
    const db = await this.openDB();
    return db.getAllFromIndex(puzzleKey, "puzzleId", puzzleId);
  }

  async delete(puzzleKey: PuzzleKey, timeId: number) {
    const db = await this.openDB();
    return db.delete(puzzleKey, timeId);
  }

  async deleteAll(puzzleKey: PuzzleKey, puzzleId: PuzzleId) {
    const db = await this.openDB();
    const index = db.transaction(puzzleKey, "readwrite").store.index("puzzleId");

    for await (const cursor of index.iterate(puzzleId)) {
      cursor.delete();
    }
  }
}

export default new TimesRepositoryInMemory();
