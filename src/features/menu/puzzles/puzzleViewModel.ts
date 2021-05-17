import { useCallback, useEffect, useState } from "react";
import { PuzzleId, PuzzleKey, UserPuzzle } from "models/puzzles/Puzzle";
import { usePuzzlesRepository } from "repositories/puzzles/puzzlesRepository";
import { useTimesRepository } from "repositories/times/timesRepository";

function usePuzzleView() {
  const [puzzles, setPuzzles] = useState<UserPuzzle[]>([]);
  const puzzlesRepository = usePuzzlesRepository();
  const timesRepository = useTimesRepository();

  const refreshPuzzles = useCallback(() => {
    puzzlesRepository.getAll().then((response) => {
      setPuzzles(response);
    });
  }, [puzzlesRepository]);

  useEffect(() => {
    refreshPuzzles();
  }, [refreshPuzzles]);

  const addPuzzle = useCallback(
    async (key: PuzzleKey): Promise<UserPuzzle> => {
      const addedPuzzle = await puzzlesRepository.add(key);
      refreshPuzzles();
      return addedPuzzle;
    },
    [puzzlesRepository, refreshPuzzles]
  );

  const removePuzzle = useCallback(
    async (key: PuzzleKey, id: PuzzleId): Promise<void> => {
      await puzzlesRepository.remove(id);
      refreshPuzzles();
      timesRepository.deleteAll(key, id);
    },
    [puzzlesRepository, refreshPuzzles, timesRepository]
  );

  return { puzzles, addPuzzle, removePuzzle };
}

export { usePuzzleView };
