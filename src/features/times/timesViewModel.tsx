import { useTranslation } from "react-i18next";
import { atom, useRecoilCallback, useRecoilState } from "recoil";

import ErrorNotification from "components/notification/ErrorNotification";
import { useScramble, useTimerSelectedItem } from "features/timer/timerViewModel";
import { PuzzleTime, Time, TimeId } from "models/times/Time";
import { PuzzleTimeUpdate } from "models/times/TimesRepository";
import { useTimesRepository } from "repositories/times/timesRepository";
import { useNotifications } from "store/notificationsContext";

const puzzleTimesState = atom<PuzzleTime[]>({
  key: "times.puzzleTimes",
  default: [],
});

const lastTimeState = atom<PuzzleTime | undefined>({
  key: "times.lastTime",
  default: undefined,
});

function usePuzzleTimes() {
  const [puzzleTimes, setPuzzleTimes] = useRecoilState(puzzleTimesState);

  return { puzzleTimes, setPuzzleTimes };
}
usePuzzleTimes.state = puzzleTimesState;

function useLastTime() {
  const [lastTime, setLastTime] = useRecoilState(lastTimeState);

  return { lastTime, setLastTime };
}
useLastTime.state = lastTimeState;

function useTimes() {
  const timesRepository = useTimesRepository();
  const { addNotification } = useNotifications();
  const { t } = useTranslation();

  const refreshPuzzleTimes = useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        const selectedItem = await snapshot.getPromise(useTimerSelectedItem.state);

        if (!selectedItem?.id) {
          return set(usePuzzleTimes.state, []);
        }
        try {
          const udpatedPuzzleTimes = await timesRepository.getAll(selectedItem.key, selectedItem.id);
          set(usePuzzleTimes.state, udpatedPuzzleTimes);
        } catch (error) {
          set(usePuzzleTimes.state, []);
        }
      },
    [timesRepository]
  );

  const addTime = useRecoilCallback(
    ({ snapshot, set }) =>
      async (time: Time) => {
        const [selectedItem, scramble] = await Promise.all([
          snapshot.getPromise(useTimerSelectedItem.state),
          snapshot.getPromise(useScramble.state),
        ]);

        if (!selectedItem?.id) {
          addNotification((props) => (
            <ErrorNotification {...props}>{t("No selected puzzle")}</ErrorNotification>
          ));
          return;
        }

        // TODO: Check if we need this comporobation
        if (scramble.puzzleKey !== selectedItem.key) {
          addNotification((props) => (
            <ErrorNotification {...props}>
              {t("Trying to save a time in a different puzzle")}
            </ErrorNotification>
          ));
          return;
        }
        try {
          // TODO: Check if is better to get times from repository or if is better concatenate it to the current list
          const { addedTime, puzzleTimesUpdated } = await timesRepository.add(
            selectedItem.key,
            selectedItem.id,
            { ...time, scramble }
          );
          set(usePuzzleTimes.state, puzzleTimesUpdated);
          set(useLastTime.state, addedTime);
          return addedTime;
        } catch (error) {
          addNotification((props) => (
            <ErrorNotification {...props}>{t("Time could not be saved")}</ErrorNotification>
          ));
        }
      },
    [addNotification, t, timesRepository]
  );

  const updateTime = useRecoilCallback(
    ({ snapshot, set }) =>
      async (timeId: TimeId, dataToUpdate: PuzzleTimeUpdate) => {
        const [selectedItem, lastTime] = await Promise.all([
          snapshot.getPromise(useTimerSelectedItem.state),
          snapshot.getPromise(useLastTime.state),
        ]);

        if (!selectedItem?.id) {
          addNotification((props) => (
            <ErrorNotification {...props}>{t("No selected puzzle")}</ErrorNotification>
          ));
          return;
        }
        let updatedTime;
        try {
          updatedTime = await timesRepository.update(selectedItem.key, timeId, dataToUpdate);
          refreshPuzzleTimes();
          if (updatedTime.id === lastTime?.id) {
            set(useLastTime.state, updatedTime);
          }
        } catch (error) {
          addNotification((props) => (
            <ErrorNotification {...props}>{t("Time could not be updated")}</ErrorNotification>
          ));
        }
        return updatedTime;
      },
    [addNotification, refreshPuzzleTimes, t, timesRepository]
  );

  const deleteTime = useRecoilCallback(
    ({ snapshot, set }) =>
      async (timeId: TimeId) => {
        const [selectedItem, lastTime] = await Promise.all([
          snapshot.getPromise(useTimerSelectedItem.state),
          snapshot.getPromise(useLastTime.state),
        ]);

        if (!selectedItem?.id) {
          addNotification((props) => (
            <ErrorNotification {...props}>{t("No selected puzzle")}</ErrorNotification>
          ));
          return;
        }

        try {
          await timesRepository.delete(selectedItem.key, timeId);
          if (timeId === lastTime?.id) {
            set(useLastTime.state, undefined);
          }
          refreshPuzzleTimes();
        } catch (error) {
          addNotification((props) => (
            <ErrorNotification {...props}>{t("Time could not be deleted")}</ErrorNotification>
          ));
        }
      },
    [addNotification, refreshPuzzleTimes, t, timesRepository]
  );

  const deletePuzzleTimes = useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        const selectedItem = await snapshot.getPromise(useTimerSelectedItem.state);

        if (!selectedItem?.id) {
          addNotification((props) => (
            <ErrorNotification {...props}>{t("No selected puzzle")}</ErrorNotification>
          ));
          return;
        }

        try {
          await timesRepository.deleteAll(selectedItem.key, selectedItem.id);
          set(useLastTime.state, undefined);
          refreshPuzzleTimes();
        } catch (error) {
          addNotification((props) => (
            <ErrorNotification {...props}>{t("Times could not be deleted")}</ErrorNotification>
          ));
        }
      },
    [addNotification, refreshPuzzleTimes, t, timesRepository]
  );

  return {
    addTime,
    updateTime,
    deleteTime,
    deletePuzzleTimes,
    refreshPuzzleTimes,
  };
}

export { useTimes, puzzleTimesState, usePuzzleTimes, useLastTime };
