import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useMenu } from "store/menuContext";
import { useModal } from "store/modalContext";
import { usePopover } from "store/popoverContext";
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
import PuzzleIconWrapper from "./PuzzleIconWrapper";
import { usePuzzleView } from "./puzzleViewModel";

function PuzzleShowcase() {
  const { t } = useTranslation();
  const { openModal } = useModal();
  const { setPopover } = usePopover();
  const { puzzles, addPuzzle, removePuzzle } = usePuzzleView();
  const { selectedItem, setSelectedItem } = useMenu();
  const [showRemoveId, setShowRemoveId] = useState<number | null>(null);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const classes = useStyles();

  useEffect(() => {
    if (!puzzles.length) {
      return;
    }
    if (selectedItem === null) {
      setSelectedItem({ type: "puzzle", ...puzzles[0] });
    }
  }, [puzzles, selectedItem, setSelectedItem]);

  const handleRemove = useCallback(
    ({ id, key, index, puzzles: puzzlesParam }) => {
      const nextSelectedPuzzle =
        puzzlesParam[(index + 1) % puzzlesParam.length];
      removePuzzle(key, id);
      setSelectedItem({ type: "puzzle", ...nextSelectedPuzzle });
      setPopover();
    },
    [removePuzzle, setPopover, setSelectedItem]
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
        const { label, Icon } = puzzlesData[key];
        return (
          <Tooltip key={id} label={t(label)}>
            <PuzzleIconWrapper
              data-id={id}
              className={clsx(classes.puzzleWrapper, {
                selected: id === selectedItem?.id,
              })}
              timeoutId={timeoutId}
              showRemoveId={showRemoveId}
              setShowRemoveId={setShowRemoveId}
              onSelect={() => setSelectedItem({ type: "puzzle", ...puzzle })}
              onRemove={() => handleRemove({ id, key, index, puzzles })}
              onClick={(event: MouseEvent) => {
                const shouldRemove = !!(
                  event.target as HTMLElement
                ).closest<HTMLElement>('[data-action="remove"]');
                const iconContainer = (
                  event.target as HTMLElement
                ).closest<HTMLElement>("[data-id]");
                if (iconContainer) {
                  if (shouldRemove) {
                    handleRemove({ id, key, index, puzzles });
                    return;
                  }
                  setSelectedItem({ type: "puzzle", ...puzzle });
                }
              }}
            >
              <PuzzleBorder className={classes.puzzleBorder} />
              <Icon className={classes.puzzleIcon} />
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
      <Box justifyContent="center">
        <Tooltip label={t("Add puzzle")}>
          <IconButton
            size="small"
            onClick={() =>
              openModal(
                <ModalPuzzleSelector
                  onAddPuzzle={async (key: PuzzleKey) => {
                    const addedPuzzle = await addPuzzle(key);
                    setSelectedItem({ type: "puzzle", ...addedPuzzle });
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
