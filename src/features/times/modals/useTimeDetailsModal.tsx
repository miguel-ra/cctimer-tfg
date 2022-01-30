import { lazy, useCallback, useEffect, useMemo, useRef } from "react";

import { useSelectedItem } from "features/timer/timerViewModel";
import { PuzzleTime, TimeId } from "models/times/Time";
import { useModal } from "store/modalContext";

import { usePuzzleTimesState, useTimes } from "../timesViewModel";

const TimeDetailsModal = lazy(() => import("./TimeDetailsModal"));

function useTimeDetailsModal() {
  const { openModal } = useModal();
  const { updateTime, deleteTime } = useTimes();
  const [puzzleTimes] = usePuzzleTimesState();
  const { selectedItem } = useSelectedItem();
  const puzzleTimesRef = useRef(puzzleTimes);

  useEffect(() => {
    puzzleTimesRef.current = puzzleTimes;
  }, [puzzleTimes]);

  const openTimeDetailsModal = useCallback(
    (timeId: TimeId) => {
      const time = puzzleTimesRef.current.find((time) => time.id === timeId) as PuzzleTime;

      openModal(
        <TimeDetailsModal
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
