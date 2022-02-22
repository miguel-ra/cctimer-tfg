import { useState } from "react";

import { TimesRepository } from "models/times/TimesRepository";

import TimesRepositoryInMemory from "./TimesRepositoryInMemory";

const timesRepositoryInMemory = new TimesRepositoryInMemory();

function useTimesRepository() {
  const [timesRepository] = useState<TimesRepository>(timesRepositoryInMemory);

  return timesRepository;
}

export { useTimesRepository };
