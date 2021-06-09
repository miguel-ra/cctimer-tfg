import { createUseStyles } from "react-jss";
import { useTranslation } from "react-i18next";
import { LangKey } from "i18n/i18n";
import theme from "styles/theme";
import { millisecondsToClock } from "shared/format/number";
import { dateTimeFormat } from "shared/format/date";
import { PuzzleTime, TimePenalty } from "models/times/Time";
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
import { useState } from "react";

type ModalTimeDetailsProps = {
  puzzleKey?: PuzzleKey;
  time: PuzzleTime;
};

const useStyles = createUseStyles({
  root: {
    height: "100%",
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
  },
  content: {
    padding: "1.5rem",
    minWidth: "50vw",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  date: {
    textTransform: "uppercase",
    marginBottom: "1.5rem",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "1.5rem",
      marginBottom: "0",
    },
  },
  buttons: {
    transition: ` border ${theme.transition.duration.colorMode} linear`,
    borderTop: `1px solid ${theme.palette.border.primary}`,
    padding: "1.5rem",
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    "& > *": {
      marginRight: "1.5rem",
      "&:last-child": {
        marginRight: 0,
      },
    },
  },
});

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

function ModalTimeDetails({ puzzleKey, time }: ModalTimeDetailsProps) {
  const [penalty, setPenalty] = useState<TimePenalty>();
  const { t, i18n } = useTranslation();
  const classes = useStyles();

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
            <Typography variant="h3">{millisecondsToClock(time.elapsedTime)}</Typography>
            <Typography variant="caption" className={classes.date}>
              {dateTimeFormat(i18n.language as LangKey, time.createdAt)}
            </Typography>
          </Box>
          <Divider />
          <ScrambleShowcase puzzleKey={puzzleKey} scramble={time.scramble} />
          <Divider />
          <TextField name="comment" label={t("Comment")} />
        </div>
      </ModalBody>
      <div className={classes.buttons}>
        <Box>
          <Button variant="contained" color="red">
            {t("Remove")}
          </Button>
        </Box>
        <ButtonGroup
          onClick={(event) => {
            const { value } = (event.target as HTMLElement).dataset;
            setPenalty(value as TimePenalty);
          }}
        >
          <Button data-value={undefined} {...getPenaltyButtonProps(undefined, penalty)}>
            {t("No penalty")}
          </Button>
          <Button data-value={TimePenalty.PlusTwo} {...getPenaltyButtonProps(TimePenalty.PlusTwo, penalty)}>
            {t("+2")}
          </Button>
          <Button data-value={TimePenalty.Dnf} {...getPenaltyButtonProps(TimePenalty.Dnf, penalty)}>
            {t("DNF")}
          </Button>
        </ButtonGroup>
      </div>
    </form>
  );
}

export default ModalTimeDetails;
