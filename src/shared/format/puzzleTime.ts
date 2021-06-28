import { PuzzleTime, TimePenalty } from "models/times/Time";
import { millisecondsToClock } from "./number";

function elapsedTimeWithPenaltyCompact(elapsedTime: number, penalty?: TimePenalty) {
  if (penalty === TimePenalty.Dnf) {
    return "DNF";
  }
  if (penalty === TimePenalty.PlusTwo) {
    return `${millisecondsToClock(elapsedTime + 2000)}+`;
  }
  return millisecondsToClock(elapsedTime);
}

function elapsedTimeWithPenalty(elapsedTime: number, penalty?: TimePenalty) {
  if (penalty === TimePenalty.Dnf && elapsedTime) {
    return `DNF(${millisecondsToClock(elapsedTime)})`;
  }
  return elapsedTimeWithPenaltyCompact(elapsedTime, penalty);
}

function puzzleTimeToValue(puzzleTime: PuzzleTime) {
  if (puzzleTime.penalty === TimePenalty.Dnf) {
    return Infinity;
  }
  if (puzzleTime.penalty === TimePenalty.PlusTwo) {
    return puzzleTime.elapsedTime + 2000;
  }
  return puzzleTime.elapsedTime;
}

export { elapsedTimeWithPenaltyCompact, elapsedTimeWithPenalty, puzzleTimeToValue };
