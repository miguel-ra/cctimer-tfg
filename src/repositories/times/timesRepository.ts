import { useState } from "react";

import { TimesRepository } from "models/times/TimesRepository";

import TimesRepositoryInMemory from "./TimesRepositoryInMemory";

function useTimesRepository() {
  const [timesRepository] = useState<TimesRepository>(new TimesRepositoryInMemory());

  return timesRepository;
}

export { useTimesRepository };
