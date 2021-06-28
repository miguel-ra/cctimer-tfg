import { PuzzleStats } from "models/stats/Stats";
import { PuzzleTime } from "models/times/Time";
import { useEffect, useState } from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import LoadComputeStats from "workerize-loader!./computeStats.worker.ts";
import { LoadScrambleResponse } from "./computeStats.worker";

type UseStatsProps = {
  puzzleTimes: PuzzleTime[];
};

const loadComputeStatsWorker = new LoadComputeStats();

function useStats({ puzzleTimes }: UseStatsProps) {
  const [puzzleStats, setPuzzleStats] = useState<PuzzleStats>({ single: {} });

  useEffect(() => {
    loadComputeStatsWorker.postMessage(puzzleTimes);
  }, [puzzleTimes]);

  useEffect(() => {
    function handleWorkerMessage({ data: computedPuzzleStats }: { data: LoadScrambleResponse }) {
      setPuzzleStats(computedPuzzleStats);
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
