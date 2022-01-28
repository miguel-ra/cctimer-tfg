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
  const { selectedItem } = useTimerSelectedItem();
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
    setLastTime(undefined);
    refreshPuzzleTimes();
    scramble.refreshScramble();
    stats.refreshStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);

  useEffect(() => {
    const handler = scramble.startWorker();
    return () => {
      scramble.stopWorker(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scramble.startWorker, scramble.stopWorker]);

  useEffect(() => {
    const handler = stats.startWorker();
    return () => {
      stats.stopWorker(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats.startWorker, stats.stopWorker]);

  useEffect(() => {
    if (Number(puzzleId) === selectedItem?.id) {
      return;
    }
    checkPuzzleAndRedirect(Number(puzzleId));
  }, [checkPuzzleAndRedirect, puzzleId, selectedItem?.id]);

  return <TimerComponet />;
}

export default Timer;
