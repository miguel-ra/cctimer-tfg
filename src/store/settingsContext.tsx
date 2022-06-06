import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

import { useSelectedItemState } from "features/router/routerViewModel";
import { RoomDataType } from "models/rooms/Room";
import { SelectedItemType } from "models/router/Router";
import { initialSettings, Settings } from "models/settings/Settings";
import { useRoomsRepository } from "repositories/rooms/roomsRepository";
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
  const roomsRepository = useRoomsRepository();
  const [selectedItem] = useSelectedItemState();
  const [settings, setSettings] = useState(initialSettings);
  const [roomSettings, setRoomSettings] = useState<Settings | undefined>(undefined);

  useEffect(() => {
    if (selectedItem?.type === SelectedItemType.Room) {
      roomsRepository.findById(selectedItem.id).then((room) => {
        if (room?.settings && !room.isHost) {
          setRoomSettings(room.settings);
        }
      });
      const unsubscribe = roomsRepository.subscribe(selectedItem.id, (roomMessage) => {
        const { data, isHost } = roomMessage;
        if (data?.type === RoomDataType.SetSettings && !isHost) {
          setRoomSettings(data.settings);
        }
      });
      return unsubscribe;
    } else {
      setRoomSettings(undefined);
    }
  }, [roomsRepository, selectedItem?.id, selectedItem?.type]);

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

  return (
    <SettingsContext.Provider value={{ settings: roomSettings || settings, setSetting }}>
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, useSettings };
