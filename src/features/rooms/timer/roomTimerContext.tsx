import { createContext, ReactNode, useContext } from "react";

import { RoomData, RoomId } from "models/rooms/Room";

// import { Settings } from "models/settings/Settings";

type RoomTimerState = {
  //   settings: Settings;
  roomId?: RoomId;
  users?: string[];
  isHost?: boolean;
  sendMessage?: (roomData: RoomData) => void;
  nickname?: string;
};

type RoomTimerProviderProps = {
  //   settings: Settings;
  roomId: RoomId;
  users: string[];
  isHost: boolean;
  sendMessage?: (roomData: RoomData) => void;
  nickname?: string;
  children: ReactNode;
};

const RoomTimerContext = createContext<RoomTimerState | null>(null);

function useRoomTimer() {
  const context = useContext(RoomTimerContext);

  if (!context) {
    return {} as RoomTimerState;
  }
  return context;
}

function RoomTimerProvider({
  roomId,
  users,
  isHost,
  sendMessage,
  nickname,
  children,
}: RoomTimerProviderProps) {
  return (
    <RoomTimerContext.Provider value={{ roomId, users, isHost, nickname, sendMessage }}>
      {children}
    </RoomTimerContext.Provider>
  );
}

export { RoomTimerProvider, useRoomTimer };
