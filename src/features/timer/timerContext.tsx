import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  // useRef,
  useState,
} from "react";
import {
  Scramble,
  // ScrambleGenerator,
} from "cctimer-scrambles";
import { useMenu } from "store/menuContext";
// import { PuzzleKey, puzzlesData } from "models/puzzles/Puzzle";
// eslint-disable-next-line import/no-webpack-loader-syntax
import GenerateScrambleWorker from "worker-loader!./workers/generateScramble.worker.ts";
import { PuzzleKey } from "models/puzzles/Puzzle";
import { GenerateScrambleResponse } from "./workers/generateScramble.worker";

type MenuState = {
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

const emptyScramble = { string: "", state: "" };

function TimerProvider({ children }: TimerProviderProps) {
  const [scramble, setScramble] = useState<Scramble>(emptyScramble);
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

  useEffect(() => {
    generateScrambleWorker.onmessage = ({
      data: { puzzleKey, randomScramble },
    }: GenerateScrambleResponse) => {
      if (puzzleKey === scramblePuzzleKey.current) {
        setScramble(randomScramble);
      }
    };
    refreshScramble();
  }, [refreshScramble]);

  return (
    <TimerContext.Provider
      value={{
        scramble:
          scramblePuzzleKey.current === selectedItem?.key
            ? scramble
            : emptyScramble,
        refreshScramble,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export { TimerProvider, useTimer };
