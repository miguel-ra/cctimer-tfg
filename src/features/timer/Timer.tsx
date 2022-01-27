import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useLayout } from "features/layout/layoutContext";
import { useLastTime, useTimes } from "features/times/timesViewModel";

import TimerDesktop from "./desktop/TimerDesktop";
import TimerMobile from "./mobile/TimerMobile";
import { useScramble, useTimer, useTimerSelectedItem } from "./timerViewModel";

function Timer() {
  const { layout } = useLayout();
  const { puzzleId } = useParams();
  const { startWorker, stopWorker, refreshScramble } = useScramble();
  const { selectedItem } = useTimerSelectedItem();
  const { checkPuzzleAndRedirect } = useTimer();
  const { refreshPuzzleTimes } = useTimes();
  const { lastTime, setLastTime } = useLastTime();
  const TimerComponet = layout === "desktop" ? TimerDesktop : TimerMobile;

  useEffect(() => {
    if (lastTime?.id) {
      refreshScramble();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastTime?.id]);

  useEffect(() => {
    setLastTime(undefined);
    refreshPuzzleTimes();
    refreshScramble();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);

  useEffect(() => {
    const handler = startWorker();
    return () => {
      stopWorker(handler);
    };
  }, [startWorker, stopWorker]);

  useEffect(() => {
    if (Number(puzzleId) === selectedItem?.id) {
      return;
    }
    checkPuzzleAndRedirect(Number(puzzleId));
  }, [checkPuzzleAndRedirect, puzzleId, selectedItem?.id]);

  return <TimerComponet />;
}

export default Timer;
