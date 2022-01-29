import { useCallback, useRef, useState } from "react";

type StopwatchState = {
  startTime: number;
  currentTime: number;
  countDown?: number;
};

const REFRESH_RATE_MS = 59;

const initialState: StopwatchState = { startTime: 0, currentTime: 0 };

function useStopwatch() {
  const timerInterval = useRef<number | null>(null);
  const [state, setState] = useState(initialState);

  const startStopwatch = useCallback(
    ({ countDown: countDownArg, onTimeout } = {}) => {
      const startTime = Date.now();
      const countDown = (countDownArg || 1) - 1;

      if (timerInterval.current) {
        clearInterval(timerInterval.current);
        timerInterval.current = null;
      }

      setState({
        startTime,
        currentTime: startTime,
        countDown,
      });

      timerInterval.current = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        if (countDown && countDown - elapsedTime <= 0) {
          if (timerInterval.current) {
            clearInterval(timerInterval.current);
            timerInterval.current = null;
          }
          onTimeout?.();
          return;
        }
        setState((prevState) => ({
          ...prevState,
          currentTime: currentTime,
        }));
      }, REFRESH_RATE_MS);
    },
    []
  );

  const stopStopwatch = useCallback(() => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
      setState((prevState) => ({
        ...prevState,
        currentTime: Date.now(),
      }));
      timerInterval.current = null;
    }
  }, []);

  const resetStopwatch = useCallback(() => {
    setState(initialState);
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
      timerInterval.current = null;
    }
  }, []);

  const elapsedTime = state.currentTime - state.startTime;
  const remainingTime = state.countDown ? state.countDown - elapsedTime : 0;

  return {
    startStopwatch,
    stopStopwatch,
    resetStopwatch,
    elapsedTime,
    remainingTime: remainingTime < 0 ? 0 : remainingTime,
  };
}

export default useStopwatch;
