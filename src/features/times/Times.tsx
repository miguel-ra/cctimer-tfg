import clsx from "clsx";
import { KeyboardEvent, MouseEvent, useCallback } from "react";
import { useTranslation } from "react-i18next";

import Button from "components/button/Button";
import Box from "components/flexboxgrid/Box";
import useStats from "features/stats/statsViewModel";
import { TimeId } from "models/times/Time";
import { elapsedTimeWithPenaltyCompact } from "shared/format/puzzleTime";

import useTimeDetailsModal from "./modals/useTimeDetailsModal";
import useStyles from "./Times.styles";
import { useTimes } from "./timesViewModel";

type TimesProps = {
  mobile?: boolean;
};

function Times({ mobile }: TimesProps) {
  const classes = useStyles({ mobile });
  const { openTimeDetailsModal } = useTimeDetailsModal();
  const { puzzleStats } = useStats();
  const { deletePuzzleTimes, puzzleTimes } = useTimes();
  const { t } = useTranslation();

  const showTimeDetails = useCallback(
    (timeId: TimeId) => {
      openTimeDetailsModal(timeId);
    },
    [openTimeDetailsModal]
  );

  const handleTimesClick = useCallback(
    (event: MouseEvent) => {
      const { id } = (event.target as HTMLElement).dataset;
      if (id) {
        event.stopPropagation();
        showTimeDetails(Number(id));
      }
    },
    [showTimeDetails]
  );

  const handleTimesKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const { id } = (event.target as HTMLElement).dataset;
      if (id && event.key === "Enter") {
        event.stopPropagation();
        event.preventDefault();
        showTimeDetails(Number(id));
      }
    },
    [showTimeDetails]
  );

  if (!puzzleTimes || !puzzleTimes.length) {
    return (
      <Box width="100%" height="100%" padding="2rem" display="grid" placeContent="center">
        {t("You have not registered any time. Destroy it! 🤘")}
      </Box>
    );
  }

  // TODO: Virtualizate this list (Only show visibles)

  return (
    <div className={classes.root}>
      <div className={classes.timesWrapper}>
        <div className={classes.times} onClick={handleTimesClick} onKeyDownCapture={handleTimesKeyDown}>
          {puzzleTimes
            .map((time) => (
              <div
                data-id={time.id}
                role="button"
                tabIndex={0}
                key={time.id}
                className={clsx(classes.time, {
                  [classes.bestTime]: time.id === puzzleStats?.single?.best?.ids?.[0],
                })}
              >
                {elapsedTimeWithPenaltyCompact(time.elapsedTime, time.penalty)}
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
          {t("Delete all times")} ({puzzleTimes.length})
        </Button>
      </div>
    </div>
  );
}

export default Times;
