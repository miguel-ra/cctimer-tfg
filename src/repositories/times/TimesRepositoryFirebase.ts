import { child, equalTo, get, orderByChild, query, ref, remove, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

import { PuzzleId, PuzzleKey } from "models/puzzles/Puzzle";
import { PuzzleTime, TimeId, UnsavedPuzzleTime } from "models/times/Time";
import { PuzzleTimeUpdate, TimesRepository } from "models/times/TimesRepository";
import firebase from "shared/firebase";

class TimesRepositoryFirebase implements TimesRepository {
  async add(puzzleKey: PuzzleKey, puzzleId: PuzzleId, time: UnsavedPuzzleTime) {
    const timeId = uuidv4();
    const puzzleTimePath = `/users/${firebase.auth.currentUser?.uid}/times/${puzzleKey}/${timeId}`;
    const puzzleTime: PuzzleTime = {
      ...time,
      id: timeId,
      puzzleId,
      createdAt: Date.now(),
    };

    await set(ref(firebase.db, puzzleTimePath), puzzleTime);

    const puzzleTimesUpdated = await this.getAll(puzzleKey, puzzleId);

    return { addedTime: puzzleTime, puzzleTimesUpdated };
  }

  async update(puzzleKey: PuzzleKey, timeId: TimeId, dataToUpdate: PuzzleTimeUpdate) {
    const puzzleTimePath = `/users/${firebase.auth.currentUser?.uid}/times/${puzzleKey}/${timeId}`;
    const puzzleTimeSnapshot = await get(child(ref(firebase.db), puzzleTimePath));

    if (puzzleTimeSnapshot.exists()) {
      const puzzleTime = puzzleTimeSnapshot.val();
      const timeUpdated = { ...puzzleTime, ...dataToUpdate };
      await set(ref(firebase.db, puzzleTimePath), timeUpdated);
      return timeUpdated;
    }

    return {} as PuzzleTime;
  }

  async getAll(puzzleKey: PuzzleKey, puzzleId: PuzzleId): Promise<PuzzleTime[]> {
    const puzzleTimesPath = `/users/${firebase.auth.currentUser?.uid}/times/${puzzleKey}`;
    const puzzleTimesRef = query(
      ref(firebase.db, puzzleTimesPath),
      orderByChild("puzzleId"),
      equalTo(puzzleId)
    );
    const puzzleTimesSnapshot = await get(puzzleTimesRef);

    if (puzzleTimesSnapshot.exists()) {
      const puzzleTimes = Object.values(puzzleTimesSnapshot.val()) as PuzzleTime[];
      return puzzleTimes.sort((a, b) => a.createdAt - b.createdAt);
    }

    return [];
  }

  async delete(puzzleKey: PuzzleKey, timeId: TimeId) {
    const puzzleTimePath = `/users/${firebase.auth.currentUser?.uid}/times/${puzzleKey}/${timeId}`;
    await remove(child(ref(firebase.db), puzzleTimePath));
  }

  async deleteAll(puzzleKey: PuzzleKey, puzzleId: PuzzleId) {
    const puzzleTimesPath = `/users/${firebase.auth.currentUser?.uid}/times/${puzzleKey}`;
    const puzzleTimesRef = query(
      ref(firebase.db, puzzleTimesPath),
      orderByChild("puzzleId"),
      equalTo(puzzleId)
    );
    const puzzleTimesSnapshot = await get(puzzleTimesRef);

    const removePromises: Promise<void>[] = [];
    puzzleTimesSnapshot.forEach((snapshot) => {
      removePromises.push(remove(snapshot.ref));
    });

    await Promise.all(removePromises);
  }
}

export default TimesRepositoryFirebase;
