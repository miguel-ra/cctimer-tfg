import clsx from "clsx";
import { Suspense } from "react";
import { createUseStyles } from "react-jss";

import Box from "components/flexboxgrid/Box";
import ScrambleText from "components/scramble/ScrambleText";
import Spinner from "components/spinner/Spinner";
import Stopwatch from "features/stopwatch/Stopwatch";
import { puzzlesConfig } from "models/puzzles/Puzzle";
import useMediaQuery from "shared/hooks/useMediaQuery";

import { useScramble, useTimerSelectedItem } from "../timerViewModel";

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
  const { selectedItem } = useTimerSelectedItem();
  const isSmall = useMediaQuery("@media (max-height:300px)");

  const ScrambleImage = selectedItem?.key ? puzzlesConfig[selectedItem?.key].Image : null;

  return (
    <Box flex={1} width="100%" position="relative">
      {!isSmall && <ScrambleText>{scramble.text}</ScrambleText>}
      <Stopwatch />
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
            <ScrambleImage className={classes.scrambleImage} scramble={scramble.state} />
          </Suspense>
        </div>
      )}
    </Box>
  );
}

export default Timer;
