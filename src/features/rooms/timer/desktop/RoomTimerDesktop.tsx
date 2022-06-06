import { memo, Suspense } from "react";
import { useTranslation } from "react-i18next";

import Box from "components/flexboxgrid/Box";
import ScrambleText from "components/scramble/ScrambleText";
import Spinner from "components/spinner/Spinner";
import { useSelectedItem } from "features/router/routerViewModel";
import Stopwatch from "features/stopwatch/Stopwatch";
import { useScramble } from "features/timer/timerViewModel";
import { puzzlesConfig } from "models/puzzles/Puzzle";
import { RoomDataType } from "models/rooms/Room";
import { StopwatchStatus } from "models/timer/stopwatch";

import { useRoomTimer } from "../roomTimerContext";
import UserList from "../UserList";

import styles from "./RoomTimerDesktop.module.scss";

function TimerDesktop() {
  const { selectedItem } = useSelectedItem();
  const { scramble } = useScramble();
  const { roomId, nickname, sendMessage } = useRoomTimer();
  const { t } = useTranslation();

  const ScrambleImage = selectedItem?.key ? puzzlesConfig[selectedItem?.key].Image : null;

  return (
    <Box flexDirection="column" flex={1} position="relative">
      <ScrambleText>{scramble.text}</ScrambleText>
      <div className={styles.stopwatchContainer}>
        <Stopwatch />
        <div className={styles.roomCode}>
          {t("Room code")}: <strong>{roomId}</strong>
        </div>
        <UserList />
      </div>
      <div
        className={styles.sectionContainer}
        onClick={() => {
          if (!nickname) {
            return;
          }
          sendMessage?.({ type: RoomDataType.SetStatus, nickname, status: StopwatchStatus.Running });
        }}
      >
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
