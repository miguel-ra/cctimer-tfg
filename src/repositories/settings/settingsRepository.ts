import { useState } from "react";
import { SettingsRepository } from "models/settings/SettingsRepository";
import SettingsRepositoryInMemory from "./SettingsRepositoryInMemory";

function useSettingsRepository() {
  const [settingsRepository] = useState<SettingsRepository>(new SettingsRepositoryInMemory());

  return settingsRepository;
}

export { useSettingsRepository };
