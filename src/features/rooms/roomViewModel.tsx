import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router-dom";

import ErrorNotification from "components/notification/ErrorNotification";
import { useSelectedItem } from "features/router/routerViewModel";
import { useScramble, useScrambleState } from "features/timer/timerViewModel";
import { RoomData, RoomDataType, RoomStatus } from "models/rooms/Room";
import { SelectedItemType } from "models/router/Router";
import { useRoomsRepository } from "repositories/rooms/roomsRepository";
import useNavigate from "shared/hooks/useNavigate";
import { useNotifications } from "store/notificationsContext";
import { useSettings } from "store/settingsContext";

import { useRooms } from "./roomsViewModel";

function useRoom() {
  const [isHost, setIsHost] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sendMessage, setSendMessage] = useState<(roomData: RoomData) => void>();
  const [users, setUsers] = useState<string[]>([]);
  const [nickname, setNickname] = useState("");
  const roomsRepository = useRoomsRepository();
  const { roomId: roomIdParam } = useParams();
  const { selectedItem } = useSelectedItem();
  const { refreshRooms } = useRooms();
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const { t } = useTranslation();
  const location = useLocation();
  const pathnameRef = useRef(location.pathname);
  const { refreshScramble, startWorker: scrambleStartWorker, stopWorker: scrambleStopWorker } = useScramble();
  const [globalScramble, setScramble] = useScrambleState();
  const { settings } = useSettings();
  const settingsRef = useRef(settings);

  const scrambleRef = useRef(globalScramble);

  const roomId = (selectedItem?.id || roomIdParam) as string;

  useEffect(() => {
    pathnameRef.current = location.pathname;
  }, [location]);

  useEffect(() => {
    settingsRef.current = settings;
    sendMessage?.({ type: RoomDataType.SetSettings, settings: settingsRef.current });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  useEffect(() => {
    if (!isHost) {
      return;
    }
    roomsRepository.findById(roomId).then((room) => {
      if (!room?.scramble?.state) {
        refreshScramble();
      }
    });
  }, [isHost, refreshScramble, roomId, roomsRepository]);

  useEffect(() => {
    if (!isHost) {
      return;
    }
    scrambleStartWorker();
    return () => {
      scrambleStopWorker();
    };
  }, [isHost, scrambleStartWorker, scrambleStopWorker]);

  useEffect(() => {
    if (selectedItem?.type !== SelectedItemType.Room || !globalScramble.state) {
      return;
    }
    scrambleRef.current = globalScramble;
    sendMessage?.({ type: RoomDataType.SetScramble, scramble: globalScramble });
  }, [globalScramble, roomId, selectedItem?.type, sendMessage]);

  // useEffect(() => {
  //   if (selectedItem?.type !== SelectedItemType.Room || !isHost) {
  //     return;
  //   }

  //   if (selectedItem.id && prevSelectedItemIdRef.current !== selectedItem.id) {
  //     refreshScramble();
  //     prevSelectedItemIdRef.current = selectedItem.id;
  //   }
  // }, [refreshScramble]);

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
      const { loading, data, isHost, users, scramble, settings } = roomMessage;
      setLoading(loading);
      setIsHost(isHost);
      setUsers(users || []);

      if (scramble?.state && scramble?.state !== scrambleRef.current.state) {
        setScramble(scramble);
      }

      if (data) {
        if (isHost) {
          if (data.type === RoomDataType.AskScramble) {
            roomSendMessage({ type: RoomDataType.SetScramble, scramble: scrambleRef.current });
          } else if (data.type === RoomDataType.AskSettings) {
            roomSendMessage({ type: RoomDataType.SetSettings, settings: settingsRef.current });
          }
        } else {
          if (!scramble) {
            roomSendMessage({ type: RoomDataType.AskScramble });
          }
          if (!settings) {
            roomSendMessage({ type: RoomDataType.AskSettings });
          }
        }

        if (data.type === RoomDataType.AskStatus) {
          // reply status
        } else if (data.type === RoomDataType.SetStatus) {
          // set status
        } else if (data.type === RoomDataType.SetSettings) {
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
  }, [addNotification, navigate, refreshRooms, roomsRepository, selectedItem, setScramble, t]);

  return { roomId, roomStatus, roomUsers: users, isHost, sendMessage, nickname };
}

export { useRoom };
