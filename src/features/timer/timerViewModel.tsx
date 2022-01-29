import { useCallback, useMemo } from "react";
import { useRecoilCallback } from "recoil";

import { PuzzleId, PuzzleKey } from "models/puzzles/Puzzle";
import { Scramble } from "models/timer/scramble";
import { usePuzzlesRepository } from "repositories/puzzles/puzzlesRepository";
import useNavigate from "shared/hooks/useNavigate";
import { generateUseState } from "shared/recoil";

import { LoadScrambleResponse } from "./loadScramble.worker";
import LoadScrambleWorker from "./loadScramble.worker?worker";

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

const useScrambleState = generateUseState<Scramble>({
  key: "timer.scramble",
  default: emptyScramble,
});

const useSelectedItemState = generateUseState<SelectedItem>({
  key: "timer.selectedItem",
  default: undefined,
});

function useScramble() {
  const [selectedItem] = useSelectedItemState();
  const [scramble] = useScrambleState();

  const scrambleMemo = useMemo(
    () => (scramble.puzzleKey === selectedItem?.key ? scramble : emptyScramble),
    [scramble, selectedItem?.key]
  );

  const refreshScramble = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        const selectedItem = await snapshot.getPromise(useSelectedItemState.atom);

        if (selectedItem && selectedItem.id) {
          loadScrambleWorker.postMessage(selectedItem);
        }
      },
    []
  );

  const handleWorkerMessage = useRecoilCallback(
    ({ snapshot, set }) =>
      async ({ data: { userPuzzle, randomScramble } }: LoadScrambleResponse) => {
        const selectedItem = await snapshot.getPromise(useSelectedItemState.atom);
        if (!randomScramble || !selectedItem || selectedItem.id !== userPuzzle.id) {
          return;
        }

        const newScramble = {
          ...randomScramble,
          puzzleKey: selectedItem?.key,
        };
        set(useScrambleState.atom, newScramble);
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
        set(useScrambleState.atom, emptyScramble);
      },
    []
  );

  return {
    scramble: scrambleMemo,
    refreshScramble,
    startWorker,
    stopWorker,
    resetScramble,
  };
}

function useSelectedItem() {
  const [selectedItem, setSelectedItem] = useSelectedItemState();

  const resetSelectedItem = useRecoilCallback(
    ({ set }) =>
      () => {
        set(useSelectedItemState.atom, undefined);
      },
    []
  );

  return { selectedItem, setSelectedItem, resetSelectedItem };
}

function useTimer() {
  const navigate = useNavigate();
  const puzzlesRepository = usePuzzlesRepository();

  const checkPuzzleAndRedirect = useRecoilCallback(
    ({ snapshot, set }) =>
      async (puzzleId?: PuzzleId) => {
        const selectedItem = await snapshot.getPromise(useSelectedItemState.atom);

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
          set(useSelectedItemState.atom, {
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
export { useSelectedItemState, useScrambleState, useSelectedItem, useTimer, useScramble };
