import { useParams } from "react-router-dom";
import { useRecoilCallback } from "recoil";

import { SelectedItem, SelectedItemType } from "models/router/Router";
import { usePuzzlesRepository } from "repositories/puzzles/puzzlesRepository";
import { useRoomsRepository } from "repositories/rooms/roomsRepository";
import useNavigate from "shared/hooks/useNavigate";
import { generateUseState } from "shared/recoil";

const useSelectedItemState = generateUseState<SelectedItem | undefined>({
  key: "router.selectedItem",
  default: undefined,
});

function useSelectedItem() {
  const [selectedItem, setSelectedItem] = useSelectedItemState();
  const puzzlesRepository = usePuzzlesRepository();
  const roomsRepository = useRoomsRepository();
  const { puzzleId, roomId } = useParams();
  const navigate = useNavigate();

  const checkAndRedirect = useRecoilCallback(
    ({ snapshot, set }) =>
      async (itemType: SelectedItemType) => {
        const selectedItem = await snapshot.getPromise(useSelectedItemState.atom);

        if (itemType == SelectedItemType.Puzzle) {
          if (selectedItem?.type === itemType && selectedItem?.id === puzzleId) {
            return;
          }

          let userPuzzle;
          if (puzzleId) {
            userPuzzle = await puzzlesRepository.findById(puzzleId);
            if (!userPuzzle) {
              navigate("/", { replace: true });
              return;
            }
          } else {
            const userPuzzles = await puzzlesRepository.getAll();
            if (userPuzzles.length) {
              userPuzzle = userPuzzles[0];
            }
          }
          if (userPuzzle) {
            set(useSelectedItemState.atom, {
              ...userPuzzle,
              type: SelectedItemType.Puzzle,
            });
          }
        } else if (itemType == SelectedItemType.Room) {
          if (selectedItem?.type === itemType && selectedItem?.id === roomId) {
            return;
          }

          const userRoom = roomId && (await roomsRepository.findById(roomId));
          if (!userRoom) {
            navigate("/", { replace: true });
            return;
          } else {
            set(useSelectedItemState.atom, {
              id: userRoom.id,
              key: userRoom.puzzleKey,
              type: SelectedItemType.Room,
            });
          }
        }
      },

    [navigate, puzzleId, puzzlesRepository, roomId, roomsRepository]
  );

  const resetSelectedItem = useRecoilCallback(
    ({ set }) =>
      () => {
        set(useSelectedItemState.atom, undefined);
      },
    []
  );

  return { selectedItem, setSelectedItem, resetSelectedItem, checkAndRedirect };
}

export { useSelectedItemState, useSelectedItem };
