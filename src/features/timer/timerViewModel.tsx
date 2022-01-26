import { Scramble } from "cctimer-scrambles";
import { useCallback, useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import LoadScrambleWorker from "workerize-loader!./loadScramble.worker.ts";

import useStats from "features/stats/statsViewModel";
import useTimes from "features/times/timesViewModel";
import { PuzzleId, PuzzleKey } from "models/puzzles/Puzzle";
import { Time } from "models/times/Time";

import { LoadScrambleResponse } from "./loadScramble.worker";

type SelelecteItemType = "puzzle";

type TimerConfig = {
  selectedItem:
    | {
        id: PuzzleId;
        key: PuzzleKey;
        type: SelelecteItemType;
      }
    | undefined;
};

const loadScrambleWorker = new LoadScrambleWorker();

const emptyScramble = { puzzleKey: "", text: "", state: "" };

const scrambleState = atom<Scramble>({
  key: "timer.scramble",
  default: emptyScramble,
});

const configState = atom<TimerConfig>({
  key: "timer.config",
  default: { selectedItem: undefined },
});

function useTimer() {
  const [scramble, setScramble] = useRecoilState(scrambleState);
  const [config, setConfig] = useRecoilState(configState);

  const refreshScramble = useCallback(() => {
    if (config.selectedItem?.key) {
      loadScrambleWorker.postMessage(config.selectedItem.key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.selectedItem]);

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
        setScramble({ ...randomScramble, puzzleKey });
      }
    }
    loadScrambleWorker.addEventListener("message", handleWorkerMessage);
    return () => {
      loadScrambleWorker.removeEventListener("message", handleWorkerMessage);
    };
  }, [setScramble]);

  return {
    config,
    setConfig,
    puzzleTimes,
    lastTime,
    addTime: addTimeWithScramble,
    updateTime,
    deleteTime,
    deletePuzzleTimes,
    scramble: scramble.puzzleKey === config.selectedItem?.key ? scramble : emptyScramble,
    refreshScramble,
    puzzleStats,
  };
}

function useTimerSelectedItem() {
  const [{ selectedItem }] = useRecoilState(configState);

  return { selectedItem };
}

export type { SelelecteItemType };

export { useTimerSelectedItem, useTimer };
