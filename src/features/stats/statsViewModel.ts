import { useCallback } from "react";
import { useRecoilCallback } from "recoil";

import { usePuzzleTimesState } from "features/times/timesViewModel";
import { PuzzleStats } from "models/stats/Stats";
import { generateUseState } from "shared/recoil";

import { ComputeStatsResponse } from "./computeStats.worker";
import LoadComputeStats from "./computeStats.worker?worker";

const loadComputeStatsWorker = new LoadComputeStats();

const usePuzzleStatesState = generateUseState<PuzzleStats | null>({
  key: "stats.puzzleStats",
  default: null,
});

function useStats() {
  const [puzzleStats] = usePuzzleStatesState();

  const refreshStats = useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        const puzzleTimes = await snapshot.getPromise(usePuzzleTimesState.atom);

        if (puzzleTimes.length >= 2) {
          loadComputeStatsWorker.postMessage(puzzleTimes);
        } else {
          set(usePuzzleStatesState.atom, null);
        }
      },
    []
  );

  const handleWorkerMessage = useRecoilCallback(
    ({ set }) =>
      async ({ data: computedPuzzleStats }: ComputeStatsResponse) => {
        if (computedPuzzleStats?.single) {
          set(usePuzzleStatesState.atom, computedPuzzleStats);
        }
      },
    []
  );

  const startWorker = useCallback(() => {
    loadComputeStatsWorker.addEventListener("message", handleWorkerMessage);
  }, [handleWorkerMessage]);

  const stopWorker = useCallback(() => {
    return () => {
      loadComputeStatsWorker.removeEventListener("message", handleWorkerMessage);
    };
  }, [handleWorkerMessage]);

  return {
    puzzleStats,
    refreshStats,
    startWorker,
    stopWorker,
  };
}

export default useStats;
