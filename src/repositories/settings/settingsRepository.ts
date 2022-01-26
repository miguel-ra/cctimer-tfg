import { useState } from "react";

import { SettingsRepository } from "models/settings/SettingsRepository";

import settingsRepositoryInMemory from "./settingsRepositoryInMemory";

function useSettingsRepository() {
  const [settingsRepository] = useState<SettingsRepository>(settingsRepositoryInMemory);

  return settingsRepository;
}

export { useSettingsRepository };
