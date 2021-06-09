import { Suspense } from "react";
import { createUseStyles } from "react-jss";
import { Scramble } from "cctimer-scrambles";
import Box from "components/flexboxgrid/Box";
import Spinner from "components/spinner/Spinner";
import Typography from "components/typography/Typography";
import { PuzzleKey, puzzlesData } from "models/puzzles/Puzzle";
import theme from "styles/theme";

type ScrambleShowcaseProps = {
  puzzleKey?: PuzzleKey;
  scramble: Scramble;
};

const useStyles = createUseStyles({
  root: {
    display: "flex",
    padding: "0",
    alignItems: "center",
    width: "100%",
    height: "100%",
    flexDirection: "column-reverse",
    justifyContent: "flex-end",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      justifyContent: "normal",
    },
  },
  text: {
    padding: "1rem 2rem",
    overflowY: "auto",
    [theme.breakpoints.up("sm")]: {
      flex: "1",
      height: "100%",
    },
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
    padding: "1.5rem",
    width: "80%",
    [theme.breakpoints.up("sm")]: {
      width: "30%",
      marginRight: "2rem",
    },
    "& > svg": {
      width: "100%",
      height: "auto",
    },
  },
});

function ScrambleShowcase({ puzzleKey, scramble }: ScrambleShowcaseProps) {
  const classes = useStyles();

  const ScrambleImage = puzzleKey ? puzzlesData[puzzleKey].Image : null;

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

export default ScrambleShowcase;
