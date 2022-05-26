import { RoomId } from "models/rooms/Room";
import { generateUseState } from "shared/recoil";

type RoomsParticipants = {
  [key in RoomId]: {
    nickname: string;
  };
};

const useRoomsState = generateUseState<RoomId[]>({
  key: "rooms",
  default: [],
});

const useRoomParticipantsState = generateUseState<RoomsParticipants>({
  key: "rooms.participants",
  default: {},
});

// RoomState
//   nickname
//   roomId

function useRooms() {
  const [rooms] = useRoomsState();

  // Create room
  //   roomRepository.create => roomId
  //     Add offer firebase
  //     Add candidates to firebase
  //   Add room to state

  // Join room
  //   roomRepository.join
  //     Connect to host (offer, answer)
  //     Ask participants
  //     Create and send offers to each participants
  //     Wait answers
  //     Send candidates when there is updates
  //   Add room to state

  // onMessage
  //   roomRepository.suscribe
  //     - Ask participants => Reply participants
  //   Update state

  return { rooms };
}

export { useRooms };
