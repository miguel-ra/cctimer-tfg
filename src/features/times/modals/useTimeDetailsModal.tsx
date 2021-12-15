import { lazy, useCallback, useEffect, useMemo, useRef } from "react";
import { useMenu } from "store/menuContext";
import { useModal } from "store/modalContext";
import { PuzzleTime, TimeId } from "models/times/Time";
import { useTimer } from "features/timer/timerViewModel";

const ModalTimeDetails = lazy(() => import("./ModalTimeDetails"));

function useTimeDetailsModal() {
  const { openModal } = useModal();
  const { puzzleTimes, updateTime, deleteTime } = useTimer();
  const { selectedItem } = useMenu();
  const puzzleTimesRef = useRef(puzzleTimes);

  useEffect(() => {
    puzzleTimesRef.current = puzzleTimes;
  }, [puzzleTimes]);

  const openTimeDetailsModal = useCallback(
    (timeId: TimeId) => {
      console.log({ timeId, puzzleTimes: puzzleTimesRef.current });
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
