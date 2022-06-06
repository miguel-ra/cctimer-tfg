import { useEffect, useState } from "react";

import { useSelectedItemState } from "features/router/routerViewModel";
import { SelectedItemType } from "models/router/Router";
import { useRoomsRepository } from "repositories/rooms/roomsRepository";

function useSideMenu() {
  const [disableConfig, setDisableConfig] = useState(false);
  const roomsRepository = useRoomsRepository();
  const [selectedItem] = useSelectedItemState();

  useEffect(() => {
    if (selectedItem?.type === SelectedItemType.Room) {
      roomsRepository.findById(selectedItem.id).then((room) => {
        setDisableConfig(!room?.isHost);
      });
    } else {
      setDisableConfig(false);
    }
  }, [roomsRepository, selectedItem?.id, selectedItem?.type]);

  return { disableConfig };
}

export { useSideMenu };
