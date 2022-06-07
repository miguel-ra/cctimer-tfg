import { createContext, Dispatch, ReactNode, useContext } from "react";

import { RoomData, RoomId, UserStatus } from "models/rooms/Room";

import { LastType } from "../roomViewModel";

// import { Settings } from "models/settings/Settings";

type RoomTimerState = {
  //   settings: Settings;
  roomId?: RoomId;
  users?: string[];
  isHost?: boolean;
  sendMessage?: (roomData: RoomData) => void;
  nickname?: string;
  lastTime: LastType | null;
  setLastTime: Dispatch<React.SetStateAction<LastType | null>>;
  usersStatus: UserStatus;
};

type RoomTimerProviderProps = {
  //   settings: Settings;
  roomId: RoomId;
  users: string[];
  isHost: boolean;
  sendMessage?: (roomData: RoomData) => void;
  nickname?: string;
  lastTime: LastType | null;
  setLastTime: Dispatch<React.SetStateAction<LastType | null>>;
  usersStatus: UserStatus;
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
  lastTime,
  setLastTime,
  usersStatus,
  children,
}: RoomTimerProviderProps) {
  return (
    <RoomTimerContext.Provider
      value={{ roomId, users, isHost, nickname, sendMessage, lastTime, setLastTime, usersStatus }}
    >
      {children}
    </RoomTimerContext.Provider>
  );
}

export { RoomTimerProvider, useRoomTimer };
