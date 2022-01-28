import { useCallback } from "react";
import { atom, useRecoilCallback, useRecoilState } from "recoil";
import LoadScrambleWorker from "workerize-loader!./loadScramble.worker.ts";

import { PuzzleId, PuzzleKey } from "models/puzzles/Puzzle";
import { Scramble } from "models/timer/scramble";
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

const emptyScramble: Scramble = { puzzleKey: undefined, text: "", state: "" };

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

        if (selectedItem && selectedItem.id) {
          loadScrambleWorker.postMessage(selectedItem);
        }
      },
    []
  );

  const handleWorkerMessage = useRecoilCallback(
    ({ snapshot, set }) =>
      async ({ data: { userPuzzle, randomScramble } }: LoadScrambleResponse) => {
        const selectedItem = await snapshot.getPromise(useTimerSelectedItem.state);
        if (!randomScramble || !selectedItem || selectedItem.id !== userPuzzle.id) {
          return;
        }

        const newScramble = {
          ...randomScramble,
          puzzleKey: selectedItem?.key,
        };
        set(useScramble.state, newScramble);
      },
    []
  );

  const startWorker = useCallback(() => {
    loadScrambleWorker.addEventListener("message", handleWorkerMessage);
  }, [handleWorkerMessage]);

  const stopWorker = useCallback(() => {
    loadScrambleWorker.removeEventListener("message", handleWorkerMessage);
  }, [handleWorkerMessage]);

  const resetScramble = useRecoilCallback(
    ({ set }) =>
      () => {
        set(useScramble.state, emptyScramble);
      },
    []
  );

  return {
    scramble: scramble.puzzleKey === selectedItem?.key ? scramble : emptyScramble,
    setScramble,
    refreshScramble,
    startWorker,
    stopWorker,
    resetScramble,
  };
}
useScramble.state = scrambleState;

function useTimerSelectedItem() {
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState);

  const resetSelectedItem = useRecoilCallback(
    ({ set }) =>
      () => {
        set(useTimerSelectedItem.state, undefined);
      },
    []
  );

  return { selectedItem, setSelectedItem, resetSelectedItem };
}
useTimerSelectedItem.state = selectedItemState;

function useTimer() {
  const navigate = useNavigate();
  const puzzlesRepository = usePuzzlesRepository();

  const checkPuzzleAndRedirect = useRecoilCallback(
    ({ snapshot, set }) =>
      async (puzzleId?: PuzzleId) => {
        const selectedItem = await snapshot.getPromise(useTimerSelectedItem.state);

        if (selectedItem && selectedItem.id === puzzleId) {
          return;
        }

        let userPuzzle;
        if (puzzleId) {
          userPuzzle = await puzzlesRepository.findById(puzzleId);
          if (!userPuzzle) {
            navigate("/", { replace: true });
            return;
          }
        } else {
          const userPuzzles = await puzzlesRepository.getAll();
          if (userPuzzles.length) {
            userPuzzle = userPuzzles[0];
          }
        }

        if (userPuzzle) {
          set(useTimerSelectedItem.state, {
            ...userPuzzle,
            type: "puzzle",
          });
        }
      },
    [navigate, puzzlesRepository]
  );

  return {
    checkPuzzleAndRedirect,
  };
}

export type { SelelecteItemType };
export { useTimerSelectedItem, useTimer, useScramble };
