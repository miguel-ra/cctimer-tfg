import { useState } from "react";

import { SettingsRepository } from "models/settings/SettingsRepository";

import SettingsRepositoryInMemory from "./SettingsRepositoryInMemory";

const settingsRepositoryInMemory = new SettingsRepositoryInMemory();

function useSettingsRepository() {
  const [settingsRepository] = useState<SettingsRepository>(settingsRepositoryInMemory);

  return settingsRepository;
}

export { useSettingsRepository };
