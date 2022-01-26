import { Scramble } from "cctimer-scrambles";
import { useCallback } from "react";
import { atom, useRecoilState } from "recoil";
import LoadScrambleWorker from "workerize-loader!./loadScramble.worker.ts";

import useTimes from "features/times/timesViewModel";
import { PuzzleId, PuzzleKey } from "models/puzzles/Puzzle";
import { Time } from "models/times/Time";
import { usePuzzlesRepository } from "repositories/puzzles/puzzlesRepository";
import useNavigate from "shared/hooks/useNavigate";

import { LoadScrambleResponse } from "./loadScramble.worker";

type SelelecteItemType = "puzzle";

type SelectedItem =
  | {
      id: PuzzleId;
      key: PuzzleKey;
      type: SelelecteItemType;
    }
  | undefined;

const loadScrambleWorker = new LoadScrambleWorker();

const emptyScramble = { puzzleKey: "", text: "", state: "" };

const scrambleState = atom<Scramble>({
  key: "timer.scramble",
  default: emptyScramble,
});

const selectedItemState = atom<SelectedItem>({
  key: "timer.selectedItem",
  default: undefined,
});

function useScramble() {
  const { selectedItem } = useTimerSelectedItem();
  const [scramble, setScramble] = useRecoilState(scrambleState);

  const refreshScramble = useCallback(() => {
    if (selectedItem?.key) {
      loadScrambleWorker.postMessage(selectedItem.key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);

  const startWorker = useCallback(() => {
    function handleWorkerMessage({ data: { puzzleKey, randomScramble } }: { data: LoadScrambleResponse }) {
      if (randomScramble) {
        setScramble({ ...randomScramble, puzzleKey });
      }
    }
    loadScrambleWorker.addEventListener("message", handleWorkerMessage);
    return handleWorkerMessage;
  }, [setScramble]);

  const stopWorker = useCallback((handleWorkerMessage) => {
    return () => {
      loadScrambleWorker.removeEventListener("message", handleWorkerMessage);
    };
  }, []);

  return {
    scramble: scramble.puzzleKey === selectedItem?.key ? scramble : emptyScramble,
    setScramble,
    refreshScramble,
    startWorker,
    stopWorker,
  };
}

function useTimerSelectedItem() {
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState);

  return { selectedItem, setSelectedItem };
}

function useTimer() {
  const { scramble, refreshScramble } = useScramble();
  const { setSelectedItem } = useTimerSelectedItem();
  const navigate = useNavigate();
  // TODO: Try to move this to usePuzzle
  const puzzlesRepository = usePuzzlesRepository();

  const { lastTime, addTime, updateTime, deleteTime, deletePuzzleTimes, refreshPuzzleTimes } = useTimes({
    onTimeAdded: refreshScramble,
  });

  const addTimeWithScramble = useCallback((time: Time) => addTime(time, scramble), [addTime, scramble]);

  const checkPuzzleId = useCallback(
    async (puzzleId: PuzzleId) => {
      let userPuzzle;

      if (puzzleId) {
        userPuzzle = await puzzlesRepository.findById(Number(puzzleId));
        if (!userPuzzle) {
          navigate("/", { replace: true });
          return;
        }
      } else {
        const userPuzzles = await puzzlesRepository.getAll();
        if (!userPuzzles || !userPuzzles.length) {
          return;
        }
        userPuzzle = userPuzzles[0];
      }

      if (userPuzzle) {
        setSelectedItem({
          ...userPuzzle,
          type: "puzzle",
        });
      }
    },
    [navigate, puzzlesRepository, setSelectedItem]
  );

  return {
    lastTime,
    addTime: addTimeWithScramble,
    updateTime,
    deleteTime,
    deletePuzzleTimes,
    checkPuzzleId,
    refreshPuzzleTimes,
  };
}

export type { SelelecteItemType };
export { useTimerSelectedItem, useTimer, useScramble };
