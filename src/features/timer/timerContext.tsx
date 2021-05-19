import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Scramble,
  ScrambleGenerator,
  ScrambleImageProps,
} from "cctimer-scrambles";
import { useMenu } from "store/menuContext";
import { PuzzleKey, puzzlesData } from "models/puzzles/Puzzle";

type MenuState = {
  // isLoading: boolean;
  scramble: Scramble;
  ScrambleImage?: (props: ScrambleImageProps) => JSX.Element;
  refreshScramble: () => void;
};

type TimerProviderProps = {
  children: ReactNode;
};

const TimerContext = createContext<MenuState | null>(null);

function useTimer() {
  const context = useContext(TimerContext);

  if (!context) {
    throw new Error("useTimer must be used within the TimerContext");
  }
  return context;
}

function TimerProvider({ children }: TimerProviderProps) {
  const [scramble, setScramble] = useState<Scramble>({ string: "", state: "" });
  const scramblePuzzleKey = useRef<PuzzleKey>();
  const scrambleGenerator = useRef<ScrambleGenerator | null>(null);
  const { selectedItem } = useMenu();

  const refreshScramble = useCallback(() => {
    if (scrambleGenerator.current) {
      setScramble(scrambleGenerator.current.getRandomScramble());
    }
  }, []);

  useEffect(() => {
    if (selectedItem?.key && scramblePuzzleKey.current !== selectedItem?.key) {
      scrambleGenerator.current = null;
      window.requestAnimationFrame(() => {
        puzzlesData[selectedItem.key]
          ?.loadScramble?.()
          .then(({ default: generator }) => {
            scramblePuzzleKey.current = selectedItem?.key;
            scrambleGenerator.current = generator;
            refreshScramble();
          });
      });
    }
  }, [refreshScramble, selectedItem?.key]);

  return (
    <TimerContext.Provider
      value={{
        scramble,
        ScrambleImage: scrambleGenerator.current?.ScrambleImage,
        refreshScramble,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export { TimerProvider, useTimer };
