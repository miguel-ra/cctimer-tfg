import { useCallback, useEffect, useRef, useState } from "react";
import { useDrag } from "react-use-gesture";
import { millisecondsToSeconds, millisecondsToClock } from "shared/format/number";
import { Time, TimePenalty } from "models/times/Time";
import { useSettings } from "store/settingsContext";
import useStopwatch from "./useStopwatch";
import Pressable from "./Pressable";
import useStyles from "./Stopwatch.styles";
import { useMenu } from "store/menuContext";

// TODO: Refactor to avoid use useCallback

type StopwatchProps = {
  onSave: (time: Time) => void;
};

enum Status {
  Idle,
  PlusTwo,
  Dnf,
  Inspection,
  Running,
}

const statusPenalty: { [key in Status]?: TimePenalty } = {
  [Status.PlusTwo]: TimePenalty.PlusTwo,
  [Status.Dnf]: TimePenalty.Dnf,
};

function Stopwatch({ onSave }: StopwatchProps) {
  const classes = useStyles();
  const { settings } = useSettings();
  const { startStopwatch, stopStopwatch, resetStopwatch, elapsedTime, remainingTime } = useStopwatch();
  const ready = useRef<boolean | null>(!settings.timer.holdToStart);
  const [status, setStatus] = useState(Status.Idle); // TODO: Create status constats
  const [color, setColor] = useState("inherit");
  const { selectedItem } = useMenu();
  const holdStartedAt = useRef<number | null>(null);
  const dataToSave = useRef<Time>();

  useEffect(() => {
    resetStopwatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);

  useEffect(() => {
    ready.current = !settings.timer.holdToStart;
  }, [settings.timer.holdToStart]);

  useEffect(() => {
    let penalty = dataToSave?.current?.penalty;
    if (penalty !== TimePenalty.Dnf && statusPenalty[status]) {
      penalty = statusPenalty[status];
    }
    dataToSave.current = {
      penalty,
      elapsedTime: penalty === TimePenalty.Dnf ? 0 : elapsedTime,
    } as Time;
  }, [elapsedTime, status]);

  const saveTime = useCallback(() => {
    if (dataToSave.current) {
      onSave({ ...dataToSave.current });
    }
    dataToSave.current = undefined;
  }, [onSave]);

  const setDNF = useCallback(() => {
    ready.current = false;
    setStatus(Status.Dnf);
    resetStopwatch();
    saveTime();
  }, [resetStopwatch, saveTime]);

  const startPlusTwo = useCallback(() => {
    setStatus(Status.PlusTwo);
    startStopwatch({
      countDown: 2000,
      onTimeout: setDNF,
    });
  }, [setDNF, startStopwatch]);

  const startInspection = useCallback(() => {
    setStatus(Status.Inspection);
    startStopwatch({
      countDown: settings.inspection.time * 1000 || 15000,
      onTimeout: startPlusTwo,
    });
  }, [startStopwatch, settings.inspection.time, startPlusTwo]);

  const handlePress = useCallback(() => {
    (document.activeElement as HTMLElement)?.blur?.();
    if (status === Status.Running) {
      ready.current = null;
      stopStopwatch();
      setStatus(Status.Idle);
      saveTime();
      return;
    }
    if (status === Status.Dnf) {
      setStatus(Status.Idle);
    }
    if (settings.timer.holdToStart) {
      const beginningAt = Date.now();
      holdStartedAt.current = beginningAt;
      setColor("red");
      setTimeout(() => {
        if (beginningAt === holdStartedAt.current) {
          setColor("green");
          ready.current = true;
        }
      }, 500);
    }
  }, [saveTime, settings.timer.holdToStart, status, stopStopwatch]);

  const handleRelease = useCallback(() => {
    setColor("inherit");
    holdStartedAt.current = null;
    if (!ready.current) {
      ready.current = !settings.timer.holdToStart;
      return;
    }
    if (settings.inspection.enabled && [Status.Idle, Status.Dnf].includes(status)) {
      ready.current = !settings.timer.holdToStart;
      startInspection();
      return;
    }

    startStopwatch();
    setStatus(Status.Running);
  }, [settings.inspection.enabled, settings.timer.holdToStart, startInspection, startStopwatch, status]);

  const keyDownHandler = useCallback(
    (event) => {
      if (status !== Status.Idle) {
        event.preventDefault();
      }
      if (status !== Status.Running && event.key !== " ") {
        return false;
      }
      handlePress();
      return true;
    },
    [handlePress, status]
  );

  const keyUpHandler = useCallback(
    (event) => {
      if (ready.current === null || event.key !== " ") {
        ready.current = !settings.timer.holdToStart;
        return false;
      }
      handleRelease();
      return true;
    },
    [handleRelease, settings.timer.holdToStart]
  );

  const bind = useDrag(
    ({ distance, cancel }) => {
      if (distance > 50) {
        ready.current = false;
        holdStartedAt.current = null;
        setStatus(Status.Idle);
        setColor("inherit");
        if (status !== Status.Idle) {
          stopStopwatch();
          saveTime();
          resetStopwatch();
        }
        cancel();
      }
    },
    { cancelable: true }
  );

  return (
    <Pressable
      bind={bind}
      role="button"
      className={classes.container}
      onPointerDown={handlePress}
      onPointerUp={handleRelease}
      onKeyDown={keyDownHandler}
      onKeyUp={keyUpHandler}
      listenOnWindow={status !== Status.Idle}
    >
      <div className={classes.display} style={{ color }}>
        {status === Status.Idle && millisecondsToClock(elapsedTime)}
        {status === Status.Inspection && millisecondsToSeconds(remainingTime) + 1}
        {status === Status.PlusTwo && "+2"}
        {status === Status.Dnf && "DNF"}
        {status === Status.Running && millisecondsToClock(elapsedTime)}
      </div>
    </Pressable>
  );
}

export default Stopwatch;
