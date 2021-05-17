import { useCallback, useEffect, useRef, useState } from "react";
import { useDrag } from "react-use-gesture";
import {
  millisecondsToSeconds,
  millisecondsToClock,
} from "shared/format/number";
import { Time } from "models/times/Time";
import { useSettings } from "store/settingsContext";
import useStopwatch from "./useStopwatch";
import Pressable from "./Pressable";
import useStyles from "./Stopwatch.styles";

// TODO: Refactor to avoid use useCallback

type StopwatchProps = {
  onSave: (time: Time) => void;
};

function Stopwatch({ onSave }: StopwatchProps) {
  const classes = useStyles();
  const { settings } = useSettings();
  const {
    startStopwatch,
    stopStopwatch,
    resetStopwatch,
    elapsedTime,
    remainingTime,
  } = useStopwatch();
  const ready = useRef<boolean | null>(!settings.timer.holdToStart);
  const [status, setStatus] = useState("idle"); // TODO: Create status constats
  const [color, setColor] = useState("inherit");
  const holdStartedAt = useRef<number | null>(null);
  const dataToSave = useRef<any>();

  useEffect(() => {
    ready.current = !settings.timer.holdToStart;
  }, [settings.timer.holdToStart]);

  useEffect(() => {
    let penalty = dataToSave?.current?.penalty;
    if (penalty !== "dnf" && ["plus-two", "dnf"].includes(status)) {
      penalty = status;
    }
    dataToSave.current = {
      penalty,
      elapsedTime: penalty === "dnf" ? 0 : elapsedTime,
    };
  }, [elapsedTime, status]);

  const saveTime = useCallback(() => {
    onSave({ ...dataToSave.current });
    dataToSave.current = {};
  }, [onSave]);

  const setDNF = useCallback(() => {
    ready.current = false;
    setStatus("dnf");
    resetStopwatch();
    saveTime();
  }, [resetStopwatch, saveTime]);

  const startPlusTwo = useCallback(() => {
    setStatus("plus-two");
    startStopwatch({
      countDown: 2000,
      onTimeout: setDNF,
    });
  }, [setDNF, startStopwatch]);

  const startInspection = useCallback(() => {
    setStatus("inspection");
    startStopwatch({
      countDown: settings.inspection.time * 1000 || 15000,
      onTimeout: startPlusTwo,
    });
  }, [startStopwatch, settings.inspection.time, startPlusTwo]);

  const handlePress = useCallback(() => {
    if (status === "running") {
      ready.current = null;
      stopStopwatch();
      setStatus("idle");
      saveTime();
      return;
    }
    if (status === "dnf") {
      setStatus("idle");
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
    if (settings.inspection.enabled && ["idle", "dnf"].includes(status)) {
      ready.current = !settings.timer.holdToStart;
      startInspection();
      return;
    }

    startStopwatch();
    setStatus("running");
  }, [
    settings.inspection.enabled,
    settings.timer.holdToStart,
    startInspection,
    startStopwatch,
    status,
  ]);

  const keyDownHandler = useCallback(
    (event) => {
      if (status !== "running" && event.key !== " ") {
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
        setStatus("idle");
        setColor("inherit");
        if (status !== "idle") {
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
      listenOnWindow={status !== "idle"}
    >
      <div className={classes.display} style={{ color }}>
        {status === "idle" && millisecondsToClock(elapsedTime)}
        {status === "inspection" && millisecondsToSeconds(remainingTime) + 1}
        {status === "plus-two" && "+2"}
        {status === "dnf" && "DNF"}
        {status === "running" && millisecondsToClock(elapsedTime)}
      </div>
    </Pressable>
  );
}

export default Stopwatch;
