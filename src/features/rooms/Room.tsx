import { RoomStatus } from "models/rooms/Room";

import RoomLobby from "./RoomLobby";
import { useRoom } from "./roomViewModel";
import RoomTimer from "./timer/RoomTimer";
import { RoomTimerProvider } from "./timer/roomTimerContext";

function Room() {
  const { roomStatus, roomId, roomUsers, isHost, sendMessage, nickname } = useRoom();

  if (!roomId || roomStatus !== RoomStatus.Ready) {
    return <RoomLobby roomId={roomId} roomStatus={roomStatus} />;
  }

  return (
    <RoomTimerProvider
      roomId={roomId}
      users={roomUsers}
      sendMessage={sendMessage}
      isHost={isHost}
      nickname={nickname}
    >
      <RoomTimer />
    </RoomTimerProvider>
  );
}

export default Room;
