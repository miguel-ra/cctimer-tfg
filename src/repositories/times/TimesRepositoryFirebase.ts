import {
  child,
  Database,
  equalTo,
  get,
  getDatabase,
  orderByChild,
  push,
  query,
  ref,
  remove,
  set,
} from "firebase/database";
import { IDBPDatabase, openDB } from "idb/with-async-ittr";
import { v4 as uuidv4 } from "uuid";

import { PuzzleId, PuzzleKey, puzzlesConfig } from "models/puzzles/Puzzle";
import { PuzzleTime, TimeId, UnsavedPuzzleTime } from "models/times/Time";
import { PuzzleTimeUpdate, TimesRepository } from "models/times/TimesRepository";
import firebase from "shared/firebase";

class TimesRepositoryFirebase implements TimesRepository {
  private db: Database;

  constructor() {
    this.db = getDatabase();
  }

  async add(puzzleKey: PuzzleKey, puzzleId: PuzzleId, time: UnsavedPuzzleTime) {
    // const db = await this.openDB();
    const timeId = uuidv4();
    const puzzleTimePath = `/users/${firebase.auth.currentUser?.uid}/times/${puzzleKey}/${timeId}`;
    const puzzleTime: PuzzleTime = {
      ...time,
      id: timeId,
      puzzleId,
      createdAt: Date.now(),
    };

    try {
      await set(ref(this.db, puzzleTimePath), puzzleTime);
    } catch (error) {
      console.error(error);
    }

    const puzzleTimesUpdated = await this.getAll(puzzleKey, puzzleId);

    return { addedTime: puzzleTime, puzzleTimesUpdated };
  }

  async update(puzzleKey: PuzzleKey, timeId: TimeId, dataToUpdate: PuzzleTimeUpdate) {
    // const db = await this.openDB();
    // const time = (await db.getFromIndex(puzzleKey, "id", timeId)) as PuzzleTime;
    // const timeUpdated = { ...time, ...dataToUpdate };
    // db.put(puzzleKey, timeUpdated);
    // return timeUpdated;
    return {} as PuzzleTime;
  }

  async getAll(puzzleKey: PuzzleKey, puzzleId: PuzzleId): Promise<PuzzleTime[]> {
    const puzzleTimesPath = `/users/${firebase.auth.currentUser?.uid}/times/${puzzleKey}`;

    try {
      const puzzleTimesRef = query(
        ref(this.db, puzzleTimesPath),
        orderByChild("puzzleId"),
        equalTo(puzzleId)
      );
      const puzzleTimesSnapshot = await get(puzzleTimesRef);

      if (puzzleTimesSnapshot.exists()) {
        const puzzleTimes = Object.values(puzzleTimesSnapshot.val()) as PuzzleTime[];
        return puzzleTimes.sort((a, b) => a.createdAt - b.createdAt);
      }
    } catch (error) {
      console.error(error);
    }

    return [];
  }

  async delete(puzzleKey: PuzzleKey, timeId: TimeId) {
    const puzzleTimePath = `/users/${firebase.auth.currentUser?.uid}/times/${puzzleKey}/${timeId}`;
    await remove(child(ref(this.db), puzzleTimePath));
  }

  async deleteAll(puzzleKey: PuzzleKey, puzzleId: PuzzleId) {
    // const db = await this.openDB();
    // const index = db.transaction(puzzleKey, "readwrite").store.index("puzzleId");
    // for await (const cursor of index.iterate(puzzleId)) {
    //   cursor.delete();
    // }
  }
}

export default TimesRepositoryFirebase;
