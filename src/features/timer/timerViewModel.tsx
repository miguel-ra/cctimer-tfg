import { Scramble } from "cctimer-scrambles";
import { useCallback } from "react";
import { atom, useRecoilCallback, useRecoilState } from "recoil";
import LoadScrambleWorker from "workerize-loader!./loadScramble.worker.ts";

import { PuzzleId, PuzzleKey } from "models/puzzles/Puzzle";
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

  const refreshScramble = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        const selectedItem = await snapshot.getPromise(useTimerSelectedItem.state);

        if (selectedItem?.key) {
          loadScrambleWorker.postMessage(selectedItem.key);
        }
      },
    []
  );

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
useScramble.state = scrambleState;

function useTimerSelectedItem() {
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState);

  return { selectedItem, setSelectedItem };
}
useTimerSelectedItem.state = selectedItemState;

function useTimer() {
  const { setSelectedItem } = useTimerSelectedItem();
  const navigate = useNavigate();
  const puzzlesRepository = usePuzzlesRepository();

  const checkPuzzleAndRedirect = useCallback(
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
    checkPuzzleAndRedirect,
  };
}

export type { SelelecteItemType };
export { useTimerSelectedItem, useTimer, useScramble };
