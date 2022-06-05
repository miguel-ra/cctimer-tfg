import { RoomStatus } from "models/rooms/Room";

import RoomLobby from "./RoomLobby";
import { useRoom } from "./roomViewModel";
import RoomTimer from "./timer/RoomTimer";

function Room() {
  const { roomStatus, roomId, roomUsers } = useRoom();

  if (!roomId || roomStatus !== RoomStatus.Ready) {
    return <RoomLobby roomId={roomId} roomStatus={roomStatus} />;
  }

  return <RoomTimer roomId={roomId} users={roomUsers} />;
}

export default Room;
