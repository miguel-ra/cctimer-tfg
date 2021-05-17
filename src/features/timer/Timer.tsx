import { createUseStyles } from "react-jss";
import { useTranslation } from "react-i18next";
import Stopwatch from "features/stopwatch/Stopwatch";
import Box from "components/flexboxgrid/Box";
import theme from "styles/theme";
import { useTimerViewModel } from "./timerViewModel";

const useStyles = createUseStyles({
  sessionContainer: {
    display: "flex",
    minHeight: "30vh",
    background: theme.palette.background.paper,
    transition: `border ${theme.transition.duration.colorMode} linear, background ${theme.transition.duration.colorMode} linear`,
    borderTop: `1px solid ${theme.palette.border.primary}`,
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
});

function Timer() {
  const classes = useStyles();
  const { t } = useTranslation();
  const { puzzleTimes, addTime } = useTimerViewModel();

  return (
    <Box flexDirection="column" flex={1}>
      <Box flex={1} placeContent="center">
        <Stopwatch onSave={addTime} />
      </Box>
      <div className={classes.sessionContainer}>
        <Box flex={1} placeContent="center">
          {puzzleTimes.map((time) => time.elapsedTime).join(", ")}
        </Box>
        <div className={classes.stats}>{t("Stats and grahps")}</div>
        <Box flex={1} placeContent="center">
          {t("Scramble image")}
        </Box>
      </div>
    </Box>
  );
}

export default Timer;
