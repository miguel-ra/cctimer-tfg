import clsx from "clsx";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useDrag } from "react-use-gesture";

import { useSelectedItem } from "features/router/routerViewModel";
import { useTimes } from "features/times/timesViewModel";
import { Time, TimePenalty } from "models/times/Time";
import { millisecondsToClock, millisecondsToSeconds } from "shared/format/number";
import { elapsedTimeWithPenaltyCompact } from "shared/format/puzzleTime";
import { useSettings } from "store/settingsContext";
import palette from "styles/palette";

import Pressable from "./Pressable";
import QuickActions from "./QuickActions";
import useStyles from "./Stopwatch.styles";
import useStopwatch from "./useStopwatch";

enum Status {
  Idle,
  PlusTwo,
  Dnf,
  Inspection,
  Running,
}

const ACTIVATION_DELAY = 300;

const statusPenalty: { [key in Status]?: TimePenalty } = {
  [Status.PlusTwo]: TimePenalty.PlusTwo,
  [Status.Dnf]: TimePenalty.Dnf,
};

function Stopwatch() {
  const classes = useStyles();
  const { addTime, lastTime, setLastTime } = useTimes();
  const { selectedItem } = useSelectedItem();
  const { settings } = useSettings();
  const { startStopwatch, stopStopwatch, resetStopwatch, elapsedTime, remainingTime } = useStopwatch();
  const holdStartedAt = useRef<number | null>(null);
  const dataToSave = useRef<Time>();
  const ready = useRef<boolean | null>(!settings.timer.holdToStart);
  const [status, setStatus] = useState(Status.Idle);
  const statusRef = useRef(status);
  const [color, setColor] = useState<string | undefined>(undefined);

  useEffect(() => {
    return () => stopStopwatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    statusRef.current = status;
    if ([Status.Running, Status.Inspection].includes(status)) {
      setLastTime(undefined);
    }
  }, [setLastTime, status]);

  useEffect(() => {
    if (!lastTime && status === Status.Idle) {
      // Reset stop watch when the last time is removed
      resetStopwatch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastTime]);

  useEffect(() => {
    // Reset stop watch when change the selected puzzle
    resetStopwatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);

  useEffect(() => {
    ready.current = !settings.timer.holdToStart;
  }, [settings.timer.holdToStart]);

  useEffect(() => {
    if (!elapsedTime) {
      return;
    }
    let penalty = dataToSave?.current?.penalty;
    if (penalty !== TimePenalty.Dnf && statusPenalty[status]) {
      penalty = statusPenalty[status];
    }
    dataToSave.current = {
      penalty: penalty || TimePenalty.NoPenalty,
      elapsedTime: penalty === TimePenalty.Dnf ? 0 : elapsedTime,
    };
  }, [elapsedTime, status]);

  const saveTime = useCallback(() => {
    if (dataToSave.current) {
      addTime({ ...dataToSave.current }).then(() => {
        dataToSave.current = undefined;
      });
    }
  }, [addTime]);

  const setDNF = useCallback(() => {
    ready.current = false;
    setStatus(Status.Dnf);
    resetStopwatch();
    saveTime();
    ready.current = !settings.timer.holdToStart;
  }, [resetStopwatch, saveTime, settings.timer.holdToStart]);

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

  const start = useCallback(() => {
    startStopwatch();
    setStatus(Status.Running);
  }, [startStopwatch]);

  const handlePress = useCallback(() => {
    (document.activeElement as HTMLElement)?.blur?.();
    if (statusRef.current === Status.Running) {
      ready.current = null;
      stopStopwatch();
      setStatus(Status.Idle);
      saveTime();
      return;
    }
    if (statusRef.current === Status.Dnf) {
      setStatus(Status.Idle);
    }
    if (settings.timer.holdToStart) {
      const beginningAt = Date.now();
      holdStartedAt.current = beginningAt;
      setColor(palette.colors.red.main);
      setTimeout(() => {
        if (beginningAt === holdStartedAt.current) {
          setColor(palette.colors.green.main);
          setLastTime(undefined);
          ready.current = true;
        }
      }, ACTIVATION_DELAY);
    }
  }, [saveTime, setLastTime, settings.timer.holdToStart, stopStopwatch]);

  const handleRelease = useCallback(() => {
    setColor(undefined);
    holdStartedAt.current = null;
    if (!ready.current) {
      ready.current = !settings.timer.holdToStart;
      return;
    }
    if (settings.inspection.enabled && [Status.Idle, Status.Dnf].includes(statusRef.current)) {
      ready.current = !settings.timer.holdToStart;
      startInspection();
      return;
    }

    start();
  }, [settings.inspection.enabled, settings.timer.holdToStart, start, startInspection]);

  const keyDownHandler = useCallback(
    (event) => {
      if (statusRef.current !== Status.Idle) {
        event.preventDefault();
      }
      if (statusRef.current !== Status.Running && event.key !== " ") {
        return false;
      }
      handlePress();
      return true;
    },
    [handlePress]
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
        setColor(undefined);
        if (statusRef.current !== Status.Idle) {
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
      preventOutsideClicks={![Status.Idle, Status.Dnf].includes(status)}
    >
      <div
        className={clsx(classes.displayWrapper, { running: status !== Status.Dnf && status !== Status.Idle })}
      >
        <div className={classes.display} style={{ color }}>
          {status === Status.Idle && elapsedTimeWithPenaltyCompact(elapsedTime, lastTime?.penalty)}
          {status === Status.Inspection && millisecondsToSeconds(remainingTime) + 1}
          {status === Status.PlusTwo && "+2"}
          {status === Status.Dnf && "DNF"}
          {status === Status.Running && millisecondsToClock(elapsedTime)}
        </div>
        <QuickActions resetStopwatch={resetStopwatch} />
      </div>
    </Pressable>
  );
}

export default memo(Stopwatch);
