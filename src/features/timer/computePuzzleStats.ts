import { statsConfig, PuzzleStats, StatKey, Stat } from "models/stats/Stats";
import { PuzzleTime } from "models/times/Time";
import { puzzleTimeToFinalTime } from "shared/format/puzzleTime";

function getCurrent(stats: Stat[]) {
  if (!stats.length) {
    return;
  }
  return stats[stats.length - 1];
}

function getBest(stats: Stat[]) {
  if (!stats.length) {
    return;
  }
  return stats.reduce((best, next) => (next.value <= best.value ? next : best));
}

function computeSingle(puzzleTimes: PuzzleTime[]) {
  const stats: Stat[] = puzzleTimes.map((puzzleTime) => ({
    value: puzzleTimeToFinalTime(puzzleTime),
    ids: [puzzleTime.id],
  }));

  return {
    current: getCurrent(stats),
    best: getBest(stats),
  };
}

function computePuzzleStats(puzzleTimes: PuzzleTime[]) {
  const statsComputed = Object.entries(statsConfig).map(([metricKey, metric]) => {
    return [metricKey as StatKey, computeSingle(puzzleTimes)];
  });

  const puzzleStats: PuzzleStats = Object.fromEntries(statsComputed);

  return puzzleStats;
}

export default computePuzzleStats;
