import { useState } from "react";

import { RoomsRepository } from "models/rooms/RoomsRepository";

import RoomsRepositoryWebRTC from "./RoomsRepositoryWebRTC";

const roomsRepositoryWebRTC = new RoomsRepositoryWebRTC();

function useRoomsRepository() {
  const [roomsRepository] = useState<RoomsRepository>(roomsRepositoryWebRTC);

  return roomsRepository;
}

export { useRoomsRepository };
