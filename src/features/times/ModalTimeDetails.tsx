import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LangKey } from "i18n/i18n";
import { millisecondsToClock } from "shared/format/number";
import { dateTimeToLocale } from "shared/format/date";
import { PuzzleTime, TimeId, TimePenalty } from "models/times/Time";
import { PuzzleTimeUpdate } from "models/times/TimesRepository";
import { PuzzleKey } from "models/puzzles/Puzzle";
import ModalHeader from "components/modal/ModalHeader";
import ModalBody from "components/modal/ModalBody";
import Button from "components/button/Button";
import Box from "components/flexboxgrid/Box";
import Typography from "components/typography/Typography";
import Divider from "components/divider/Divider";
import ScrambleShowcase from "components/scramble/ScrambleShowcase";
import TextField from "components/field/TextField";
import ButtonGroup from "components/button/ButtonGroup";
import useStyles from "./ModalTimeDetails.styles";
import { useModal } from "store/modalContext";
import { elapsedTimeToClock } from "shared/format/puzzleTime";

type ModalTimeDetailsProps = {
  puzzleKey?: PuzzleKey;
  time: PuzzleTime;
  updateTime: (timeId: TimeId, dataToUpdate: PuzzleTimeUpdate) => Promise<PuzzleTime | undefined>;
  deleteTime: (timeId: TimeId) => Promise<void>;
};

function getPenaltyButtonProps(
  penaltyToCheck?: TimePenalty,
  timePenalty?: TimePenalty
): { variant: "contained" | "outlined"; disabled?: boolean } {
  if (penaltyToCheck === timePenalty) {
    return {
      variant: "contained",
      disabled: true,
    };
  }
  return {
    variant: "outlined",
  };
}

function ModalTimeDetails({ puzzleKey, time, updateTime, deleteTime }: ModalTimeDetailsProps) {
  const [internalTime, setInternalTime] = useState(time);
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const { closeModal } = useModal();

  useEffect(() => {
    if (time) {
      setInternalTime(time);
    }
  }, [time]);

  function handleUpdate(dataToUpdate: PuzzleTimeUpdate) {
    updateTime(internalTime.id, dataToUpdate).then((updatedTime) => {
      if (updatedTime) {
        return setInternalTime(updatedTime);
      }
      closeModal();
    });
  }

  return (
    <form className={classes.root} onSubmit={(event) => event.preventDefault()}>
      <ModalHeader>{t("Time details")}</ModalHeader>
      <ModalBody>
        <div className={classes.content}>
          <Box
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            xs={{ flexDirection: "column-reverse" }}
            sm={{ flexDirection: "row" }}
          >
            <Typography variant="h3">
              {elapsedTimeToClock(internalTime.elapsedTime, internalTime.penalty)}
            </Typography>
            <Typography variant="caption" className={classes.date}>
              {dateTimeToLocale(i18n.language as LangKey, internalTime.createdAt)}
            </Typography>
          </Box>
          <Divider />
          <ScrambleShowcase puzzleKey={puzzleKey} scramble={internalTime.scramble} />
          <Divider />
          <TextField
            name="comment"
            label={t("Comment")}
            defaultValue={internalTime.comment}
            onBlur={(event) => {
              const { value } = event.target;
              handleUpdate({ comment: value });
            }}
          />
        </div>
      </ModalBody>
      <div className={classes.buttons}>
        <Box>
          <Button
            variant="contained"
            color="red"
            onClick={() => {
              // TODO: Add confirmation modal
              deleteTime(internalTime.id).then(() => {
                closeModal();
              });
            }}
          >
            {t("Remove")}
          </Button>
        </Box>
        <ButtonGroup
          onClick={(event) => {
            const { value } = (event.target as HTMLElement).dataset;
            handleUpdate({ penalty: value as TimePenalty });
          }}
        >
          <Button data-value={undefined} {...getPenaltyButtonProps(undefined, internalTime.penalty)}>
            {t("No penalty")}
          </Button>
          <Button
            data-value={TimePenalty.PlusTwo}
            {...getPenaltyButtonProps(TimePenalty.PlusTwo, internalTime.penalty)}
          >
            {t("+2")}
          </Button>
          <Button
            data-value={TimePenalty.Dnf}
            {...getPenaltyButtonProps(TimePenalty.Dnf, internalTime.penalty)}
          >
            {t("DNF")}
          </Button>
        </ButtonGroup>
      </div>
    </form>
  );
}

export default ModalTimeDetails;
