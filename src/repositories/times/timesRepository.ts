import { useState } from "react";

import { TimesRepository } from "models/times/TimesRepository";

import timesRepositoryInMemory from "./timesRepositoryInMemory";

function useTimesRepository() {
  const [timesRepository] = useState<TimesRepository>(timesRepositoryInMemory);

  return timesRepository;
}

export { useTimesRepository };
