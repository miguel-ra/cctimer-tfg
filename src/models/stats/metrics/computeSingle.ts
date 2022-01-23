import { PuzzleTimeValue } from "models/times/Time";

import { Stat } from "../Stats";

import { getBest, getCurrent } from "./shared";

function computeSingle(timesValues: PuzzleTimeValue[]) {
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
