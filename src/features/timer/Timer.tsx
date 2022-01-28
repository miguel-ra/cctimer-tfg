import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useLayout } from "features/layout/layoutContext";
import useStats from "features/stats/statsViewModel";
import { useLastTime, usePuzzleTimes, useTimes } from "features/times/timesViewModel";

import TimerDesktop from "./desktop/TimerDesktop";
import TimerMobile from "./mobile/TimerMobile";
import { useScramble, useTimer, useTimerSelectedItem } from "./timerViewModel";

function Timer() {
  const { layout } = useLayout();
  const { puzzleId } = useParams();
  const scramble = useScramble();
  const stats = useStats();
  const { selectedItem, setSelectedItem, resetSelectedItem } = useTimerSelectedItem();
  const { checkPuzzleAndRedirect } = useTimer();
  const { refreshPuzzleTimes } = useTimes();
  const { puzzleTimes } = usePuzzleTimes();
  const { lastTime, setLastTime } = useLastTime();
  const TimerComponet = layout === "desktop" ? TimerDesktop : TimerMobile;

  useEffect(() => {
    if (lastTime?.id) {
      scramble.refreshScramble();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastTime?.id]);

  useEffect(() => {
    stats.refreshStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [puzzleTimes]);

  useEffect(() => {
    if (selectedItem?.id) {
      setLastTime(undefined);
      refreshPuzzleTimes();
      scramble.refreshScramble();
      stats.refreshStats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem?.id]);

  useEffect(() => {
    stats.startWorker();
    scramble.startWorker();
    return () => {
      stats.stopWorker();
      scramble.stopWorker();
      scramble.resetScramble();
      resetSelectedItem();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetSelectedItem]);

  useEffect(() => {
    checkPuzzleAndRedirect(puzzleId);
  }, [checkPuzzleAndRedirect, puzzleId, setSelectedItem]);

  return <TimerComponet />;
}

export default Timer;
