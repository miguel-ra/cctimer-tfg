import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import ErrorNotification from "components/notification/ErrorNotification";
import { roomPathname } from "features/router/pathnames";
import { useRoomsRepository } from "repositories/rooms/roomsRepository";
import useNavigate from "shared/hooks/useNavigate";
import { useNotifications } from "store/notificationsContext";

import { useRooms } from "./roomsViewModel";

function useCreateRoom() {
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const { addNotification } = useNotifications();
  const roomsRepository = useRoomsRepository();
  const navigate = useNavigate();

  const { refreshRooms } = useRooms();

  const createRoom = useCallback(
    async (nickname: string) => {
      setLoading(true);

      try {
        const room = await roomsRepository.create(nickname);
        refreshRooms();
        navigate(roomPathname.replace(":roomId", room.id));
      } catch (error) {
        setLoading(false);
        addNotification((props) => (
          <ErrorNotification {...props}>{t("Failed to start the room")}</ErrorNotification>
        ));
      }
    },
    [addNotification, navigate, refreshRooms, roomsRepository, t]
  );

  return { createRoom, loading };
}

export { useCreateRoom };
