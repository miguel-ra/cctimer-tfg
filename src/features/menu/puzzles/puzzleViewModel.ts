import { useCallback, useEffect, useState } from "react";
import { PuzzleId, PuzzleKey, UserPuzzle } from "models/puzzles/Puzzle";
import { usePuzzlesRepository } from "repositories/puzzles/puzzlesRepository";

function usePuzzleView() {
  const [puzzles, setPuzzles] = useState<UserPuzzle[]>([]);
  const puzzlesRepository = usePuzzlesRepository();

  const refreshPuzzles = useCallback(() => {
    puzzlesRepository.getAll().then((response) => {
      setPuzzles(response);
    });
  }, [puzzlesRepository]);

  useEffect(() => {
    refreshPuzzles();
  }, [refreshPuzzles]);

  const addPuzzle = useCallback(
    async (key: PuzzleKey): Promise<PuzzleId> => {
      const addedId = await puzzlesRepository.add(key);
      refreshPuzzles();
      return addedId;
    },
    [puzzlesRepository, refreshPuzzles]
  );

  const removePuzzle = useCallback(
    async (id: PuzzleId): Promise<void> => {
      await puzzlesRepository.remove(id);
      refreshPuzzles();
    },
    [puzzlesRepository, refreshPuzzles]
  );

  return { puzzles, addPuzzle, removePuzzle };
}

export { usePuzzleView };
