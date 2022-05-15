import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import Showcase from "components/showcase/Showcase";
import { usePuzzles } from "features/puzzles/puzzlesViewModel";
import { useSelectedItem } from "features/timer/timerViewModel";
import { PuzzleId, PuzzleKey, puzzlesConfig, UserPuzzle } from "models/puzzles/Puzzle";
import { SelectedItem, SelectedItemType } from "models/router/Router";
import { mod } from "shared/format/number";
import useNavigate from "shared/hooks/useNavigate";
import { useModal } from "store/modalContext";
import { usePopover } from "store/popoverContext";

import { ReactComponent as PlusIcon } from "assets/icons/plus.svg";

import ModalPuzzleSelector from "./ModalPuzzleSelector";

type HandleDeleteOptions = {
  puzzleId: PuzzleId;
  puzzleKey: PuzzleKey;
  index: number;
  puzzles: UserPuzzle[];
};

function checkSelected(selectedItem: SelectedItem, id: PuzzleId) {
  if (selectedItem?.type === SelectedItemType.Puzzle && selectedItem.id === id) {
    return true;
  }
  return false;
}

function PuzzleShowcase() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { openModal } = useModal();
  const { setPopover } = usePopover();
  const { puzzles, addPuzzle, deletePuzzle } = usePuzzles();

  const { selectedItem } = useSelectedItem();

  const handleSelect = useCallback(
    (puzzleId: PuzzleId) => {
      if (!selectedItem?.id || puzzleId !== selectedItem.id) {
        navigate(`puzzle/${puzzleId}`);
      }
    },
    [navigate, selectedItem]
  );

  const handleDelete = useCallback(
    ({ puzzleId, puzzleKey, index, puzzles: puzzlesParam }: HandleDeleteOptions) => {
      const nextSelectedPuzzle = puzzlesParam[mod(index - 1, puzzlesParam.length)];
      deletePuzzle(puzzleKey, puzzleId);
      navigate(`puzzle/${nextSelectedPuzzle.id}`);
      setPopover();
    },
    [deletePuzzle, navigate, setPopover]
  );

  return (
    <Showcase title={t("Puzzles")}>
      {puzzles.map((puzzle, index) => {
        const { id: puzzleId, key: puzzleKey } = puzzle;
        const { label, Icon } = puzzlesConfig[puzzleKey];
        return (
          <Showcase.Icon
            key={puzzleId}
            label={t(label)}
            Icon={Icon}
            onSelect={() => handleSelect(puzzle.id)}
            onDelete={
              puzzles.length > 1 ? () => handleDelete({ puzzleId, puzzleKey, index, puzzles }) : undefined
            }
            isSelected={checkSelected(selectedItem, puzzleId)}
          />
        );
      })}
      <Showcase.Button
        label={t("Add puzzle")}
        onClick={() =>
          openModal(
            <ModalPuzzleSelector
              onAddPuzzle={async (key: PuzzleKey) => {
                const addedPuzzle = await addPuzzle(key);
                if (addedPuzzle) {
                  handleSelect(addedPuzzle.id);
                }
              }}
            />
          )
        }
      >
        <PlusIcon />
      </Showcase.Button>
    </Showcase>
  );
}

export default PuzzleShowcase;
