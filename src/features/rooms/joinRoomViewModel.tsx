import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import ErrorNotification from "components/notification/ErrorNotification";
import { roomPathname } from "features/router/pathnames";
import AlreadyInRoomError from "models/rooms/errors/AlreadyInRoomError";
import NicknameInUseError from "models/rooms/errors/NicknameInUseError";
import { RoomId } from "models/rooms/Room";
import { useRoomsRepository } from "repositories/rooms/roomsRepository";
import useNavigate from "shared/hooks/useNavigate";
import { useNotifications } from "store/notificationsContext";

import { useRooms } from "./roomsViewModel";

type ViewErrors = {
  nickname?: string;
  code?: string;
};

function useJoinRoom() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ViewErrors>({});
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { addNotification } = useNotifications();
  const roomsRepository = useRoomsRepository();

  const { refreshRooms } = useRooms();

  const joinRoom = useCallback(
    async (nickname: string, roomId: RoomId) => {
      setLoading(true);

      try {
        const room = await roomsRepository.join(nickname, roomId);
        refreshRooms();
        navigate(roomPathname.replace(":roomId", room.id));
      } catch (error) {
        setLoading(false);
        if (error.constructor === NicknameInUseError) {
          setErrors({ nickname: t("Nickname already in use") });
        } else if (error.constructor === AlreadyInRoomError) {
          addNotification((props) => (
            <ErrorNotification {...props}>{t("You're already in this room")}</ErrorNotification>
          ));
        } else {
          addNotification((props) => (
            <ErrorNotification {...props}>{t("Failed to join room")}</ErrorNotification>
          ));
        }
      }
    },
    [addNotification, navigate, refreshRooms, roomsRepository, t]
  );

  return { joinRoom, errors, loading };
}

export type { ViewErrors };
export { useJoinRoom };
