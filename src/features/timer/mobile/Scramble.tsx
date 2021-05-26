import Box from "components/flexboxgrid/Box";
import Spinner from "components/spinner/Spinner";
import Typography from "components/typography/Typography";
import { puzzlesData } from "models/puzzles/Puzzle";
import { Suspense } from "react";
import { createUseStyles } from "react-jss";
import { useMenu } from "store/menuContext";
import { useTimer } from "../timerContext";

const useStyles = createUseStyles({
  root: {
    display: "flex",
    padding: "0",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  text: {
    padding: "1rem 2rem",
    flex: "1",
    height: "100%",
    overflowY: "auto",
  },
  scrambleText: {
    textAlign: "center",
    fontSize: "1.4rem",
    whiteSpace: "pre-wrap",
    overflowWrap: "break-word",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
  },
  image: {
    padding: "2rem",
    width: "30vw",
    marginRight: "2rem",
    "& > svg": {
      width: "100%",
      height: "auto",
    },
  },
});

function Scramble() {
  const classes = useStyles();
  const { scramble } = useTimer();
  const { selectedItem } = useMenu();

  const ScrambleImage = selectedItem?.key ? puzzlesData[selectedItem?.key].Image : null;

  return (
    <div className={classes.root}>
      {ScrambleImage && (
        <div className={classes.image}>
          <Suspense
            fallback={
              <Box display="flex" placeContent="center" height="100%">
                <Spinner delay={0} />
              </Box>
            }
          >
            <ScrambleImage scramble={scramble.state} />
          </Suspense>
        </div>
      )}
      <div className={classes.text}>
        <Typography variant="h6" className={classes.scrambleText}>
          {scramble.text}
        </Typography>
      </div>
    </div>
  );
}

export default Scramble;
