import { useEffect, useState } from "react";
import LoadComputeStats from "workerize-loader!./computeStats.worker.ts";

import { PuzzleStats } from "models/stats/Stats";
import { PuzzleTime } from "models/times/Time";

import { LoadScrambleResponse } from "./computeStats.worker";

type UseStatsProps = {
  puzzleTimes: PuzzleTime[];
};

const loadComputeStatsWorker = new LoadComputeStats();

function useStats({ puzzleTimes }: UseStatsProps) {
  const [puzzleStats, setPuzzleStats] = useState<PuzzleStats | null>(null);

  useEffect(() => {
    if (puzzleTimes.length >= 2) {
      loadComputeStatsWorker.postMessage(puzzleTimes);
    } else {
      setPuzzleStats(null);
    }
  }, [puzzleTimes]);

  useEffect(() => {
    function handleWorkerMessage({ data: computedPuzzleStats }: { data: LoadScrambleResponse }) {
      if (computedPuzzleStats?.single) {
        setPuzzleStats(computedPuzzleStats);
      }
    }
    loadComputeStatsWorker.addEventListener("message", handleWorkerMessage);
    return () => {
      loadComputeStatsWorker.removeEventListener("message", handleWorkerMessage);
    };
  }, []);

  return {
    puzzleStats,
  };
}

export default useStats;
