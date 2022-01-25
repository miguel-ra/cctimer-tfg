import { lazy, useCallback, useEffect, useMemo, useRef } from "react";

import { useTimer, useTimerSelectedItem } from "features/timer/timerViewModel";
import { PuzzleTime, TimeId } from "models/times/Time";
import { useModal } from "store/modalContext";

const ModalTimeDetails = lazy(() => import("./ModalTimeDetails"));

function useTimeDetailsModal() {
  const { openModal } = useModal();
  const { puzzleTimes, updateTime, deleteTime } = useTimer();
  const { selectedItem } = useTimerSelectedItem();
  const puzzleTimesRef = useRef(puzzleTimes);

  useEffect(() => {
    puzzleTimesRef.current = puzzleTimes;
  }, [puzzleTimes]);

  const openTimeDetailsModal = useCallback(
    (timeId: TimeId) => {
      const time = puzzleTimesRef.current.find((time) => time.id === timeId) as PuzzleTime;

      openModal(
        <ModalTimeDetails
          puzzleKey={selectedItem?.key}
          time={time}
          updateTime={updateTime}
          deleteTime={deleteTime}
        />
      );
    },
    [deleteTime, openModal, selectedItem?.key, updateTime]
  );

  return useMemo(
    () => ({
      openTimeDetailsModal,
    }),
    [openTimeDetailsModal]
  );
}

export default useTimeDetailsModal;
