import { useState } from "react";

import { PuzzlesRepository } from "models/puzzles/PuzzlesRepository";

import PuzzlesRepositoryInMemory from "./PuzzlesRepositoryInMemory";

const puzzlesRepositoryInMemory = new PuzzlesRepositoryInMemory();

function usePuzzlesRepository() {
  const [puzzlesRepository] = useState<PuzzlesRepository>(puzzlesRepositoryInMemory);

  return puzzlesRepository;
}

export { usePuzzlesRepository };
