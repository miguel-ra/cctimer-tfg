import { useCallback, useMemo } from "react";
import { useRecoilCallback } from "recoil";
import LoadScrambleWorker from "workerize-loader!./loadScramble.worker.ts";

import { useRoomTimer } from "features/rooms/timer/roomTimerContext";
import { useSelectedItemState } from "features/router/routerViewModel";
import { Scramble } from "models/timer/scramble";
import { generateUseState } from "shared/recoil";

import { LoadScrambleResponse } from "./loadScramble.worker";

const loadScrambleWorker = new LoadScrambleWorker();

const emptyScramble: Scramble = { puzzleKey: undefined, text: "", state: "" };

const useScrambleState = generateUseState<Scramble>({
  key: "timer.scramble",
  default: emptyScramble,
});

function useScramble() {
  const roomState = useRoomTimer();
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
    if (roomState.isHost) {
      return;
    }
    loadScrambleWorker.addEventListener("message", handleWorkerMessage);
  }, [handleWorkerMessage, roomState.isHost]);

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

export { useScrambleState, useScramble };
