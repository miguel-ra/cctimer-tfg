import { StatValue } from "models/stats/Stats";
import { millisecondsToClock } from "shared/format/number";

function statValueToString(value?: StatValue) {
  if (!value) {
    return "-";
  }
  if (value === Infinity) {
    return "DNF";
  }
  return millisecondsToClock(value);
}

export { statValueToString };
