import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Scramble } from "cctimer-scrambles";
import { useMenu } from "store/menuContext";
import { PuzzleKey } from "models/puzzles/Puzzle";
import { PuzzleStats } from "models/stats/Stats";
import { PuzzleTime, Time, TimeId } from "models/times/Time";
import { PuzzleTimeUpdate } from "models/times/TimesRepository";
import useTimes from "features/times/timesViewModel";
import useStats from "features/stats/statsViewModel";
import LoadScrambleWorker from "workerize-loader!./loadScramble.worker.ts";
import { LoadScrambleResponse } from "./loadScramble.worker";

type MenuState = {
  puzzleTimes: PuzzleTime[];
  addTime: (time: Time) => Promise<PuzzleTime | undefined>;
  updateTime: (timeId: TimeId, dataToUpdate: PuzzleTimeUpdate) => Promise<PuzzleTime | undefined>;
  deleteTime: (timeId: TimeId) => Promise<void>;
  deletePuzzleTimes: () => Promise<void>;
  scramble: Scramble;
  refreshScramble: () => void;
  scramblePuzzleKey?: PuzzleKey;
  lastTime?: PuzzleTime;
  puzzleStats: PuzzleStats | null;
};

type TimerProviderProps = {
  children: ReactNode;
};

const TimerContext = createContext<MenuState | null>(null);
const loadScrambleWorker = new LoadScrambleWorker();

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
  const scramblePuzzleKey = useRef<PuzzleKey>();
  const { selectedItem } = useMenu();

  const refreshScramble = useCallback(async () => {
    if (selectedItem?.key) {
      loadScrambleWorker.postMessage(selectedItem.key);
    } else {
      scramblePuzzleKey.current = undefined;
    }
  }, [selectedItem]);

  useEffect(() => {
    refreshScramble();
  }, [refreshScramble]);

  const { puzzleTimes, lastTime, addTime, updateTime, deleteTime, deletePuzzleTimes, refreshPuzzleTimes } =
    useTimes({
      onTimeAdded: refreshScramble,
    });

  const { puzzleStats } = useStats({ puzzleTimes });

  useEffect(() => {
    refreshPuzzleTimes();
  }, [refreshPuzzleTimes]);

  const addTimeWithScramble = useCallback((time: Time) => addTime(time, scramble), [addTime, scramble]);

  useEffect(() => {
    function handleWorkerMessage({ data: { puzzleKey, randomScramble } }: { data: LoadScrambleResponse }) {
      if (randomScramble) {
        scramblePuzzleKey.current = puzzleKey;
        setScramble(randomScramble);
      }
    }
    loadScrambleWorker.addEventListener("message", handleWorkerMessage);
    return () => {
      loadScrambleWorker.removeEventListener("message", handleWorkerMessage);
    };
  }, []);

  return (
    <TimerContext.Provider
      value={{
        puzzleTimes,
        lastTime,
        addTime: addTimeWithScramble,
        updateTime,
        deleteTime,
        deletePuzzleTimes,
        scramble: scramblePuzzleKey.current === selectedItem?.key ? scramble : emptyScramble,
        refreshScramble,
        puzzleStats,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export { TimerProvider, useTimer };
