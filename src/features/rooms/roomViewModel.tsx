import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router-dom";

import ErrorNotification from "components/notification/ErrorNotification";
import { useSelectedItem } from "features/router/routerViewModel";
import { RoomStatus } from "models/rooms/Room";
import { SelectedItemType } from "models/router/Router";
import { useRoomsRepository } from "repositories/rooms/roomsRepository";
import useNavigate from "shared/hooks/useNavigate";
import { useNotifications } from "store/notificationsContext";

import { useRooms } from "./roomsViewModel";

function useRoom() {
  const [isHost, setIsHost] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<string[]>([]);
  const roomsRepository = useRoomsRepository();
  const { roomId } = useParams();
  const { selectedItem } = useSelectedItem();
  const { refreshRooms } = useRooms();
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const { t } = useTranslation();
  const location = useLocation();
  const pathnameRef = useRef(location.pathname);

  useEffect(() => {
    pathnameRef.current = location.pathname;
  }, [location]);

  const roomEmtpy = users.length === 0;

  const roomStatus: RoomStatus = useMemo(() => {
    return RoomStatus.Ready;

    if (loading) {
      return isHost ? RoomStatus.Creating : RoomStatus.Loading;
    }

    if (roomEmtpy) {
      return RoomStatus.WaitingUsers;
    }

    return RoomStatus.Ready;
  }, [isHost, loading, roomEmtpy]);

  useEffect(() => {
    if (!selectedItem?.id || selectedItem.type !== SelectedItemType.Room) {
      return;
    }

    const pathname = pathnameRef.current;

    const unsubscribe = roomsRepository.subscribe(selectedItem?.id, (roomMessage) => {
      setLoading(roomMessage.loading);
      setIsHost(roomMessage.isHost);
      setUsers(roomMessage?.users || []);

      if (roomMessage.error) {
        if (pathname === pathnameRef.current) {
          navigate("/", { replace: true });
        }
        roomsRepository.leave(selectedItem?.id);
        refreshRooms();
        addNotification((props) => (
          <ErrorNotification {...props}>
            {roomMessage.isHost ? t("Failed to create room") : t("Failed to open room")}
          </ErrorNotification>
        ));
      }
    });

    return unsubscribe;
  }, [addNotification, navigate, refreshRooms, roomsRepository, selectedItem?.id, selectedItem?.type, t]);

  return { roomId: selectedItem?.id || roomId, roomStatus, roomUsers: users };
}

export { useRoom };
