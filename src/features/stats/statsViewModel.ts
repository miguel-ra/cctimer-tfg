import { selector, useRecoilValue } from "recoil";

import { puzzleTimesState } from "features/times/timesViewModel";
import { PuzzleStats, StatKey, statsConfig } from "models/stats/Stats";
import { puzzleTimeToValue } from "shared/format/puzzleTime";

const puzzleStatsSelector = selector({
  key: "stats.puzzleStats",
  get: ({ get }) => {
    const puzzleTimes = get(puzzleTimesState);

    const timesValues = puzzleTimes.map((puzzleTime) => ({
      id: puzzleTime.id,
      value: puzzleTimeToValue(puzzleTime),
    }));

    const statsComputed = Object.entries(statsConfig).map(([metricKey, metric]) => {
      return [metricKey as StatKey, metric.compute(timesValues)];
    });

    const puzzleStats: PuzzleStats = Object.fromEntries(statsComputed);

    return { puzzleStats };
  },
});

function useStats() {
  return useRecoilValue(puzzleStatsSelector);
}

export default useStats;
