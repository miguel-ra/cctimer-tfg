import { useState } from "react";
import { useTranslation } from "react-i18next";

import Button from "components/button/Button";
import ButtonGroup from "components/button/ButtonGroup";
import IconButton from "components/button/IconButton";
import Divider from "components/divider/Divider";
import TextField from "components/field/TextField";
import Box from "components/flexboxgrid/Box";
import ModalBody from "components/modal/ModalBody";
import ModalFooter from "components/modal/ModalFooter";
import ModalHeader from "components/modal/ModalHeader";
import ScrambleShowcase from "components/scramble/ScrambleShowcase";
import Typography from "components/typography/Typography";
import { LangKey } from "i18n/i18n";
import { PuzzleKey } from "models/puzzles/Puzzle";
import { PuzzleTime, TimeId, TimePenalty } from "models/times/Time";
import { PuzzleTimeUpdate } from "models/times/TimesRepository";
import { dateTimeToLocale } from "shared/format/date";
import { elapsedTimeWithPenalty } from "shared/format/puzzleTime";
import { useModal } from "store/modalContext";

import { ReactComponent as ShareIcon } from "assets/icons/share.svg";

import ModalShareTime from "./ModalShareTime";
import useStyles from "./ModalTimeDetails.styles";

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
    };
  }
  return {
    variant: "outlined",
  };
}

function ModalTimeDetails({ puzzleKey, time, updateTime, deleteTime }: ModalTimeDetailsProps) {
  const [internalTime, setInternalTime] = useState(time);
  const { openModal, closeModal } = useModal();
  const { t, i18n } = useTranslation();
  const classes = useStyles();

  function handleUpdate(dataToUpdate: PuzzleTimeUpdate) {
    updateTime(internalTime.id, dataToUpdate).then((updatedTime) => {
      if (updatedTime) {
        return setInternalTime(updatedTime);
      }
      closeModal();
    });
  }

  function openTimeDetails() {
    openModal(
      <ModalTimeDetails
        puzzleKey={puzzleKey}
        time={internalTime}
        updateTime={updateTime}
        deleteTime={deleteTime}
      />
    );
  }

  return (
    <div className={classes.root}>
      <ModalHeader label={t("Time details")}>
        <IconButton
          size="small"
          aria-label={t("Share")}
          onClick={() => openModal(<ModalShareTime time={internalTime} goBack={openTimeDetails} />)}
        >
          <ShareIcon />
        </IconButton>
      </ModalHeader>
      <ModalBody className={classes.modalBody}>
        <div className={classes.content}>
          <Box
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            xs={{ flexDirection: "column-reverse" }}
            sm={{ flexDirection: "row" }}
          >
            <Typography className={classes.time} variant="h3">
              {elapsedTimeWithPenalty(internalTime.elapsedTime, internalTime.penalty)}
            </Typography>
            <Typography variant="caption" className={classes.date}>
              {dateTimeToLocale(i18n.language as LangKey, internalTime.createdAt)}
            </Typography>
          </Box>
          <Divider />
          {internalTime.scramble.text && (
            <>
              <ScrambleShowcase puzzleKey={puzzleKey} scramble={internalTime.scramble} />
              <Divider disableTop />
            </>
          )}
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
      <ModalFooter>
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
            {t("Delete")}
          </Button>
        </Box>
        {internalTime.elapsedTime > 0 && (
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
        )}
      </ModalFooter>
    </div>
  );
}

export default ModalTimeDetails;
