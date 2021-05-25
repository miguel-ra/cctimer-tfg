import { useTimer } from "../timerContext";
import { useMenu } from "store/menuContext";
import { puzzlesData } from "models/puzzles/Puzzle";
import Stopwatch from "features/stopwatch/Stopwatch";
import Box from "components/flexboxgrid/Box";
import Typography from "components/typography/Typography";
import { TabComponentProps } from "./TimerMobile";
import { createUseStyles } from "react-jss";
import Spinner from "components/spinner/Spinner";
import { Suspense, useState } from "react";
import clsx from "clsx";

const useStyles = createUseStyles({
  scramble: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "20%",
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: "2rem",
    transition: "height 0.5s ease-in-out",
    outline: "none",
  },
  scrambleImage: {
    height: "100%",
    width: "100%",
  },
  scrambleImageOpen: {
    height: "100%",
  },
});

function Timer({ addTime }: TabComponentProps) {
  const [scrambleImageOpen, setScrambleImageOpen] = useState(false);
  const classes = useStyles();
  const { scramble } = useTimer();
  const { selectedItem } = useMenu();

  const ScrambleImage = selectedItem?.key ? puzzlesData[selectedItem?.key].Image : null;

  return (
    <Box flex={1} width="100%" position="relative">
      <Typography
        variant="h6"
        style={{
          position: "absolute",
          width: "100%",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        {scramble.text}
      </Typography>
      <Stopwatch onSave={addTime} />
      {ScrambleImage && (
        <div
          className={clsx(classes.scramble, { [classes.scrambleImageOpen]: scrambleImageOpen })}
          onClick={() => setScrambleImageOpen((prevState) => !prevState)}
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
