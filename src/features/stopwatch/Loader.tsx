import { lazy, Suspense, useMemo } from "react";

import { useScramble, useTimerSelectedItem } from "features/timer/timerViewModel";
import { millisecondsToClock } from "shared/format/number";

import useStyles from "./Stopwatch.styles";

const Stopwatch = lazy(() => import("./Stopwatch"));

function Loader() {
  const { scramble } = useScramble();
  const { selectedItem } = useTimerSelectedItem();
  const classes = useStyles();

  const fallback = useMemo(
    () => (
      <div className={classes.container}>
        <div className={classes.displayWrapper}>
          <div className={classes.display}>{millisecondsToClock(0)}</div>
        </div>
      </div>
    ),
    [classes]
  );

  if (!scramble.puzzleKey || !selectedItem) {
    return fallback;
  }

  return (
    <Suspense fallback={fallback}>
      <Stopwatch />
    </Suspense>
  );
}

export default Loader;
