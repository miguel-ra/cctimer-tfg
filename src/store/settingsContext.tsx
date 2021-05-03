import { createContext, ReactNode, useCallback, useContext } from "react";
import useStorageState from "shared/hooks/useStorageState";

type Settings = {
  inspection: {
    enabled: boolean;
    time: number;
    autoStart: boolean;
  };
  timer: {
    hideTime: boolean;
    hideUI: boolean;
    holdToStart: boolean;
  };
};

type SettingsState = {
  settings: Settings;
  setSetting: <
    C extends keyof Settings,
    S extends keyof Settings[C],
    V extends Settings[C][S]
  >(
    category: C,
    setting: S,
    value: V
  ) => void;
};

type SettingsProviderProps = {
  children: ReactNode;
};

const initialState: Settings = {
  inspection: {
    enabled: false,
    time: 15,
    autoStart: false,
  },
  timer: {
    hideTime: false,
    hideUI: false,
    holdToStart: false,
  },
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
  const [settings, setSettings] = useStorageState<Settings>(
    "settings",
    () => initialState
  );

  const setSetting = useCallback(
    <
      C extends keyof Settings,
      S extends keyof Settings[C],
      V extends Settings[C][S]
    >(
      category: C,
      setting: S,
      value: V
    ) => {
      setSettings((prevSettings: Settings) => ({
        ...prevSettings,
        [category]: {
          ...prevSettings?.[category],
          [setting]: value,
        },
      }));
    },
    [setSettings]
  );

  return (
    <SettingsContext.Provider value={{ settings, setSetting }}>
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, useSettings };
