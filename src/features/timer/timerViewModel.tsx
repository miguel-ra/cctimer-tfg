import { Scramble } from "cctimer-scrambles";
import { useCallback, useEffect, useRef } from "react";
import { atom, useRecoilState } from "recoil";
import LoadScrambleWorker from "workerize-loader!./loadScramble.worker.ts";

import useStats from "features/stats/statsViewModel";
import useTimes from "features/times/timesViewModel";
import { PuzzleId, PuzzleKey } from "models/puzzles/Puzzle";
import { Time } from "models/times/Time";

import { LoadScrambleResponse } from "./loadScramble.worker";

type SelelecteItemType = "puzzle";

type TimerConfig = {
  selectedItem: {
    id: PuzzleId;
    key: PuzzleKey;
    type: SelelecteItemType;
  } | null;
};

const loadScrambleWorker = new LoadScrambleWorker();

const emptyScramble = { text: "", state: "" };

const scrambleState = atom<Scramble>({
  key: "timer.scramble",
  default: emptyScramble,
});

const configState = atom<TimerConfig>({
  key: "timer.config",
  default: { selectedItem: null },
});

function useTimer() {
  const [scramble, setScramble] = useRecoilState(scrambleState);
  const [config, setConfig] = useRecoilState(configState);
  const scramblePuzzleKey = useRef<PuzzleKey>();

  const refreshScramble = useCallback(async () => {
    if (config.selectedItem?.key) {
      loadScrambleWorker.postMessage(config.selectedItem.key);
    } else {
      scramblePuzzleKey.current = undefined;
    }
  }, [config]);

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
    scramble: scramblePuzzleKey.current === config.selectedItem?.key ? scramble : emptyScramble,
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
