import { StatValue } from "models/stats/Stats";
import { millisecondsToClock } from "./number";

// TODO : Move this to the model folder

function statToString(value?: StatValue) {
  if (!value) {
    return "-";
  }
  if (value === Infinity) {
    return "DNF";
  }
  return millisecondsToClock(value);
}

export { statToString };
