import { Room, RoomId, RoomMessage } from "./Room";

export interface RoomsRepository {
  getAll(): Promise<Room[]>;
  findById(roomId: RoomId): Promise<Room | undefined>;
  create(nickname: string): Promise<Room>;
  join(nickname: string, roomId: RoomId): Promise<Room>;
  leave(roomId: RoomId): Promise<void>;
  sendMesasge(roomId: RoomId, message?: any): void;
  subscribe(roomId: RoomId, callback: (roomMessage: RoomMessage) => void): void;
}
