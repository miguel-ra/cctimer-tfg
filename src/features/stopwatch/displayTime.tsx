import { StopwatchStatus } from "models/timer/stopwatch";
import { TimePenalty } from "models/times/Time";
import { millisecondsToClock, millisecondsToSeconds } from "shared/format/number";
import { elapsedTimeWithPenaltyCompact } from "shared/format/puzzleTime";

function displayTime({
  status,
  elapsedTime,
  remainingTime,
  penalty,
}: {
  status: StopwatchStatus;
  elapsedTime: number;
  remainingTime: number;
  penalty?: TimePenalty;
}) {
  return (
    <>
      {status === StopwatchStatus.Idle && elapsedTimeWithPenaltyCompact(elapsedTime, penalty)}
      {status === StopwatchStatus.Inspection && millisecondsToSeconds(remainingTime) + 1}
      {status === StopwatchStatus.PlusTwo && "+2"}
      {status === StopwatchStatus.Dnf && "DNF"}
      {status === StopwatchStatus.Running && millisecondsToClock(elapsedTime)}
    </>
  );
}

export default displayTime;
