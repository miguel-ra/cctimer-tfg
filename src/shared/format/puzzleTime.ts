import { TimePenalty } from "models/times/Time";
import { millisecondsToClock } from "./number";

function elapsedTimeToClock(elapsedTime: number, penalty?: TimePenalty) {
  if (penalty === TimePenalty.Dnf) {
    return "DNF";
  }
  if (penalty === TimePenalty.PlusTwo) {
    return `${millisecondsToClock(elapsedTime + 2000)}+`;
  }
  return millisecondsToClock(elapsedTime);
}

export { elapsedTimeToClock };
