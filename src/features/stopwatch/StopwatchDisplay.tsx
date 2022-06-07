import { StopwatchStatus } from "models/timer/stopwatch";
import { Time } from "models/times/Time";
import { useSettings } from "store/settingsContext";

import displayTime from "./displayTime";
import QuickActions from "./QuickActions";
import useStyles from "./Stopwatch.styles";

type StopwatchDisplayProps = {
  status: StopwatchStatus;
  time: Time;
};

function StopwatchDisplay({ status, time }: StopwatchDisplayProps) {
  const classes = useStyles();
  const { settings } = useSettings();

  const inspectionTime = settings.inspection.time * 1000;

  return (
    <div className={classes.container} style={{ cursor: "default" }}>
      <div className={classes.displayWrapper}>
        <div className={classes.display}>
          {displayTime({
            status,
            elapsedTime: time.elapsedTime,
            penalty: time?.penalty,
            remainingTime: inspectionTime - (time?.elapsedTime || 0),
          })}
          <QuickActions hideDelete />
        </div>
      </div>
    </div>
  );
}

export default StopwatchDisplay;
