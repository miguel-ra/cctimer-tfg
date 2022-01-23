import { PuzzleTimeValue } from "models/times/Time";

import { filterDnf } from "./shared";

function computeStandardDeviation(timesValues: PuzzleTimeValue[]) {
  const nonDnfTimes = filterDnf(timesValues);
  const mean = nonDnfTimes.reduce((total, time) => time.value + total, 0) / nonDnfTimes.length;
  const variance =
    nonDnfTimes.reduce((total, time) => Math.pow(time.value - mean, 2) + total, 0) / (nonDnfTimes.length - 1);

  return { current: { value: Math.sqrt(variance), ids: [] } };
}

export default computeStandardDeviation;
