import { useTranslation } from "react-i18next";
import { millisecondsToClock } from "shared/format/number";
import { useTimerViewModel } from "features/timer/timerViewModel";
import Box from "components/flexboxgrid/Box";
import useStyles from "./Times.styles";

function Times() {
  const classes = useStyles();
  const { t } = useTranslation();
  const { puzzleTimes } = useTimerViewModel();

  if (!puzzleTimes.length) {
    return (
      <Box height="100%" padding="2rem" display="grid" placeContent="center">
        {t("You have not registered any time. Destroy it! 🤘")}
      </Box>
    );
  }

  return (
    <div className={classes.times}>
      {puzzleTimes
        .map((time) => (
          <div key={time.id} className={classes.time}>
            {millisecondsToClock(time.elapsedTime)}
          </div>
        ))
        .reverse()}
    </div>
  );
}

export default Times;
