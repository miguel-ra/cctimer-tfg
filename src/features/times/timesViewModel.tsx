import { Scramble } from "cctimer-scrambles";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { atom, useRecoilState } from "recoil";

import ErrorNotification from "components/notification/ErrorNotification";
import { useTimerSelectedItem } from "features/timer/timerViewModel";
import { PuzzleTime, Time, TimeId, TimePenalty } from "models/times/Time";
import { PuzzleTimeUpdate } from "models/times/TimesRepository";
import { useTimesRepository } from "repositories/times/timesRepository";
import { useNotifications } from "store/notificationsContext";

type UseTimesProps = {
  onTimeAdded: () => void;
};

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

function useLastTime() {
  const [lastTime, setLastTime] = useRecoilState(lastTimeState);

  return { lastTime, setLastTime };
}

function useTimes({ onTimeAdded }: UseTimesProps) {
  const { lastTime, setLastTime } = useLastTime();
  const { puzzleTimes, setPuzzleTimes } = usePuzzleTimes();
  const timesRepository = useTimesRepository();
  const { selectedItem } = useTimerSelectedItem();
  const { addNotification } = useNotifications();
  const { t } = useTranslation();

  const refreshPuzzleTimes = useCallback(async () => {
    if (!selectedItem?.id) {
      return setPuzzleTimes([]);
    }
    try {
      const udpatedPuzzleTimes = await timesRepository.getAll(selectedItem.key, selectedItem.id);
      setPuzzleTimes(udpatedPuzzleTimes);
    } catch (error) {
      setPuzzleTimes([]);
    }
  }, [selectedItem?.id, selectedItem?.key, setPuzzleTimes, timesRepository]);

  useEffect(() => {
    setLastTime(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);

  const addTime = useCallback(
    async (time: Time, scramble: Scramble) => {
      if (!selectedItem?.id) {
        addNotification((props) => (
          <ErrorNotification {...props}>{t("No selected puzzle")}</ErrorNotification>
        ));
        return;
      }
      // TODO: Check if we need this comporobation
      // if (!checkSelectedItem(selectedItem)) {
      //   addNotification((props) => (
      //     <ErrorNotification {...props}>
      //       {t("Trying to save a time in a not selected puzzle")}
      //     </ErrorNotification>
      //   ));
      //   return;
      // }
      try {
        // TODO: Check if is better to get times from repository or if is better concatenate it to the current list
        const { addedTime, puzzleTimesUpdated } = await timesRepository.add(
          selectedItem.key,
          selectedItem.id,
          { ...time, scramble }
        );
        setPuzzleTimes(puzzleTimesUpdated);
        if (addedTime.penalty !== TimePenalty.Dnf) {
          setLastTime(addedTime);
        }
        onTimeAdded();
        return addedTime;
      } catch (error) {
        addNotification((props) => (
          <ErrorNotification {...props}>{t("Time could not be saved")}</ErrorNotification>
        ));
      }
    },
    [selectedItem, addNotification, t, timesRepository, setPuzzleTimes, onTimeAdded, setLastTime]
  );

  const updateTime = useCallback(
    async (timeId: TimeId, dataToUpdate: PuzzleTimeUpdate) => {
      if (!selectedItem?.id) {
        addNotification((props) => (
          <ErrorNotification {...props}>{t("No selected puzzle")}</ErrorNotification>
        ));
        return;
      }
      // TODO: Check if we need this comporobation
      // if (!checkSelectedItem(selectedItem)) {
      //   addNotification((props) => (
      //     <ErrorNotification {...props}>
      //       {t("Trying to update a time in a not selected puzzle")}
      //     </ErrorNotification>
      //   ));
      //   return;
      // }
      let updatedTime;
      try {
        updatedTime = await timesRepository.update(selectedItem.key, timeId, dataToUpdate);
        refreshPuzzleTimes();
        if (updatedTime.id === lastTime?.id) {
          setLastTime(updatedTime);
        }
      } catch (error) {
        addNotification((props) => (
          <ErrorNotification {...props}>{t("Time could not be updated")}</ErrorNotification>
        ));
      }
      return updatedTime;
    },
    [addNotification, lastTime?.id, refreshPuzzleTimes, selectedItem, setLastTime, t, timesRepository]
  );

  const deleteTime = useCallback(
    async (timeId: TimeId) => {
      if (!selectedItem?.id) {
        addNotification((props) => (
          <ErrorNotification {...props}>{t("No selected puzzle")}</ErrorNotification>
        ));
        return;
      }

      // TODO: Check if we need this comporobation
      // if (!checkSelectedItem(selectedItem)) {
      //   addNotification((props) => (
      //     <ErrorNotification {...props}>
      //       {t("Trying to delete a time in a not selected puzzle")}
      //     </ErrorNotification>
      //   ));
      //   return;
      // }
      try {
        await timesRepository.delete(selectedItem.key, timeId);
        if (timeId === lastTime?.id) {
          setLastTime(undefined);
        }
        refreshPuzzleTimes();
      } catch (error) {
        addNotification((props) => (
          <ErrorNotification {...props}>{t("Time could not be deleted")}</ErrorNotification>
        ));
      }
    },
    [addNotification, lastTime?.id, refreshPuzzleTimes, selectedItem, setLastTime, t, timesRepository]
  );

  const deletePuzzleTimes = useCallback(async () => {
    if (!selectedItem?.id) {
      addNotification((props) => <ErrorNotification {...props}>{t("No selected puzzle")}</ErrorNotification>);
      return;
    }
    // TODO: Check if we need this comporobation
    // if (!checkSelectedItem(selectedItem)) {
    //   addNotification((props) => (
    //     <ErrorNotification {...props}>
    //       {t("Trying to delete the times of a not selected puzzle")}
    //     </ErrorNotification>
    //   ));
    //   return;
    // }
    try {
      await timesRepository.deleteAll(selectedItem.key, selectedItem.id);
      setLastTime(undefined);
      refreshPuzzleTimes();
    } catch (error) {
      addNotification((props) => (
        <ErrorNotification {...props}>{t("Times could not be deleted")}</ErrorNotification>
      ));
    }
  }, [addNotification, refreshPuzzleTimes, selectedItem, setLastTime, t, timesRepository]);

  return {
    lastTime,
    puzzleTimes,
    addTime,
    updateTime,
    deleteTime,
    deletePuzzleTimes,
    refreshPuzzleTimes,
  };
}

export { puzzleTimesState, usePuzzleTimes };

export default useTimes;
