import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

import { initialSettings, Settings } from "models/settings/Settings";
import { useSettingsRepository } from "repositories/settings/settingsRepository";

type SettingsState = {
  settings: Settings;
  setSetting: <C extends keyof Settings, S extends keyof Settings[C], V extends Settings[C][S]>(
    category: C,
    setting: S,
    value: V
  ) => void;
};

type SettingsProviderProps = {
  children: ReactNode;
};

const SettingsContext = createContext<SettingsState | null>(null);

function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("useSettings must be used within the SettingsContext");
  }
  return context;
}

function SettingsProvider({ children }: SettingsProviderProps) {
  const settingsRepository = useSettingsRepository();
  const [settings, setSettings] = useState(initialSettings);

  const setSetting = useCallback(
    async <C extends keyof Settings, S extends keyof Settings[C], V extends Settings[C][S]>(
      category: C,
      setting: S,
      value: V
    ) => {
      const newSettings = await settingsRepository.update(category, setting, value);
      setSettings(newSettings);
    },
    [settingsRepository]
  );

  useEffect(() => {
    settingsRepository.getAll().then((initialSettings) => {
      if (initialSettings) {
        setSettings(initialSettings);
      }
    });
  }, [settingsRepository]);

  return <SettingsContext.Provider value={{ settings, setSetting }}>{children}</SettingsContext.Provider>;
}

export { SettingsProvider, useSettings };
