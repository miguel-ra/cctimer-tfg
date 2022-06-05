import { useEffect, useRef } from "react";

import { useLayout } from "features/layout/layoutViewModel";
import { useSelectedItem } from "features/router/routerViewModel";
import useStats from "features/stats/statsViewModel";
import { useTimes } from "features/times/timesViewModel";
import { PuzzleId } from "models/puzzles/Puzzle";
import { SelectedItemType } from "models/router/Router";

import TimerDesktop from "./desktop/TimerDesktop";
import TimerMobile from "./mobile/TimerMobile";
import { useScramble } from "./timerViewModel";

function Timer() {
  const { screenSize } = useLayout();
  const { refreshScramble, startWorker: scrambleStartWorker, stopWorker: scrambleStopWorker } = useScramble();
  const { refreshStats, startWorker: statsStartWorker, stopWorker: statsStopWorker } = useStats();
  const { selectedItem } = useSelectedItem();
  const { puzzleTimes, lastTime, setLastTime, refreshPuzzleTimes } = useTimes();
  const prevSelectedItemIdRef = useRef<PuzzleId>();
  const TimerComponent = screenSize === "desktop" ? TimerDesktop : TimerMobile;

  useEffect(() => {
    if (lastTime?.id) {
      refreshScramble();
    }
  }, [lastTime?.id, refreshScramble]);

  useEffect(() => {
    refreshStats();
  }, [puzzleTimes, refreshStats]);

  useEffect(() => {
    if (selectedItem?.type !== SelectedItemType.Puzzle) {
      return;
    }

    if (selectedItem.id && prevSelectedItemIdRef.current !== selectedItem.id) {
      setLastTime(undefined);
      refreshPuzzleTimes();
      refreshScramble();
      refreshStats();
      prevSelectedItemIdRef.current = selectedItem.id;
    }
  }, [refreshPuzzleTimes, refreshScramble, selectedItem?.id, setLastTime, refreshStats, selectedItem?.type]);

  useEffect(() => {
    statsStartWorker();
    scrambleStartWorker();
    return () => {
      statsStopWorker();
      scrambleStopWorker();
    };
  }, [scrambleStartWorker, scrambleStopWorker, statsStartWorker, statsStopWorker]);

  return <TimerComponent />;
}

export default Timer;
