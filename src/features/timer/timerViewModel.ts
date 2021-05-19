import { PuzzleTime, Time } from "models/times/Time";
import { useCallback, useEffect, useState } from "react";
import { useTimesRepository } from "repositories/times/timesRepository";
import { useMenu } from "store/menuContext";
import { useTimer } from "./timerContext";

function useTimerViewModel() {
  const { selectedItem } = useMenu();
  const [puzzleTimes, setPuzzleTimes] = useState<PuzzleTime[]>([]);
  const timesRepository = useTimesRepository();
  const { scramble, refreshScramble } = useTimer();

  const refreshPuzzles = useCallback(() => {
    if (selectedItem?.id) {
      timesRepository
        .getAll(selectedItem.key, selectedItem.id)
        .then((response) => {
          setPuzzleTimes(response);
        });
    }
  }, [selectedItem, timesRepository]);

  useEffect(() => {
    refreshPuzzles();
  }, [refreshPuzzles]);

  const addTime = useCallback(
    (time: Time) => {
      if (selectedItem?.id) {
        timesRepository
          .add(selectedItem.key, selectedItem.id, { ...time, scramble })
          .then((addedTime) => {
            setPuzzleTimes((prevPuzzleTimes) => [
              ...prevPuzzleTimes,
              addedTime,
            ]);
            refreshScramble();
          });
      }
      //TODO: Else show an error message
    },
    [
      refreshScramble,
      scramble,
      selectedItem?.id,
      selectedItem?.key,
      timesRepository,
    ]
  );

  return { puzzleTimes, addTime };
}

export { useTimerViewModel };
