import { PuzzleTimeValue } from "models/times/Time";
import computeAverage from "./computeAverage";

function computeMean(timesValues: PuzzleTimeValue[], size: number) {
  return computeAverage(timesValues, size, 0);
}

export default computeMean;
