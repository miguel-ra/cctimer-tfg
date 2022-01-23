/* eslint-disable @typescript-eslint/no-explicit-any */
import { PuzzleStats, StatKey, statsConfig } from "models/stats/Stats";
import { PuzzleTime } from "models/times/Time";
import { puzzleTimeToValue } from "shared/format/puzzleTime";

type LoadScrambleResponse = PuzzleStats;

async function computeStats(puzzleTimes: PuzzleTime[]): Promise<LoadScrambleResponse> {
  const timesValues = puzzleTimes.map((puzzleTime) => ({
    id: puzzleTime.id,
    value: puzzleTimeToValue(puzzleTime),
  }));

  const statsComputed = Object.entries(statsConfig).map(([metricKey, metric]) => {
    return [metricKey as StatKey, metric.compute(timesValues)];
  });

  const puzzleStats: PuzzleStats = Object.fromEntries(statsComputed);

  return puzzleStats;
}

const ctx: Worker = self as any;

ctx.addEventListener("message", ({ data: puzzleKey }: { data: PuzzleTime[] }) => {
  computeStats(puzzleKey).then((response) => {
    ctx.postMessage(response);
  });
});

export type { LoadScrambleResponse };

// We need to export anything otherwise typescript would complain that
// it can't find a module
export default null as any;
