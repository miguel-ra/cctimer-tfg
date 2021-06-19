import { useCallback, useEffect, useState } from "react";
import { PuzzleId, PuzzleKey, UserPuzzle } from "models/puzzles/Puzzle";
import { usePuzzlesRepository } from "repositories/puzzles/puzzlesRepository";
import { useTimesRepository } from "repositories/times/timesRepository";
import { useMenu } from "store/menuContext";
import { useNotifications } from "store/notificationsContext";
import ErrorNotification from "components/notification/ErrorNotification";
import { useTranslation } from "react-i18next";

function usePuzzle() {
  const [puzzles, setPuzzles] = useState<UserPuzzle[]>([]);
  const puzzlesRepository = usePuzzlesRepository();
  const timesRepository = useTimesRepository();
  const { addNotification } = useNotifications();
  const { selectedItem } = useMenu();
  const { t } = useTranslation();

  const refreshPuzzles = useCallback(async () => {
    try {
      const udpatedPuzzles = await puzzlesRepository.getAll();
      setPuzzles(udpatedPuzzles);
    } catch (error) {
      setPuzzles([]);
    }
  }, [puzzlesRepository]);

  useEffect(() => {
    refreshPuzzles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedItem === null) {
      refreshPuzzles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);

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

  const removePuzzle = useCallback(
    async (key: PuzzleKey, id: PuzzleId): Promise<void> => {
      try {
        await puzzlesRepository.remove(id);
        refreshPuzzles();
        timesRepository.deleteAll(key, id);
      } catch (error) {
        addNotification((props) => (
          <ErrorNotification {...props}>{t("Puzzle could not be deleted")}</ErrorNotification>
        ));
      }
      try {
        timesRepository.deleteAll(key, id);
      } catch (error) {
        addNotification((props) => (
          <ErrorNotification {...props}>{t("Puzzle times could not be deleted")}</ErrorNotification>
        ));
      }
    },
    [addNotification, puzzlesRepository, refreshPuzzles, t, timesRepository]
  );

  return { puzzles, addPuzzle, removePuzzle };
}

export { usePuzzle };
