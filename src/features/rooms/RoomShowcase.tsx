import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import Showcase from "components/showcase/Showcase";
import { useSelectedItem } from "features/router/routerViewModel";
import { puzzlesConfig } from "models/puzzles/Puzzle";
import { RoomId } from "models/rooms/Room";
import { SelectedItem, SelectedItemType } from "models/router/Router";
import useNavigate from "shared/hooks/useNavigate";

import { ReactComponent as PlusIcon } from "assets/icons/plus.svg";

import { useRooms } from "./roomsViewModel";

type RoomShowcaseProps = {
  className?: string;
};

function checkSelected(id: RoomId, selectedItem?: SelectedItem) {
  if (selectedItem?.type === SelectedItemType.Room && selectedItem.id === id) {
    return true;
  }
  return false;
}

function RoomShowcase({ className }: RoomShowcaseProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { selectedItem } = useSelectedItem();
  const { rooms, leaveRoom } = useRooms();

  const handleSelect = useCallback(
    (roomId: RoomId) => {
      navigate(`room/${roomId}`);
    },
    [navigate]
  );

  const handleDelete = useCallback(
    (roomId: RoomId) => {
      leaveRoom(roomId);
      if (selectedItem?.id === roomId) {
        navigate("/");
      }
    },
    [leaveRoom, navigate, selectedItem?.id]
  );

  return (
    <Showcase className={className} title={t("Rooms")}>
      {rooms.map((room) => {
        const { Icon } = puzzlesConfig[room.puzzleKey];
        return (
          <Showcase.Icon
            key={room.id}
            label={`${t("Room")}: ${room.id} (${room.nickname})`}
            Icon={Icon}
            onSelect={() => {
              handleSelect(room.id);
            }}
            onDelete={() => handleDelete(room.id)}
            isSelected={checkSelected(room.id, selectedItem)}
          />
        );
      })}
      <Showcase.Button
        label={t("Join room")}
        onClick={() => {
          navigate("room/join");
        }}
      >
        <PlusIcon />
      </Showcase.Button>
    </Showcase>
  );
}

export default RoomShowcase;
