import { Scramble } from "cctimer-scrambles";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import ErrorNotification from "components/notification/ErrorNotification";
import { PuzzleTime, Time, TimeId, TimePenalty } from "models/times/Time";
import { PuzzleTimeUpdate } from "models/times/TimesRepository";
import { useTimesRepository } from "repositories/times/timesRepository";
import { useMenu } from "store/menuContext";
import { useNotifications } from "store/notificationsContext";

type UseTimesProps = {
  onTimeAdded: () => void;
};

function useTimes({ onTimeAdded }: UseTimesProps) {
  const [lastTime, setLastTime] = useState<PuzzleTime | undefined>();
  const [puzzleTimes, setPuzzleTimes] = useState<PuzzleTime[]>([]);
  const timesRepository = useTimesRepository();
  const { selectedItem, checkSelectedItem } = useMenu();
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
  }, [selectedItem?.id, selectedItem?.key, timesRepository]);

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
      if (!checkSelectedItem(selectedItem)) {
        addNotification((props) => (
          <ErrorNotification {...props}>
            {t("Trying to save a time in a not selected puzzle")}
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
    [addNotification, checkSelectedItem, onTimeAdded, selectedItem, t, timesRepository]
  );

  const updateTime = useCallback(
    async (timeId: TimeId, dataToUpdate: PuzzleTimeUpdate) => {
      if (!selectedItem?.id) {
        addNotification((props) => (
          <ErrorNotification {...props}>{t("No selected puzzle")}</ErrorNotification>
        ));
        return;
      }
      if (!checkSelectedItem(selectedItem)) {
        addNotification((props) => (
          <ErrorNotification {...props}>
            {t("Trying to update a time in a not selected puzzle")}
          </ErrorNotification>
        ));
        return;
      }
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
    [addNotification, checkSelectedItem, lastTime?.id, refreshPuzzleTimes, selectedItem, t, timesRepository]
  );

  const deleteTime = useCallback(
    async (timeId: TimeId) => {
      if (!selectedItem?.id) {
        addNotification((props) => (
          <ErrorNotification {...props}>{t("No selected puzzle")}</ErrorNotification>
        ));
        return;
      }
      if (!checkSelectedItem(selectedItem)) {
        addNotification((props) => (
          <ErrorNotification {...props}>
            {t("Trying to delete a time in a not selected puzzle")}
          </ErrorNotification>
        ));
        return;
      }
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
    [addNotification, checkSelectedItem, lastTime, refreshPuzzleTimes, selectedItem, t, timesRepository]
  );

  const deletePuzzleTimes = useCallback(async () => {
    if (!selectedItem?.id) {
      addNotification((props) => <ErrorNotification {...props}>{t("No selected puzzle")}</ErrorNotification>);
      return;
    }
    if (!checkSelectedItem(selectedItem)) {
      addNotification((props) => (
        <ErrorNotification {...props}>
          {t("Trying to delete the times of a not selected puzzle")}
        </ErrorNotification>
      ));
      return;
    }
    try {
      await timesRepository.deleteAll(selectedItem.key, selectedItem.id);
      setLastTime(undefined);
      refreshPuzzleTimes();
    } catch (error) {
      addNotification((props) => (
        <ErrorNotification {...props}>{t("Times could not be deleted")}</ErrorNotification>
      ));
    }
  }, [addNotification, checkSelectedItem, refreshPuzzleTimes, selectedItem, setLastTime, t, timesRepository]);

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

export default useTimes;
