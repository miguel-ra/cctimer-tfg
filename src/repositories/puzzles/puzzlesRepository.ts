import { useState } from "react";

import { PuzzlesRepository } from "models/puzzles/PuzzlesRepository";

import puzzlesRepositoryInMemory from "./puzzlesRepositoryInMemory";

function usePuzzlesRepository() {
  const [puzzlesRepository] = useState<PuzzlesRepository>(puzzlesRepositoryInMemory);

  return puzzlesRepository;
}

export { usePuzzlesRepository };
