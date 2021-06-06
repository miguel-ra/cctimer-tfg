import { useState } from "react";
import { PuzzlesRepository } from "models/puzzles/PuzzlesRepository";
import PuzzlesRepositoryInMemory from "./PuzzlesRepositoryInMemory";

function usePuzzlesRepository() {
  const [puzzlesRepository] = useState<PuzzlesRepository>(new PuzzlesRepositoryInMemory());

  return puzzlesRepository;
}

export { usePuzzlesRepository };
