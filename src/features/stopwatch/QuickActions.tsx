import { KeyboardEvent, memo, MouseEvent as ReactMouseEvent, TouchEvent, useCallback, useMemo } from "react";
import { createUseStyles } from "react-jss";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { useTimer } from "features/timer/timerViewModel";
import { PuzzleTime, TimePenalty } from "models/times/Time";
import Button from "components/button/Button";

enum Action {
  Delete = "delete",
  Dnf = "dnf",
  PlusTwo = "plusTwo",
  Undo = "undo",
}

type ActionCallbacks = { [key in Action]: (time: PuzzleTime) => Promise<PuzzleTime | undefined> };

type QuickActionsProps = {
  time?: PuzzleTime;
  resetStopwatch: () => void;
};

const useStyles = createUseStyles({
  quickActions: {
    position: "absolute",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    opacity: 0,
    zIndex: -1,
    transition: "opacity 0.1s linear",
    visibility: "hidden",
    "&.visible": {
      visibility: "visible",
      opacity: 1,
      zIndex: 0,
      "@media (max-height:400px)": {
        position: "relative",
      },
    },
  },
  quickAction: {
    margin: "0.5rem",
    cursor: "pointer",
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
    "@media (max-height:600px)": {
      margin: "0 0.5rem",
    },
  },
});

function handlePropagation(
  event:
    | ReactMouseEvent<HTMLDivElement, MouseEvent>
    | TouchEvent<HTMLDivElement>
    | KeyboardEvent<HTMLDivElement>
) {
  const element = event.target as HTMLElement;
  const action = element.dataset.action as Action;
  if (action) {
    event.stopPropagation();
  }
}

function QuickActions({ resetStopwatch }: QuickActionsProps) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { updateTime, deleteTime, lastTime, setLastTime } = useTimer();

  const actionCallback: ActionCallbacks = useMemo(
    () => ({
      [Action.PlusTwo]: (time: PuzzleTime) => {
        return updateTime(time.id, { penalty: TimePenalty.PlusTwo });
      },
      [Action.Dnf]: (time: PuzzleTime) => {
        return updateTime(time.id, { penalty: TimePenalty.Dnf });
      },
      [Action.Delete]: async (time: PuzzleTime) => {
        // TODO: Add confirmation modal
        await deleteTime(time.id);
        (document.activeElement as HTMLElement)?.blur();
        return undefined;
      },
      [Action.Undo]: (time: PuzzleTime) => {
        return updateTime(time.id, { penalty: undefined });
      },
    }),
    [deleteTime, updateTime]
  );

  const handleClick = useCallback(
    async (event: ReactMouseEvent<HTMLDivElement, MouseEvent> | KeyboardEvent<HTMLDivElement>) => {
      const element = event.target as HTMLElement;
      const action = element.dataset.action as Action;
      if (action && lastTime) {
        event.stopPropagation();
        const timeUpdated = await actionCallback[action](lastTime);
        if (!timeUpdated) {
          resetStopwatch();
        }
        if (document.body.classList.contains("mousedown")) {
          (document.activeElement as HTMLElement)?.blur();
        }
        setLastTime(timeUpdated);
      }
    },
    [actionCallback, lastTime, resetStopwatch, setLastTime]
  );

  return (
    <div
      className={clsx(classes.quickActions, { visible: !!lastTime })}
      onMouseDownCapture={handlePropagation}
      onTouchStartCapture={handlePropagation}
      onClickCapture={handleClick}
      onKeyDownCapture={(event) => {
        handlePropagation(event);
        if (["Enter", " "].includes(event.key)) {
          handleClick(event);
        }
      }}
    >
      {!lastTime?.penalty ? (
        <>
          <Button variant="outlined" data-action={Action.PlusTwo} className={classes.quickAction}>
            {t("+2")}
          </Button>
          <Button variant="outlined" data-action={Action.Dnf} className={classes.quickAction}>
            {t("DNF")}
          </Button>
          <Button variant="outlined" color="red" data-action={Action.Delete} className={classes.quickAction}>
            {t("Delete")}
          </Button>
        </>
      ) : (
        <Button variant="outlined" data-action={Action.Undo} className={classes.quickAction}>
          {t("Undo")}
        </Button>
      )}
    </div>
  );
}

export default memo(QuickActions);
