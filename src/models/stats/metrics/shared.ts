import { PuzzleTimeValue } from "models/times/Time";
import { Stat } from "../Stats";

const TRIM_PERCENTAGE = 0.05;

function calculateTrim(size: number) {
  return Math.ceil(size * TRIM_PERCENTAGE);
}

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

function filterDnf(timesValues: PuzzleTimeValue[]) {
  return timesValues.filter((time) => time.value !== Infinity);
}

export { calculateTrim, getCurrent, getBest, filterDnf };
