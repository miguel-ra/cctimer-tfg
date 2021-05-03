import { useCallback, useEffect, useRef, useState } from "react";
import { useDrag } from "react-use-gesture";
import {
  millisecondsToSeconds,
  millisecondsToClock,
} from "shared/format/number";
import useStopwatch from "./useStopwatch";
import { useSettings } from "store/settingsContext";
import Pressable from "./Pressable";
import useStyles from "./Stopwatch.styles";

// TODO: Refactor to avoid use useCallback

function Stopwatch() {
  const classes = useStyles();
  const { settings } = useSettings();
  const {
    startStopwatch,
    stopStopwatch,
    resetStopwatch,
    elapsedTime,
    remainingTime,
  } = useStopwatch();
  const ready = useRef(!settings.timer.holdToStart);
  const [status, setStatus] = useState("idle"); // TODO: Create status constats
  const [color, setColor] = useState("inherit");
  const holdStartedAt = useRef<number | null>(null);

  useEffect(() => {
    ready.current = !settings.timer.holdToStart;
  }, [settings.timer.holdToStart]);

  const saveRecord = useCallback(() => {
    console.log("record saved");
  }, []);

  const setDNF = useCallback(() => {
    ready.current = false;
    setStatus("dnf");
    resetStopwatch();
    saveRecord();
  }, [resetStopwatch, saveRecord]);

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
      ready.current = false;
      stopStopwatch();
      setStatus("idle");
      saveRecord();
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
  }, [saveRecord, settings.timer.holdToStart, status, stopStopwatch]);

  const handleRelease = useCallback(() => {
    setColor("inherit");
    holdStartedAt.current = null;
    if (!ready.current) {
      ready.current = !settings.timer.holdToStart;
      return;
    }
    if (settings.inspection.enabled && ["idle", "dnf"].includes(status)) {
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
      if (event.key !== " ") {
        return false;
      }
      handleRelease();
      return true;
    },
    [handleRelease]
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
          saveRecord();
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
