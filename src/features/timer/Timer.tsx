import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useLayout } from "features/layout/layoutContext";

import TimerDesktop from "./desktop/TimerDesktop";
import TimerMobile from "./mobile/TimerMobile";
import { useScramble, useTimer, useTimerSelectedItem } from "./timerViewModel";

function Timer() {
  const { layout } = useLayout();
  const { puzzleId } = useParams();
  const { startWorker, stopWorker, refreshScramble } = useScramble();
  const { selectedItem } = useTimerSelectedItem();
  const { checkPuzzleId, refreshPuzzleTimes } = useTimer();
  const TimerComponet = layout === "desktop" ? TimerDesktop : TimerMobile;

  useEffect(() => {
    refreshScramble();
  }, [refreshScramble]);

  useEffect(() => {
    refreshPuzzleTimes();
  }, [refreshPuzzleTimes]);

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
    checkPuzzleId(Number(puzzleId));
  }, [checkPuzzleId, puzzleId, selectedItem?.id]);

  return <TimerComponet />;
}

export default Timer;
