import { Dispatch, MouseEvent as ReactMouseEvent, TouchEvent, useCallback, useMemo } from "react";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import { useTimer } from "features/timer/timerViewModel";
import { PuzzleTime, TimePenalty } from "models/times/Time";
import theme from "styles/theme";

enum Action {
  Delete = "delete",
  Dnf = "dnf",
  PlusTwo = "plusTwo",
  OpenDetails = "openDetails",
}

type ActionCallbacks = { [key in Action]: (time: PuzzleTime) => PuzzleTime | undefined };

type QuickActionsProps = {
  time?: PuzzleTime;
  setTime?: Dispatch<React.SetStateAction<PuzzleTime | undefined>>;
};

const useStyles = createUseStyles({
  quickActions: {
    position: "absolute",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    opacity: 0,
    transition: "opacity 0.1s linear",
    "&.visible": {
      opacity: 1,
    },
  },
  quickAction: {
    margin: "1rem",
    cursor: "pointer",
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
    "@media (max-height:600px)": {
      margin: "0 1rem",
    },
  },
});

function QuickActions({ time }: QuickActionsProps) {
  const classes = useStyles();
  const { updateTime, deleteTime } = useTimer();

  const actionCallback: ActionCallbacks = useMemo(
    () => ({
      [Action.PlusTwo]: (time: PuzzleTime) => {
        updateTime(time.id, { penalty: TimePenalty.PlusTwo });
        return time;
      },
      [Action.Delete]: (time: PuzzleTime) => {
        console.log("eliminando");
        return time;
      },
      [Action.Dnf]: (time: PuzzleTime) => {
        console.log("dnf");
        return time;
      },
      [Action.OpenDetails]: (time: PuzzleTime) => {
        console.log("openDetails");
        return time;
      },
    }),
    []
  );

  const handleClick = useCallback(
    (event: ReactMouseEvent<HTMLDivElement, MouseEvent> | TouchEvent<HTMLDivElement>) => {
      const element = event.target as HTMLElement;
      const action = element.dataset.action as Action;
      if (action && time) {
        event.stopPropagation();
        const timeUpdated = actionCallback[action](time);
      }
    },
    [actionCallback, time]
  );

  return (
    <div
      className={clsx(classes.quickActions, { visible: !!time })}
      onMouseDownCapture={handleClick}
      onTouchStartCapture={handleClick}
    >
      <button data-action={Action.PlusTwo} className={classes.quickAction}>
        +2
      </button>
      <button data-action={Action.Dnf} className={classes.quickAction}>
        dnf
      </button>
      <button data-action={Action.Delete} className={classes.quickAction}>
        eliminar
      </button>
      <button data-action={Action.OpenDetails} className={classes.quickAction}>
        details
      </button>
    </div>
  );
}

export default QuickActions;
