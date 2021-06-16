import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Scramble } from "cctimer-scrambles";
import { useTranslation } from "react-i18next";
import { useMenu } from "store/menuContext";
import { useNotifications } from "store/notificationsContext";
import { PuzzleKey } from "models/puzzles/Puzzle";
import { PuzzleTime, Time, TimeId } from "models/times/Time";
import { PuzzleTimeUpdate } from "models/times/TimesRepository";
import { useTimesRepository } from "repositories/times/timesRepository";
import ErrorNotification from "components/notification/ErrorNotification";
// eslint-disable-next-line import/no-webpack-loader-syntax
import GenerateScrambleWorker from "worker-loader!./workers/generateScramble.worker.ts";
import { GenerateScrambleResponse } from "./workers/generateScramble.worker";

type MenuState = {
  puzzleTimes: PuzzleTime[];
  addTime: (time: Time) => void;
  updateTime: (timeId: TimeId, dataToUpdate: PuzzleTimeUpdate) => Promise<PuzzleTime | undefined>;
  deleteTime: (timeId: TimeId) => Promise<void>;
  scramble: Scramble;
  refreshScramble: () => void;
  scramblePuzzleKey?: PuzzleKey;
};

type TimerProviderProps = {
  children: ReactNode;
};

const TimerContext = createContext<MenuState | null>(null);
const generateScrambleWorker = new GenerateScrambleWorker();

function useTimer() {
  const context = useContext(TimerContext);

  if (!context) {
    throw new Error("useTimer must be used within the TimerContext");
  }
  return context;
}

const emptyScramble = { text: "", state: "" };

function TimerProvider({ children }: TimerProviderProps) {
  const [scramble, setScramble] = useState<Scramble>(emptyScramble);
  const [puzzleTimes, setPuzzleTimes] = useState<PuzzleTime[]>([]);
  const timesRepository = useTimesRepository();
  const { addNotification } = useNotifications();
  const { t } = useTranslation();
  const scramblePuzzleKey = useRef<PuzzleKey>();
  const { selectedItem, checkSelectedItem } = useMenu();

  const refreshScramble = useCallback(() => {
    if (selectedItem?.key) {
      scramblePuzzleKey.current = selectedItem?.key;
      generateScrambleWorker.postMessage(selectedItem.key);
    } else {
      scramblePuzzleKey.current = undefined;
    }
  }, [selectedItem?.key]);

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
    refreshPuzzleTimes();
  }, [refreshPuzzleTimes]);

  useEffect(() => {
    function handleWorkerMessage({ data: { puzzleKey, randomScramble } }: GenerateScrambleResponse) {
      if (puzzleKey === scramblePuzzleKey.current) {
        setScramble(randomScramble);
      }
    }
    generateScrambleWorker.addEventListener("message", handleWorkerMessage);
    refreshScramble();
    return () => {
      generateScrambleWorker.removeEventListener("message", handleWorkerMessage);
    };
  }, [refreshScramble]);

  const addTime = useCallback(
    async (time: Time) => {
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
        const addedTime = await timesRepository.add(selectedItem.key, selectedItem.id, { ...time, scramble });
        setPuzzleTimes((prevPuzzleTimes) => [...prevPuzzleTimes, addedTime]);
        refreshScramble();
      } catch (error) {
        addNotification((props) => (
          <ErrorNotification {...props}>{t("Time could not be saved")}</ErrorNotification>
        ));
      }
    },
    [addNotification, checkSelectedItem, refreshScramble, scramble, selectedItem, t, timesRepository]
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
            {t("Trying to udpate a time in a not selected puzzle")}
          </ErrorNotification>
        ));
        return;
      }
      let updatedTime;
      try {
        updatedTime = await timesRepository.update(selectedItem.key, timeId, dataToUpdate);
        refreshPuzzleTimes();
        if (updatedTime.id === undefined) {
          throw new Error();
        }
      } catch (error) {
        addNotification((props) => (
          <ErrorNotification {...props}>{t("Time could not be updated")}</ErrorNotification>
        ));
      }
      return updatedTime;
    },
    [addNotification, checkSelectedItem, refreshPuzzleTimes, selectedItem, t, timesRepository]
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
        refreshPuzzleTimes();
      } catch (error) {
        addNotification((props) => (
          <ErrorNotification {...props}>{t("Time could not be deleted")}</ErrorNotification>
        ));
      }
    },
    [addNotification, checkSelectedItem, refreshPuzzleTimes, selectedItem, t, timesRepository]
  );

  return (
    <TimerContext.Provider
      value={{
        puzzleTimes,
        addTime,
        updateTime,
        deleteTime,
        scramble: scramblePuzzleKey.current === selectedItem?.key ? scramble : emptyScramble,
        refreshScramble,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export { TimerProvider, useTimer };
