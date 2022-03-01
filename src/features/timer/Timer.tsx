import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useLayout } from "features/layout/layoutContext";
import useStats from "features/stats/statsViewModel";
import { useTimes } from "features/times/timesViewModel";

import TimerDesktop from "./desktop/TimerDesktop";
import TimerMobile from "./mobile/TimerMobile";
import { useScramble, useSelectedItem, useTimer } from "./timerViewModel";

function Timer() {
  const { layout } = useLayout();
  const { puzzleId } = useParams();
  const { refreshScramble, startWorker: scrambleStartWorker, stopWorker: scrambleStopWorker } = useScramble();
  const { refreshStats, startWorker: statsStartWorker, stopWorker: statsStopWorker } = useStats();
  const { selectedItem, setSelectedItem } = useSelectedItem();
  const { checkPuzzleAndRedirect } = useTimer();
  const { puzzleTimes, lastTime, setLastTime, refreshPuzzleTimes } = useTimes();
  const TimerComponet = layout === "desktop" ? TimerDesktop : TimerMobile;

  useEffect(() => {
    if (lastTime?.id) {
      refreshScramble();
    }
  }, [lastTime?.id, refreshScramble]);

  useEffect(() => {
    refreshStats();
  }, [puzzleTimes, refreshStats]);

  useEffect(() => {
    if (selectedItem?.id) {
      setLastTime(undefined);
      refreshPuzzleTimes();
      refreshScramble();
      refreshStats();
    }
  }, [refreshPuzzleTimes, refreshScramble, selectedItem?.id, setLastTime, refreshStats]);

  useEffect(() => {
    statsStartWorker();
    scrambleStartWorker();
    return () => {
      statsStopWorker();
      scrambleStopWorker();
    };
  }, [scrambleStartWorker, scrambleStopWorker, statsStartWorker, statsStopWorker]);

  useEffect(() => {
    checkPuzzleAndRedirect(puzzleId);
  }, [checkPuzzleAndRedirect, puzzleId, setSelectedItem]);

  return <TimerComponet />;
}

export default Timer;
