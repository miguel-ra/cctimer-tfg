import { memo, Suspense } from "react";

import Box from "components/flexboxgrid/Box";
import ScrambleText from "components/scramble/ScrambleText";
import Spinner from "components/spinner/Spinner";
import { useSelectedItem } from "features/router/routerViewModel";
import Stopwatch from "features/stopwatch/Stopwatch";
import { useScramble } from "features/timer/timerViewModel";
import { puzzlesConfig } from "models/puzzles/Puzzle";

import styles from "./RoomTimerDesktop.module.scss";

function TimerDesktop() {
  const { selectedItem } = useSelectedItem();
  const { scramble } = useScramble();

  const ScrambleImage = selectedItem?.key ? puzzlesConfig[selectedItem?.key].Image : null;

  return (
    <Box flexDirection="column" flex={1} position="relative">
      <ScrambleText>{scramble.text}</ScrambleText>
      <Box flex={1} placeContent="center">
        <Stopwatch />
      </Box>
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
