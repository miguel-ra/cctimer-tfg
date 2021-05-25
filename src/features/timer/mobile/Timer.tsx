import { useTimer } from "../timerContext";
import { useMenu } from "store/menuContext";
import { puzzlesData } from "models/puzzles/Puzzle";
import Stopwatch from "features/stopwatch/Stopwatch";
import Box from "components/flexboxgrid/Box";
import Typography from "components/typography/Typography";
import { TabComponentProps } from "./TimerMobile";
import { createUseStyles } from "react-jss";
import Spinner from "components/spinner/Spinner";
import { Suspense } from "react";

const useStyles = createUseStyles({
  scramble: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "20vh",
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: "3rem",
  },
  scrambleImage: {
    height: "100%",
    width: "100%",
  },
});

function Timer({ addTime }: TabComponentProps) {
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
        <div className={classes.scramble}>
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
