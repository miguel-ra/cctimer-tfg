import { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { useTranslation } from "react-i18next";
import { ScrambleGenerator } from "cctimer-scrambles";
import theme from "styles/theme";
import { useMenu } from "store/menuContext";
import Stopwatch from "features/stopwatch/Stopwatch";
import { millisecondsToClock } from "shared/format/number";
import { puzzlesData } from "models/puzzles/Puzzle";
import Box from "components/flexboxgrid/Box";
import Spinner from "components/spinner/Spinner";
import Typography from "components/typography/Typography";
import { useTimerViewModel } from "./timerViewModel";

const useStyles = createUseStyles({
  sectionContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    height: "30vh",
    background: theme.palette.background.paper,
    transition: `border ${theme.transition.duration.colorMode} linear, background ${theme.transition.duration.colorMode} linear`,
    borderTop: `1px solid ${theme.palette.border.primary}`,
  },
  section: {
    maxHeight: "100%",
    overflow: "auto",
  },
  stats: {
    flex: 1,
    display: "flex",
    flexWrap: "wrap",
    placeContent: "center",
    transition: `border ${theme.transition.duration.colorMode} linear, background ${theme.transition.duration.colorMode} linear`,
    border: `0 solid ${theme.palette.border.primary}`,
    borderWidth: "0 1px 0 1px",
  },
  times: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    [theme.breakpoints.up("lg")]: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    [theme.breakpoints.up("xl")]: {
      gridTemplateColumns: "repeat(5, 1fr)",
    },
    padding: "2rem",
    gap: "2rem",
    justifyContent: "space-between",
    overflow: "auto",
  },
  time: {
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.border.primary}`,
    transition: `border ${theme.transition.duration.colorMode} linear`,
    padding: "1rem",
    textAlign: "center",
  },
  scramble: {
    display: "grid",
    height: "100%",
    width: "100%",
    padding: "3rem",
    "& > canvas": {
      alignSelf: "center",
      justifySelf: "center",
    },
  },
});

function Timer() {
  const classes = useStyles();
  const { t } = useTranslation();
  const { puzzleTimes, addTime } = useTimerViewModel();
  const [scrambleGenerator, setScrambleGenerator] =
    useState<ScrambleGenerator>();
  const { selectedItem } = useMenu();

  useEffect(() => {
    setScrambleGenerator(undefined);
    if (selectedItem?.key) {
      puzzlesData[selectedItem.key]
        ?.loadScramble?.()
        .then(({ default: generator }) => {
          setScrambleGenerator(generator);
        });
    }
  }, [selectedItem?.key]);

  const randomScramble = scrambleGenerator?.getRandomScramble();
  const { ScrambleImage } = scrambleGenerator || {};

  return (
    <Box flexDirection="column" flex={1}>
      <Typography variant="h6" style={{ padding: "2rem", textAlign: "center" }}>
        {randomScramble?.string}
      </Typography>
      <Box flex={1} placeContent="center">
        <Stopwatch onSave={addTime} />
      </Box>
      <div className={classes.sectionContainer}>
        <section className={classes.section}>
          <div className={classes.times}>
            {puzzleTimes
              .map((time) => (
                <div key={time.id} className={classes.time}>
                  {millisecondsToClock(time.elapsedTime)}
                </div>
              ))
              .reverse()}
          </div>
        </section>
        <section className={classes.stats}>{t("Stats and grahps")}</section>
        <section className={classes.section}>
          {ScrambleImage && (
            <ScrambleImage
              className={classes.scramble}
              randomScramble={randomScramble}
            />
          )}
          {ScrambleImage !== null && (
            <Box display="flex" placeContent="center" height="100%">
              <Spinner delay={0} />
            </Box>
          )}
        </section>
      </div>
    </Box>
  );
}

export default Timer;
