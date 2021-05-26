import { useTranslation } from "react-i18next";
import { millisecondsToClock } from "shared/format/number";
import { PuzzleTime } from "models/times/Time";
import Box from "components/flexboxgrid/Box";
import useStyles from "./Times.styles";

type TimesProps = {
  puzzleTimes?: PuzzleTime[];
};

function Times({ puzzleTimes }: TimesProps) {
  const classes = useStyles();
  const { t } = useTranslation();

  if (!puzzleTimes || !puzzleTimes.length) {
    return (
      <Box width="100%" height="100%" padding="2rem" display="grid" placeContent="center">
        {t("You have not registered any time. Destroy it! 🤘")}
      </Box>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.times}>
        {puzzleTimes
          .map((time) => (
            <div key={time.id} className={classes.time}>
              {millisecondsToClock(time.elapsedTime)}
            </div>
          ))
          .reverse()}
      </div>
    </div>
  );
}

export default Times;
