import clsx from "clsx";
import { Suspense, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";

import Box from "components/flexboxgrid/Box";
import ScrambleText from "components/scramble/ScrambleText";
import Spinner from "components/spinner/Spinner";
import { useSelectedItem } from "features/router/routerViewModel";
import Stopwatch, { StopwatchCallbackOptions } from "features/stopwatch/Stopwatch";
import StopwatchDisplay from "features/stopwatch/StopwatchDisplay";
import { useScramble } from "features/timer/timerViewModel";
import { useTimes } from "features/times/timesViewModel";
import { puzzlesConfig } from "models/puzzles/Puzzle";
import { StopwatchStatus } from "models/timer/stopwatch";
import { TimePenalty } from "models/times/Time";
import useMediaQuery from "shared/hooks/useMediaQuery";

import { useRoomTimer } from "../../roomTimerContext";

const useStyles = createUseStyles({
  scramble: {
    width: "100%",
    height: "20%",
    minWidth: "80px",
    minHeight: "80px",
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: "2rem",
    transition: "width 0.25s ease-in-out, height 0.25s ease-in-out",
    outline: "none",
    willChange: "height, width",
    display: "flex",
    "@media (max-height:600px)": {
      width: "20%",
    },
  },
  scrambleOpen: {
    width: "100%",
    height: "100%",
  },
  scrambleImage: {
    width: "auto",
    height: "auto",
    margin: "0 auto",
    "@media (max-height:600px)": {
      margin: 0,
      position: "relative",
      transition: "left 0.25s ease-in-out, transform 0.25s ease-in-out",
      left: "0%",
      transform: "translateX(-0%)",
      "$scrambleOpen &": {
        left: "50%",
        transform: "translateX(-50%)",
      },
    },
  },
});

function Timer() {
  const classes = useStyles();
  const { scramble } = useScramble();
  const { selectedItem } = useSelectedItem();
  const isSmall = useMediaQuery("@media (max-height:300px)");
  const { lastTime, setLastTime, isHost } = useRoomTimer();
  const { lastTime: lastTimeStopwatch } = useTimes();
  const { t } = useTranslation();

  const onStatusChange = useCallback(
    ({ time, status }: StopwatchCallbackOptions) => {
      setLastTime({ time, status, scramble });
    },
    [setLastTime, scramble]
  );

  const disableStopwatch =
    scramble.text === lastTime?.scramble.text &&
    lastTime?.status === StopwatchStatus.Idle &&
    lastTime.time.elapsedTime > 0;

  const ScrambleImage = selectedItem?.key ? puzzlesConfig[selectedItem?.key].Image : null;
  const scrambleState = isHost || !disableStopwatch ? scramble.state : "";

  useEffect(() => {
    setLastTime((prevLastTime) => {
      if (prevLastTime === null || !lastTimeStopwatch) {
        return null;
      }
      return {
        ...prevLastTime,
        time: {
          elapsedTime: lastTimeStopwatch.elapsedTime,
          penalty: lastTimeStopwatch?.penalty || TimePenalty.NoPenalty,
        },
      };
    });
  }, [lastTimeStopwatch, setLastTime]);

  return (
    <Box flex={1} width="100%" position="relative">
      {isHost || !disableStopwatch ? (
        <ScrambleText showRefresh={isHost}>{scramble.text}</ScrambleText>
      ) : (
        <ScrambleText showRefresh={isHost}>
          {t("Waiting for the host to generate a new scramble")}
        </ScrambleText>
      )}
      {disableStopwatch ? (
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        <StopwatchDisplay status={lastTime!.status} time={lastTime!.time} />
      ) : (
        <Stopwatch callback={onStatusChange} hideDelete />
      )}
      {!isSmall && ScrambleImage && (
        <div
          className={clsx(classes.scramble)}
          onClick={(event) => (event.currentTarget as HTMLElement).classList.toggle(classes.scrambleOpen)}
        >
          <Suspense
            fallback={
              <Box display="flex" placeContent="center" width="100%" height="100%">
                <Spinner delay={0} />
              </Box>
            }
          >
            <ScrambleImage key={scrambleState} className={classes.scrambleImage} scramble={scrambleState} />
          </Suspense>
        </div>
      )}
    </Box>
  );
}

export default Timer;
