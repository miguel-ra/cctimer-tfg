import { KeyboardEvent, lazy, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { useModal } from "store/modalContext";
import { useMenu } from "store/menuContext";
import { useTimer } from "features/timer/timerViewModel";
import { elapsedTimeToClockCompact } from "shared/format/puzzleTime";
import Button from "components/button/Button";
import Box from "components/flexboxgrid/Box";
import useStyles from "./Times.styles";

const ModalTimeDetails = lazy(() => import("./ModalTimeDetails"));

function Times() {
  const classes = useStyles();
  const { openModal } = useModal();
  const { selectedItem } = useMenu();
  const { puzzleTimes, updateTime, deleteTime, deletePuzzleTimes } = useTimer();
  const { t } = useTranslation();

  function showTimeDetails(index: number) {
    if (!puzzleTimes || !puzzleTimes[index]) {
      return;
    }
    openModal(
      <ModalTimeDetails
        puzzleKey={selectedItem?.key}
        time={puzzleTimes[index]}
        updateTime={updateTime}
        deleteTime={deleteTime}
      />
    );
  }

  function handleTimesClick(event: MouseEvent) {
    const { index } = (event.target as HTMLElement).dataset;
    if (index) {
      event.stopPropagation();
      showTimeDetails(Number(index));
    }
  }

  function handleTimesKeyDown(event: KeyboardEvent) {
    const { index } = (event.target as HTMLElement).dataset;
    if (index && event.key === "Enter") {
      event.stopPropagation();
      event.preventDefault();
      showTimeDetails(Number(index));
    }
  }

  if (!puzzleTimes || !puzzleTimes.length) {
    return (
      <Box width="100%" height="100%" padding="2rem" display="grid" placeContent="center">
        {t("You have not registered any time. Destroy it! 🤘")}
      </Box>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.timesWrapper}>
        <div className={classes.times} onClick={handleTimesClick} onKeyDownCapture={handleTimesKeyDown}>
          {puzzleTimes
            .map((time, index) => (
              <div data-index={index} role="button" tabIndex={0} key={time.id} className={classes.time}>
                {elapsedTimeToClockCompact(time.elapsedTime, time.penalty)}
              </div>
            ))
            .reverse()}
        </div>
      </div>
      <div className={classes.actionBar}>
        <Button
          variant="contained"
          size="large"
          color="red"
          fullWidth
          center
          onClick={() => deletePuzzleTimes()}
        >
          {t("Delete all times")}
        </Button>
      </div>
    </div>
  );
}

export default Times;
