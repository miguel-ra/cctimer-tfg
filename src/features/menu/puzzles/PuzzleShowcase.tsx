import clsx from "clsx";
import { MouseEvent, useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import IconButton from "components/button/IconButton";
import Box from "components/flexboxgrid/Box";
import Tooltip from "components/tooltip/Tooltip";
import { useTimerSelectedItem } from "features/timer/timerViewModel";
import { PuzzleId, PuzzleKey, puzzlesConfig } from "models/puzzles/Puzzle";
import isTouchDevice from "shared/browser/isTouchDevice";
import { useModal } from "store/modalContext";
import { usePopover } from "store/popoverContext";

import { ReactComponent as DeleteIcon } from "assets/icons/delete.svg";
import { ReactComponent as PlusIcon } from "assets/icons/plus.svg";
import { ReactComponent as PuzzleBorder } from "assets/icons/puzzles/border.svg";

import ModalPuzzleSelector from "./ModalPuzzleSelector";
import PuzzleIconWrapper from "./PuzzleIconWrapper";
import useStyles from "./PuzzleShowcase.styles";
import { usePuzzle } from "./puzzleViewModel";

// TODO: Change this component to use event delegation

function PuzzleShowcase() {
  const navigate = useNavigate();
  const classes = useStyles();
  const { t } = useTranslation();
  const { openModal } = useModal();
  const { setPopover } = usePopover();
  const { selectedItem } = useTimerSelectedItem();
  const { puzzles, addPuzzle, deletePuzzle } = usePuzzle();
  const [showDeleteId, setShowDeleteId] = useState<number | null>(null);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const handleSelect = useCallback(
    (puzzleId: PuzzleId) => {
      if (!selectedItem?.id || puzzleId !== selectedItem.id) {
        navigate(`puzzle/${puzzleId}`);
      }
    },
    [navigate, selectedItem]
  );

  const handleDelete = useCallback(
    ({ puzzleId, puzzleKey, index, puzzles: puzzlesParam }) => {
      const nextSelectedPuzzle = puzzlesParam[(index + 1) % puzzlesParam.length];
      deletePuzzle(puzzleKey, puzzleId);
      navigate(`puzzle/${nextSelectedPuzzle[0].id}`);
      setPopover();
    },
    [deletePuzzle, navigate, setPopover]
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
      componentProps={{
        onBlur: () => {
          window.requestAnimationFrame(() => {
            const focusedElement = document.querySelector(":focus") as HTMLElement;
            const isPuzzleIcon = focusedElement?.dataset?.id || focusedElement?.dataset?.action;
            if (!isPuzzleIcon) {
              setShowDeleteId(null);
            }
          });
        },
      }}
    >
      {puzzles.map((puzzle, index) => {
        const { id: puzzleId, key: puzzleKey } = puzzle;
        const { label, Icon } = puzzlesConfig[puzzleKey];
        return (
          <Tooltip key={puzzleId} label={t(label)}>
            <PuzzleIconWrapper
              data-id={puzzleId}
              aria-label={t(label)}
              aria-expanded={puzzleId === selectedItem?.id}
              className={clsx(classes.puzzleWrapper, {
                selected: puzzleId === selectedItem?.id,
              })}
              timeoutId={timeoutId}
              showDeleteId={showDeleteId}
              setShowDeleteId={setShowDeleteId}
              onSelect={() => handleSelect(puzzle.id)}
              onDelete={() => handleDelete({ puzzleId, puzzleKey, index, puzzles })}
              onClick={(event: MouseEvent) => {
                const shouldDelete = !!(event.target as HTMLElement).closest<HTMLElement>(
                  '[data-action="delete"]'
                );
                const iconContainer = (event.target as HTMLElement).closest<HTMLElement>("[data-id]");
                if (iconContainer) {
                  if (shouldDelete) {
                    handleDelete({ puzzleId, index, puzzles });
                    return;
                  }
                  handleSelect(puzzle.id);
                }
              }}
            >
              <PuzzleBorder className={classes.puzzleBorder} />
              <Icon className={classes.puzzleIcon} />
              {puzzles.length > 1 &&
                (isTouchDevice()
                  ? showDeleteId === puzzleId || selectedItem?.id === puzzleId
                  : showDeleteId === puzzleId) && (
                  <DeleteIcon
                    tabIndex={0}
                    role="button"
                    data-action="delete"
                    aria-label={t("Delete")}
                    className={classes.puzzleDelete}
                  />
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
                      handleSelect(addedPuzzle.id);
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
