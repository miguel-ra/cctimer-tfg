import { Suspense } from "react";
import clsx from "clsx";
import { createUseStyles } from "react-jss";
import { useMenu } from "store/menuContext";
import { Time } from "models/times/Time";
import { puzzlesData } from "models/puzzles/Puzzle";
import useMediaQuery from "shared/hooks/useMediaQuery";
import Stopwatch from "features/stopwatch/Stopwatch";
import Box from "components/flexboxgrid/Box";
import Spinner from "components/spinner/Spinner";
import ScrambleText from "components/scramble/ScrambleText";
import { useTimer } from "../timerContext";

type TimerProps = {
  addTime: (time: Time) => void;
};

const useStyles = createUseStyles({
  scramble: {
    height: "20%",
    minHeight: "80px",
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: "2rem",
    transition: "height 0.25s ease-in-out",
    outline: "none",
    willChange: "height",
    display: "flex",
  },
  scrambleImage: {
    height: "100%",
    width: "100%",
    willChange: "height, width",
  },
  scrambleImageOpen: {
    height: "100%",
  },
});

function Timer({ addTime }: TimerProps) {
  const classes = useStyles();
  const { scramble } = useTimer();
  const { selectedItem } = useMenu();
  const isSmall = useMediaQuery("@media (max-height:300px)");

  const ScrambleImage = selectedItem?.key ? puzzlesData[selectedItem?.key].Image : null;

  return (
    <Box flex={1} width="100%" position="relative">
      {!isSmall && <ScrambleText>{scramble.text}</ScrambleText>}
      <Stopwatch onSave={addTime} />
      {!isSmall && ScrambleImage && (
        <div
          className={clsx(classes.scramble)}
          onClick={(event) =>
            (event.currentTarget as HTMLElement).classList.toggle(classes.scrambleImageOpen)
          }
        >
          <Suspense
            fallback={
              <Box display="flex" placeContent="center" height="100%">
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
