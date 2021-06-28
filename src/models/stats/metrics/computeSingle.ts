import { PuzzleTimeValue } from "models/times/Time";
import { Stat } from "../Stats";

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

function computeSingle(timesValues: PuzzleTimeValue[] = []) {
  const stats: Stat[] = timesValues.map((puzzleTime) => ({
    value: puzzleTime.value,
    ids: [puzzleTime.id],
  }));

  return {
    current: getCurrent(stats),
    best: getBest(stats),
  };
}

export default computeSingle;
