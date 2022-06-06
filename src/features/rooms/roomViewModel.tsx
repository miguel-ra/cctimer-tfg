import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router-dom";

import ErrorNotification from "components/notification/ErrorNotification";
import { useSelectedItem } from "features/router/routerViewModel";
import { RoomData, RoomDataType, RoomStatus } from "models/rooms/Room";
import { SelectedItemType } from "models/router/Router";
import { useRoomsRepository } from "repositories/rooms/roomsRepository";
import useNavigate from "shared/hooks/useNavigate";
import { useNotifications } from "store/notificationsContext";

import { useRooms } from "./roomsViewModel";

function useRoom() {
  const [isHost, setIsHost] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sendMessage, setSendMessage] = useState<(roomData: RoomData) => void>();
  const [users, setUsers] = useState<string[]>([]);
  const [nickname, setNickname] = useState("");
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

    setNickname(selectedItem.nickname);

    const pathname = pathnameRef.current;
    roomsRepository.sendMesasge(selectedItem?.id, { type: RoomDataType.AskScramble });

    const roomSendMessage = (roomData: RoomData) => roomsRepository.sendMesasge(selectedItem.id, roomData);
    setSendMessage(() => roomSendMessage);

    const unsubscribe = roomsRepository.subscribe(selectedItem?.id, (roomMessage) => {
      const { loading, data, isHost, users } = roomMessage;
      setLoading(loading);
      setIsHost(isHost);
      setUsers(users || []);

      if (data) {
        const messageType = data.type;

        if (isHost) {
          if (messageType === RoomDataType.AskScramble) {
            // reply scrabmle
          } else if (messageType === RoomDataType.AskSettings) {
            // reply settings
          }
        } else {
          // No scramble? ask
          // No settings? ask
        }

        if (messageType === RoomDataType.AskStatus) {
          // reply status
        } else if (messageType === RoomDataType.SetStatus) {
          // set status
        } else if (messageType === RoomDataType.SetScramble) {
          // set scramble
        } else if (messageType === RoomDataType.SetSettings) {
          // set settings
        }
      }

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
  }, [addNotification, navigate, refreshRooms, roomsRepository, selectedItem, t]);

  return { roomId: selectedItem?.id || roomId, roomStatus, roomUsers: users, isHost, sendMessage, nickname };
}

export { useRoom };
