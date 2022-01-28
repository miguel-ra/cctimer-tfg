import { useCallback } from "react";
import { atom, useRecoilCallback, useRecoilState } from "recoil";
import LoadComputeStats from "workerize-loader!./computeStats.worker.ts";

import { usePuzzleTimes } from "features/times/timesViewModel";
import { PuzzleStats } from "models/stats/Stats";

import { LoadScrambleResponse } from "./computeStats.worker";

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

  const startWorker = useCallback(() => {
    function handleWorkerMessage({ data: computedPuzzleStats }: { data: LoadScrambleResponse }) {
      if (computedPuzzleStats?.single) {
        setPuzzleStats(computedPuzzleStats);
      }
    }
    loadComputeStatsWorker.addEventListener("message", handleWorkerMessage);
    return handleWorkerMessage;
  }, [setPuzzleStats]);

  const stopWorker = useCallback((handleWorkerMessage) => {
    return () => {
      loadComputeStatsWorker.removeEventListener("message", handleWorkerMessage);
    };
  }, []);

  return {
    puzzleStats,
    refreshStats,
    startWorker,
    stopWorker,
  };
}

export default useStats;
