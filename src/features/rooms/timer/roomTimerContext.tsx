import { createContext, ReactNode, useContext } from "react";

import { RoomId } from "models/rooms/Room";

// import { Settings } from "models/settings/Settings";

type RoomTimerState = {
  //   settings: Settings;
  roomId: RoomId;
  users: string[];
};

type RoomTimerProviderProps = {
  //   settings: Settings;
  roomId: RoomId;
  users: string[];
  children: ReactNode;
};

const RoomTimerContext = createContext<RoomTimerState | null>(null);

function useRoomTimer() {
  const context = useContext(RoomTimerContext);

  if (!context) {
    throw new Error("useRoomTimer must be used within the RoomTimerContext");
  }
  return context;
}

function RoomTimerProvider({ roomId, users, children }: RoomTimerProviderProps) {
  return <RoomTimerContext.Provider value={{ roomId, users }}>{children}</RoomTimerContext.Provider>;
}

export { RoomTimerProvider, useRoomTimer };
