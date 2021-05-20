import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  // useRef,
  useState,
} from "react";
import {
  Scramble,
  // ScrambleGenerator,
  ScrambleImageProps,
} from "cctimer-scrambles";
import { useMenu } from "store/menuContext";
// import { PuzzleKey, puzzlesData } from "models/puzzles/Puzzle";
import Cube3Image from "components/scramble/cube3/Cube3Image";
// eslint-disable-next-line import/no-webpack-loader-syntax
import GetRandomScrambleWorker from "worker-loader!./workers/getRandomScramble.worker.ts";

type MenuState = {
  // isLoading: boolean;
  scramble: Scramble;
  ScrambleImage?: (props: ScrambleImageProps) => JSX.Element | null;
  refreshScramble: () => void;
};

type TimerProviderProps = {
  children: ReactNode;
};

const TimerContext = createContext<MenuState | null>(null);
const getRandomScrambleWorker = new GetRandomScrambleWorker();

// console.log(GetRandomScrambleWorker);

function useTimer() {
  const context = useContext(TimerContext);

  if (!context) {
    throw new Error("useTimer must be used within the TimerContext");
  }
  return context;
}

function TimerProvider({ children }: TimerProviderProps) {
  const [scramble, setScramble] = useState<Scramble>({ string: "", state: "" });
  // const scramblePuzzleKey = useRef<PuzzleKey>();
  // const scrambleGenerator = useRef<ScrambleGenerator | null>(null);
  const { selectedItem } = useMenu();

  const refreshScramble = useCallback(() => {
    getRandomScrambleWorker.postMessage({});
    // if (scrambleGenerator.current) {
    // console.log(getRandomScrambleWorker);

    // const generator = scrambleGenerator.current;
    // setTimeout(() => {
    //   Promise.resolve(generator.getRandomScramble()).then(
    //     (randomScramble) => {
    //       setScramble(randomScramble);
    //     }
    //   );
    // }, 100);
    // }
  }, []);

  useEffect(() => {
    getRandomScrambleWorker.onmessage = ({ data }: any) => {
      setScramble(data);
    };
    refreshScramble();
  }, [refreshScramble]);

  useEffect(() => {
    // if (selectedItem?.key && scramblePuzzleKey.current !== selectedItem?.key) {
    //   scrambleGenerator.current = null;
    //   puzzlesData[selectedItem.key]
    //     ?.loadScramble?.()
    //     .then(({ default: generator }) => {
    //       scramblePuzzleKey.current = selectedItem?.key;
    //       scrambleGenerator.current = generator;
    //       refreshScramble();
    //     });
    // }
  }, [refreshScramble, selectedItem?.key]);

  return (
    <TimerContext.Provider
      value={{
        scramble,
        ScrambleImage: Cube3Image,
        refreshScramble,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export { TimerProvider, useTimer };
