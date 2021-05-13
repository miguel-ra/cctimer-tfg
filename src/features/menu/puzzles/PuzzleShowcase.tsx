import { MouseEvent, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useModal } from "store/modalContext";
import isTouchDevice from "shared/browser/isTouchDevice";
import { PuzzleKey, puzzlesData } from "models/puzzles/Puzzle";
import { ReactComponent as PuzzleBorder } from "assets/icons/puzzles/border.svg";
import { ReactComponent as RemoveIcon } from "assets/icons/remove.svg";
import { ReactComponent as PlusIcon } from "assets/icons/plus.svg";
import IconButton from "components/button/IconButton";
import Tooltip from "components/tooltip/Tooltip";
import Box from "components/flexboxgrid/Box";
import useStyles from "./PuzzleShowcase.styles";
import ModalPuzzleSelector from "./ModalPuzzleSelector";
import { usePuzzleView } from "./puzzleViewModel";
import { usePopover } from "store/popoverContext";
import PuzzleIconWrapper from "./PuzzleIconWrapper";

function PuzzleShowcase() {
  const { t } = useTranslation();
  const { openModal } = useModal();
  const { setPopover } = usePopover();
  const { puzzles, addPuzzle, removePuzzle } = usePuzzleView();
  const [selectedPuzzle, setSelectedPuzzle] = useState<number | null>(null);
  const [showRemoveId, setShowRemoveId] = useState<number | null>(null);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const classes = useStyles();

  useEffect(() => {
    if (!puzzles.length) {
      return;
    }
    if (selectedPuzzle === null) {
      setSelectedPuzzle(puzzles[0].id);
    }
  }, [puzzles, selectedPuzzle]);

  return (
    <Box
      width="7.5rem"
      flexDirection="column"
      padding="2rem 1rem 2rem"
      alignItems="center"
      overflow="auto"
      flexWrap="nowrap"
    >
      {puzzles.map(({ id, key }, index) => {
        const { label, Icon } = puzzlesData[key];
        return (
          <Tooltip key={id} label={label}>
            <PuzzleIconWrapper
              data-id={id}
              className={clsx(classes.puzzleIcon, {
                selected: id === selectedPuzzle,
              })}
              timeoutId={timeoutId}
              showRemoveId={showRemoveId}
              setShowRemoveId={setShowRemoveId}
              onClick={(event: MouseEvent) => {
                const shouldRemove = !!(event.target as HTMLElement).closest<HTMLElement>(
                  '[data-action="remove"]'
                );
                const iconContainer = (event.target as HTMLElement).closest<HTMLElement>(
                  "[data-id]"
                );
                if (iconContainer?.dataset?.id) {
                  const id = Number(iconContainer?.dataset?.id);
                  if (shouldRemove) {
                    removePuzzle(id);
                    setSelectedPuzzle(puzzles[(index + 1) % puzzles.length].id);
                    setPopover();
                    return;
                  }
                  setSelectedPuzzle(id);
                }
              }}
            >
              <PuzzleBorder className={classes.puzzleBorder} />
              <Icon />
              {puzzles.length > 1 &&
                (isTouchDevice()
                  ? showRemoveId === id
                  : showRemoveId !== null) && (
                  <RemoveIcon
                    data-action="remove"
                    className={classes.puzzleRemove}
                  />
                )}
            </PuzzleIconWrapper>
          </Tooltip>
        );
      })}
      <Tooltip label={t("Add puzzle")}>
        <IconButton
          size="small"
          onClick={() =>
            openModal(
              <ModalPuzzleSelector
                onAddPuzzle={async (key: PuzzleKey) => {
                  const addedId = await addPuzzle(key);
                  setSelectedPuzzle(addedId);
                }}
              />
            )
          }
        >
          <PlusIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default PuzzleShowcase;
