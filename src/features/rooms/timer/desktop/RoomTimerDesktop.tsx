import { memo, Suspense, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

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

import { useRoomTimer } from "../roomTimerContext";
import UserList from "../UserList";

import styles from "./RoomTimerDesktop.module.scss";

function TimerDesktop() {
  const { selectedItem } = useSelectedItem();
  const { scramble } = useScramble();
  const { roomId, lastTime, setLastTime, isHost } = useRoomTimer();
  const { lastTime: lastTimeStopwatch } = useTimes();
  const { t } = useTranslation();

  const ScrambleImage = selectedItem?.key ? puzzlesConfig[selectedItem?.key].Image : null;

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
    <Box flexDirection="column" flex={1} position="relative">
      <div className={styles.stopwatchContainer}>
        <ScrambleText showRefresh={isHost}>{scramble.text}</ScrambleText>
        {disableStopwatch ? (
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          <StopwatchDisplay status={lastTime!.status} time={lastTime!.time} />
        ) : (
          <Stopwatch callback={onStatusChange} hideDelete />
        )}
        <div className={styles.roomCode}>
          {t("Room code")}: <strong>{roomId}</strong>
        </div>
        <UserList />
      </div>
      <div className={styles.sectionContainer}>
        {ScrambleImage && (
          <section className={styles.section}>
            <Suspense
              fallback={
                <Box display="flex" placeContent="center" width="100%" height="100%">
                  <Spinner delay={0} />
                </Box>
              }
            >
              <ScrambleImage className={styles.scramble} scramble={scramble.state} />
            </Suspense>
          </section>
        )}
      </div>
    </Box>
  );
}

export default memo(TimerDesktop);
