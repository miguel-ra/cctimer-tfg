import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Scramble } from "cctimer-scrambles";
import { useMenu } from "store/menuContext";
import { PuzzleKey } from "models/puzzles/Puzzle";
import { PuzzleTime, Time, TimeId } from "models/times/Time";
import { PuzzleTimeUpdate } from "models/times/TimesRepository";
import { useTimesRepository } from "repositories/times/timesRepository";
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
  const scramblePuzzleKey = useRef<PuzzleKey>();
  const { selectedItem } = useMenu();

  const refreshScramble = useCallback(() => {
    if (selectedItem?.key) {
      scramblePuzzleKey.current = selectedItem?.key;
      generateScrambleWorker.postMessage(selectedItem.key);
    } else {
      scramblePuzzleKey.current = undefined;
    }
  }, [selectedItem?.key]);

  const refreshPuzzles = useCallback(() => {
    if (selectedItem?.id) {
      timesRepository.getAll(selectedItem.key, selectedItem.id).then((response) => {
        setPuzzleTimes(response);
      });
    }
  }, [selectedItem, timesRepository]);

  useEffect(() => {
    refreshPuzzles();
  }, [refreshPuzzles]);

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
    (time: Time) => {
      if (selectedItem?.id) {
        timesRepository.add(selectedItem.key, selectedItem.id, { ...time, scramble }).then((addedTime) => {
          setPuzzleTimes((prevPuzzleTimes) => [...prevPuzzleTimes, addedTime]);
          refreshScramble();
        });
      }
      //TODO: Else show an error message
    },
    [refreshScramble, scramble, selectedItem?.id, selectedItem?.key, timesRepository]
  );

  const updateTime = useCallback(
    async (timeId: TimeId, dataToUpdate: PuzzleTimeUpdate) => {
      let updatedTime;
      if (selectedItem?.id) {
        updatedTime = await timesRepository.update(selectedItem.key, timeId, dataToUpdate);
        refreshPuzzles();
      }
      //TODO: Else show an error message
      return updatedTime;
    },
    [refreshPuzzles, selectedItem?.id, selectedItem?.key, timesRepository]
  );

  const deleteTime = useCallback(
    async (timeId: TimeId) => {
      if (!selectedItem?.id) {
        return;
        //TODO: Else show an error message
      }
      try {
        await timesRepository.delete(selectedItem.key, timeId);
        refreshPuzzles();
      } catch (error) {
        //TODO: Else show an error message
      }
    },
    [refreshPuzzles, selectedItem?.id, selectedItem?.key, timesRepository]
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
