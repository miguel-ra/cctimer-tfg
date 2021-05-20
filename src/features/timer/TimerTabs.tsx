import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { useMenu } from "store/menuContext";
import { puzzlesData } from "models/puzzles/Puzzle";
import Stopwatch from "features/stopwatch/Stopwatch";
import Typography from "components/typography/Typography";
import Spinner from "components/spinner/Spinner";
import Box from "components/flexboxgrid/Box";
import { useTimerViewModel } from "./timerViewModel";
import { TimerProvider, useTimer } from "./timerContext";
import useStyles from "./TimerTabs.styles";

function TimerTabs() {
  const classes = useStyles();
  const { t } = useTranslation();
  const { selectedItem } = useMenu();
  const { addTime } = useTimerViewModel();
  const { scramble, ScrambleImage } = useTimer();

  return (
    <Box width="100%" height="100%" flexDirection="column">
      <div className={classes.header}>
        <Typography variant="subtitle1">
          {selectedItem?.key
            ? t(puzzlesData?.[selectedItem?.key]?.label)
            : "CCTimer.com"}
        </Typography>
      </div>
      <Box flexDirection="column" flex={1}>
        <Box flex={1} position="relative">
          <Typography
            variant="h6"
            style={{
              position: "absolute",
              width: "100%",
              padding: "2rem",
              textAlign: "center",
            }}
          >
            {scramble?.string}
          </Typography>
          <Stopwatch onSave={addTime} />
          <Box>
            {ScrambleImage && (
              <Suspense
                fallback={
                  <Box display="flex" placeContent="center" height="100%">
                    <Spinner delay={0} />
                  </Box>
                }
              >
                <ScrambleImage
                  className={classes.scramble}
                  randomScramble={scramble}
                />
              </Suspense>
            )}
          </Box>
        </Box>
        <div className={classes.tabs}>
          <Box flex={1} placeContent="center" padding="1rem">
            {t("Timer")}
          </Box>
          <div className={classes.stats}>{t("Session")}</div>
          <Box flex={1} placeContent="center" padding="1rem">
            {t("Stats")}
          </Box>
        </div>
      </Box>
    </Box>
  );
}
export default function TimerTabsWithProvider() {
  return (
    <TimerProvider>
      <TimerTabs />
    </TimerProvider>
  );
}
