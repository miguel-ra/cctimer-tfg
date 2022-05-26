import { Room, RoomId } from "./Room";

export interface RoomsRepository {
  create(nickname: string): Promise<Room>;
  join(nickname: string, roomId: RoomId): Promise<Room>;
}
