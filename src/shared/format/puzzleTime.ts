import { TimePenalty } from "models/times/Time";
import { millisecondsToClock } from "./number";

function elapsedTimeToClockCompact(elapsedTime: number, penalty?: TimePenalty) {
  if (penalty === TimePenalty.Dnf) {
    return "DNF";
  }
  if (penalty === TimePenalty.PlusTwo) {
    return `${millisecondsToClock(elapsedTime + 2000)}+`;
  }
  return millisecondsToClock(elapsedTime);
}

function elapsedTimeToClock(elapsedTime: number, penalty?: TimePenalty) {
  if (penalty === TimePenalty.Dnf && elapsedTime) {
    return `DNF(${millisecondsToClock(elapsedTime)})`;
  }
  return elapsedTimeToClockCompact(elapsedTime, penalty);
}

export { elapsedTimeToClockCompact, elapsedTimeToClock };
