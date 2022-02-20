import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import ErrorNotification from "components/notification/ErrorNotification";
import { PuzzleId, PuzzleKey, UserPuzzle } from "models/puzzles/Puzzle";
import { usePuzzlesRepository } from "repositories/puzzles/puzzlesRepository";
import { useTimesRepository } from "repositories/times/timesRepository";
import { useNotifications } from "store/notificationsContext";

function usePuzzles() {
  const [puzzles, setPuzzles] = useState<UserPuzzle[]>([]);
  const puzzlesRepository = usePuzzlesRepository();
  const timesRepository = useTimesRepository();
  const { addNotification } = useNotifications();
  const { t } = useTranslation();

  const refreshPuzzles = useCallback(async () => {
    try {
      const udpatedPuzzles = await puzzlesRepository.getAll();
      setPuzzles(udpatedPuzzles);
    } catch (error) {
      setPuzzles([]);
    }
  }, [puzzlesRepository]);

  const addPuzzle = useCallback(
    async (key: PuzzleKey) => {
      try {
        const addedPuzzle = await puzzlesRepository.add(key);
        refreshPuzzles();
        return addedPuzzle;
      } catch (error) {
        addNotification((props) => (
          <ErrorNotification {...props}>{t("Puzzle could not be added")}</ErrorNotification>
        ));
      }
    },
    [addNotification, puzzlesRepository, refreshPuzzles, t]
  );

  const deletePuzzle = useCallback(
    async (key: PuzzleKey, id: PuzzleId): Promise<void> => {
      try {
        timesRepository.deleteAll(key, id);
      } catch (error) {
        addNotification((props) => (
          <ErrorNotification {...props}>{t("Puzzle times could not be deleted")}</ErrorNotification>
        ));
      }
      try {
        await puzzlesRepository.delete(id);
        refreshPuzzles();
      } catch (error) {
        addNotification((props) => (
          <ErrorNotification {...props}>{t("Puzzle could not be deleted")}</ErrorNotification>
        ));
      }
    },
    [addNotification, puzzlesRepository, refreshPuzzles, t, timesRepository]
  );

  return { puzzles, addPuzzle, deletePuzzle, refreshPuzzles };
}

export { usePuzzles };
