import clsx from "clsx";
import { Suspense } from "react";

import Box from "components/flexboxgrid/Box";
import ScrambleText from "components/scramble/ScrambleText";
import Spinner from "components/spinner/Spinner";
import Stats from "features/stats/Stats";
import Stopwatch from "features/stopwatch/Stopwatch";
import Times from "features/times/Times";
import { puzzlesConfig } from "models/puzzles/Puzzle";
import { useMenu } from "store/menuContext";

import { TimerProvider, useTimer } from "../timerViewModel";

import useStyles from "./TimerDesktop.styles";

function TimerDesktop() {
  const classes = useStyles();
  const { selectedItem } = useMenu();
  const { scramble } = useTimer();

  const ScrambleImage = selectedItem?.key ? puzzlesConfig[selectedItem?.key].Image : null;

  return (
    <Box flexDirection="column" flex={1} position="relative">
      <ScrambleText>{scramble.text}</ScrambleText>
      <Box flex={1} placeContent="center">
        <Stopwatch />
      </Box>
      <div className={clsx(classes.sectionContainer, { [classes.withoutScramble]: !ScrambleImage })}>
        <section className={classes.section}>
          <Times />
        </section>
        <section className={classes.stats}>
          <Stats />
        </section>
        {ScrambleImage && (
          <section className={classes.section}>
            <Suspense
              fallback={
                <Box display="flex" placeContent="center" width="100%" height="100%">
                  <Spinner delay={0} />
                </Box>
              }
            >
              <ScrambleImage className={classes.scramble} scramble={scramble.state} />
            </Suspense>
          </section>
        )}
      </div>
    </Box>
  );
}

export default function TimerWithProvider() {
  return (
    <TimerProvider>
      <TimerDesktop />
    </TimerProvider>
  );
}
