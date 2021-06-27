import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { SelectedItem, useMenu } from "store/menuContext";
import { useModal } from "store/modalContext";
import { usePopover } from "store/popoverContext";
import isTouchDevice from "shared/browser/isTouchDevice";
import { PuzzleKey, puzzlesConfig } from "models/puzzles/Puzzle";
import { ReactComponent as PuzzleBorder } from "assets/icons/puzzles/border.svg";
import { ReactComponent as DeleteIcon } from "assets/icons/delete.svg";
import { ReactComponent as PlusIcon } from "assets/icons/plus.svg";
import IconButton from "components/button/IconButton";
import Tooltip from "components/tooltip/Tooltip";
import Box from "components/flexboxgrid/Box";
import useStyles from "./PuzzleShowcase.styles";
import ModalPuzzleSelector from "./ModalPuzzleSelector";
import PuzzleIconWrapper from "./PuzzleIconWrapper";
import { usePuzzle } from "./puzzleViewModel";

function PuzzleShowcase() {
  const classes = useStyles();
  const { t } = useTranslation();
  const { openModal } = useModal();
  const { setPopover } = usePopover();
  const { selectedItem, setSelectedItem } = useMenu();
  const { puzzles, addPuzzle, deletePuzzle } = usePuzzle();
  const [showDeleteId, setShowDeleteId] = useState<number | null>(null);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!puzzles.length) {
      return;
    }
    if (selectedItem === null) {
      setSelectedItem({ type: "puzzle", ...puzzles[0] });
    }
  }, [puzzles, selectedItem, setSelectedItem]);

  const handleSelect = useCallback(
    (newSelectedItem: SelectedItem) => {
      if (!selectedItem?.id || newSelectedItem.id !== selectedItem.id) {
        setSelectedItem(newSelectedItem);
      }
    },
    [selectedItem?.id, setSelectedItem]
  );

  const handleDelete = useCallback(
    ({ id, key, index, puzzles: puzzlesParam }) => {
      const nextSelectedPuzzle = puzzlesParam[(index + 1) % puzzlesParam.length];
      deletePuzzle(key, id);
      setSelectedItem({ type: "puzzle", ...nextSelectedPuzzle });
      setPopover();
    },
    [deletePuzzle, setPopover, setSelectedItem]
  );

  return (
    <Box
      width="7.5rem"
      padding="2rem 1rem 2rem"
      alignItems="center"
      overflow="auto"
      flexWrap="nowrap"
      display="grid"
      gap="2rem"
      justifyContent="center"
    >
      {puzzles.map((puzzle, index) => {
        const { id, key } = puzzle;
        const { label, Icon } = puzzlesConfig[key];
        return (
          <Tooltip key={id} label={t(label)}>
            <PuzzleIconWrapper
              data-id={id}
              aria-label={t(label)}
              aria-expanded={id === selectedItem?.id}
              className={clsx(classes.puzzleWrapper, {
                selected: id === selectedItem?.id,
              })}
              timeoutId={timeoutId}
              showDeleteId={showDeleteId}
              setShowDeleteId={setShowDeleteId}
              onSelect={() => handleSelect({ type: "puzzle", ...puzzle })}
              onDelete={() => handleDelete({ id, key, index, puzzles })}
              onClick={(event: MouseEvent) => {
                const shouldDelete = !!(event.target as HTMLElement).closest<HTMLElement>(
                  '[data-action="delete"]'
                );
                const iconContainer = (event.target as HTMLElement).closest<HTMLElement>("[data-id]");
                if (iconContainer) {
                  if (shouldDelete) {
                    handleDelete({ id, key, index, puzzles });
                    return;
                  }
                  handleSelect({ type: "puzzle", ...puzzle });
                }
              }}
            >
              <PuzzleBorder className={classes.puzzleBorder} />
              <Icon className={classes.puzzleIcon} />
              {puzzles.length > 1 && (isTouchDevice() ? showDeleteId === id : showDeleteId !== null) && (
                <DeleteIcon data-action="delete" className={classes.puzzleDelete} />
              )}
            </PuzzleIconWrapper>
          </Tooltip>
        );
      })}
      <Box justifyContent="center" paddingBottom="1rem">
        <Tooltip label={t("Add puzzle")}>
          <IconButton
            size="small"
            aria-label={t("Add puzzle")}
            onClick={() =>
              openModal(
                <ModalPuzzleSelector
                  onAddPuzzle={async (key: PuzzleKey) => {
                    const addedPuzzle = await addPuzzle(key);
                    if (addedPuzzle) {
                      handleSelect({ type: "puzzle", ...addedPuzzle });
                    }
                  }}
                />
              )
            }
          >
            <PlusIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default PuzzleShowcase;
