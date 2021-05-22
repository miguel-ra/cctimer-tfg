import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { millisecondsToClock } from "shared/format/number";
import Stopwatch from "features/stopwatch/Stopwatch";
import Box from "components/flexboxgrid/Box";
import Spinner from "components/spinner/Spinner";
import Typography from "components/typography/Typography";
import { TimerProvider, useTimer } from "./timerContext";
import { useTimerViewModel } from "./timerViewModel";
import useStyles from "./Timer.styles";
import { useMenu } from "store/menuContext";
import { puzzlesData } from "models/puzzles/Puzzle";

function Timer() {
  const classes = useStyles();
  const { t } = useTranslation();
  const { scramble } = useTimer();
  const { selectedItem } = useMenu();
  const { puzzleTimes, addTime } = useTimerViewModel();

  const ScrambleImage = selectedItem?.key
    ? puzzlesData[selectedItem?.key].Image
    : null;

  return (
    <Box flexDirection="column" flex={1} position="relative">
      <Typography
        variant="h6"
        style={{
          position: "absolute",
          width: "100%",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        {scramble.string}
      </Typography>
      <Box flex={1} placeContent="center">
        <Stopwatch onSave={addTime} />
      </Box>
      <div className={classes.sectionContainer}>
        <section className={classes.section}>
          {puzzleTimes.length ? (
            <div className={classes.times}>
              {puzzleTimes
                .map((time) => (
                  <div key={time.id} className={classes.time}>
                    {millisecondsToClock(time.elapsedTime)}
                  </div>
                ))
                .reverse()}
            </div>
          ) : (
            <Box
              height="100%"
              padding="2rem"
              display="grid"
              placeContent="center"
            >
              {t("You have not registered any time. Destroy it! 🤘")}
            </Box>
          )}
        </section>
        <section className={classes.stats}>{t("Stats and grahps")}</section>
        <section className={classes.section}>
          {ScrambleImage ? (
            <Suspense
              fallback={
                <Box display="flex" placeContent="center" height="100%">
                  <Spinner delay={0} />
                </Box>
              }
            >
              <ScrambleImage
                className={classes.scramble}
                scramble={scramble.state}
              />
            </Suspense>
          ) : (
            <Box
              height="100%"
              padding="2rem"
              display="grid"
              placeContent="center"
            >
              {t("No image")}
            </Box>
          )}
          {/* {ScrambleImage == null && (
            <Box display="flex" placeContent="center" height="100%">
              <Spinner delay={0} />
            </Box>
          )} */}
        </section>
      </div>
    </Box>
  );
}

export default function TimerWithProvider() {
  return (
    <TimerProvider>
      <Timer />
    </TimerProvider>
  );
}
