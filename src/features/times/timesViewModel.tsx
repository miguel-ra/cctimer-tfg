import { useTranslation } from "react-i18next";
import { useRecoilCallback } from "recoil";

import ErrorNotification from "components/notification/ErrorNotification";
import { useScrambleState, useSelectedItemState } from "features/timer/timerViewModel";
import { PuzzleTime, Time, TimeId } from "models/times/Time";
import { PuzzleTimeUpdate } from "models/times/TimesRepository";
import { useTimesRepository } from "repositories/times/timesRepository";
import { generateUseState } from "shared/recoil";
import { useNotifications } from "store/notificationsContext";

const usePuzzleTimesState = generateUseState<PuzzleTime[]>({
  key: "times.puzzleTimes",
  default: [],
});

const useLastTimeState = generateUseState<PuzzleTime | undefined>({
  key: "times.lastTime",
  default: undefined,
});

function useTimes() {
  const [lastTime, setLastTime] = useLastTimeState();
  const [puzzleTimes] = usePuzzleTimesState();
  const timesRepository = useTimesRepository();
  const { addNotification } = useNotifications();
  const { t } = useTranslation();

  const refreshPuzzleTimes = useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        const selectedItem = await snapshot.getPromise(useSelectedItemState.atom);

        if (!selectedItem?.id) {
          return set(usePuzzleTimesState.atom, []);
        }
        try {
          const puzzleTimes = await timesRepository.getAll(selectedItem.key, selectedItem.id);
          console.log(puzzleTimes);
          set(usePuzzleTimesState.atom, puzzleTimes);
        } catch (error) {
          set(usePuzzleTimesState.atom, []);
        }
      },
    [timesRepository]
  );

  const addTime = useRecoilCallback(
    ({ snapshot, set }) =>
      async (time: Time) => {
        const [selectedItem, scramble] = await Promise.all([
          snapshot.getPromise(useSelectedItemState.atom),
          snapshot.getPromise(useScrambleState.atom),
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
          set(usePuzzleTimesState.atom, puzzleTimesUpdated);
          set(useLastTimeState.atom, addedTime);
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
          snapshot.getPromise(useSelectedItemState.atom),
          snapshot.getPromise(useLastTimeState.atom),
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
            set(useLastTimeState.atom, updatedTime);
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
          snapshot.getPromise(useSelectedItemState.atom),
          snapshot.getPromise(useLastTimeState.atom),
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
            set(useLastTimeState.atom, undefined);
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
        const selectedItem = await snapshot.getPromise(useSelectedItemState.atom);

        if (!selectedItem?.id) {
          addNotification((props) => (
            <ErrorNotification {...props}>{t("No selected puzzle")}</ErrorNotification>
          ));
          return;
        }

        try {
          await timesRepository.deleteAll(selectedItem.key, selectedItem.id);
          set(useLastTimeState.atom, undefined);
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
    lastTime,
    setLastTime,
    puzzleTimes,
    addTime,
    updateTime,
    deleteTime,
    deletePuzzleTimes,
    refreshPuzzleTimes,
  };
}

export { useTimes, usePuzzleTimesState, useLastTimeState };
