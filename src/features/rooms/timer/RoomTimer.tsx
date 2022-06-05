import { RoomId } from "models/rooms/Room";

import RoomTimerDesktop from "./desktop/RoomTimerDesktop";
import { RoomTimerProvider } from "./roomTimerContext";

type RoomTimerProps = {
  roomId: RoomId;
  users: string[];
};

function RoomTimer({ roomId, users }: RoomTimerProps) {
  return (
    <RoomTimerProvider roomId={roomId} users={users}>
      <RoomTimerDesktop />
    </RoomTimerProvider>
  );
}

export default RoomTimer;
