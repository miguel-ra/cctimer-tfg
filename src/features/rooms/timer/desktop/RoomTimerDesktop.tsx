import { memo, Suspense, useCallback } from "react";
import { useTranslation } from "react-i18next";

import Box from "components/flexboxgrid/Box";
import ScrambleText from "components/scramble/ScrambleText";
import Spinner from "components/spinner/Spinner";
import { useSelectedItem } from "features/router/routerViewModel";
import Stopwatch, { StopwatchCallbackOptions } from "features/stopwatch/Stopwatch";
import StopwatchDisplay from "features/stopwatch/StopwatchDisplay";
import { useScramble } from "features/timer/timerViewModel";
import { puzzlesConfig } from "models/puzzles/Puzzle";
import { StopwatchStatus } from "models/timer/stopwatch";

import { useRoomTimer } from "../roomTimerContext";
import UserList from "../UserList";

import styles from "./RoomTimerDesktop.module.scss";

function TimerDesktop() {
  const { selectedItem } = useSelectedItem();
  const { scramble } = useScramble();
  const { roomId, nickname, sendMessage, lastTime, setLastTime } = useRoomTimer();
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

  return (
    <Box flexDirection="column" flex={1} position="relative">
      <ScrambleText>{scramble.text}</ScrambleText>
      <div className={styles.stopwatchContainer}>
        {disableStopwatch ? (
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
