import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import ErrorNotification from "components/notification/ErrorNotification";
import { Room, RoomId } from "models/rooms/Room";
import { useRoomsRepository } from "repositories/rooms/roomsRepository";
import { generateUseState } from "shared/recoil";
import { useNotifications } from "store/notificationsContext";

const useRoomsState = generateUseState<Room[]>({
  key: "rooms",
  default: [],
});

function useRooms() {
  const [rooms, setRooms] = useRoomsState();
  const roomsRepository = useRoomsRepository();
  const { addNotification } = useNotifications();
  const { t } = useTranslation();

  const refreshRooms = useCallback(async () => {
    try {
      const udpatedRooms = await roomsRepository.getAll();
      setRooms(udpatedRooms);
    } catch (error) {
      setRooms([]);
    }
  }, [roomsRepository, setRooms]);

  useEffect(() => {
    refreshRooms();
  }, [refreshRooms]);

  const leaveRoom = useCallback(
    async (roomId: RoomId): Promise<void> => {
      try {
        await roomsRepository.leave(roomId);
        refreshRooms();
      } catch (error) {
        addNotification((props) => (
          <ErrorNotification {...props}>{t("Failed to leave the room")}</ErrorNotification>
        ));
      }
    },
    [addNotification, refreshRooms, roomsRepository, t]
  );

  return { refreshRooms, rooms, leaveRoom };
}

export { useRooms, useRoomsState };
