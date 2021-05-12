import { useCallback, useEffect, useState } from "react";
import { PuzzleKey, UserPuzzle } from "models/puzzles/Puzzle";
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
    async (key: PuzzleKey): Promise<void> => {
      await puzzlesRepository.add(key);
      refreshPuzzles();
    },
    [puzzlesRepository, refreshPuzzles]
  );

  return { puzzles, addPuzzle };
}

export { usePuzzleView };
