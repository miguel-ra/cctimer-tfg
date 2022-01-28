import { useCallback } from "react";
import { atom, useRecoilCallback, useRecoilState } from "recoil";
import LoadComputeStats from "workerize-loader!./computeStats.worker.ts";

import { usePuzzleTimes } from "features/times/timesViewModel";
import { PuzzleStats } from "models/stats/Stats";

import { ComputeStatsResponse } from "./computeStats.worker";

const loadComputeStatsWorker = new LoadComputeStats();

const puzzleStatsState = atom<PuzzleStats | null>({
  key: "stats.puzzleStats",
  default: null,
});

function useStats() {
  const [puzzleStats, setPuzzleStats] = useRecoilState(puzzleStatsState);

  const refreshStats = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        const puzzleTimes = await snapshot.getPromise(usePuzzleTimes.state);

        if (puzzleTimes.length >= 2) {
          loadComputeStatsWorker.postMessage(puzzleTimes);
        } else {
          setPuzzleStats(null);
        }
      },
    [setPuzzleStats]
  );

  const handleWorkerMessage = useRecoilCallback(
    ({ set }) =>
      async ({ data: computedPuzzleStats }: ComputeStatsResponse) => {
        if (computedPuzzleStats?.single) {
          set(puzzleStatsState, computedPuzzleStats);
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
