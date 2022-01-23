import { PuzzleTimeValue, TimeId } from "models/times/Time";
import { Stat } from "../Stats";
import { calculateTrim, getBest, getCurrent } from "./shared";

function arrayWindowSlice(array: PuzzleTimeValue[], size: number) {
  const result: PuzzleTimeValue[][] = [];
  array.forEach((_, i) => {
    if (i + size <= array.length) {
      result.push(array.slice(i, i + size));
    }
  });
  return result;
}

function timeCompare(a: PuzzleTimeValue, b: PuzzleTimeValue) {
  if (a.value === Infinity) return 1;
  if (b.value === Infinity) return -1;
  return Math.sign(a.value - b.value);
}

function computeAverage(timesValues: PuzzleTimeValue[], size: number, trimParam?: number) {
  if (timesValues.length < size) {
    return {};
  }
  const slicedTimes = arrayWindowSlice(timesValues, size);
  const sortedSlicedTimes = slicedTimes.map((slice) => slice.sort(timeCompare));
  const trim = trimParam ?? calculateTrim(size);

  const stats: Stat[] = sortedSlicedTimes.map((sortedSlice) => {
    const [total, ids] = sortedSlice
      .slice(trim, sortedSlice.length - trim)
      .reduce((accu, timeValue) => [accu[0] + timeValue.value, [...accu[1], timeValue.id]], [0, []] as [
        number,
        TimeId[]
      ]);

    return { value: total / (size - trim), ids };
  });

  return {
    current: getCurrent(stats),
    best: getBest(stats),
  };
}

export default computeAverage;
