import { useEffect, useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { ReactComponent as PuzzleBorder } from "assets/icons/puzzles/border.svg";
import { ReactComponent as PlusIcon } from "assets/icons/plus.svg";
import IconButton from "components/button/IconButton";
import Tooltip from "components/tooltip/Tooltip";
import Box from "components/flexboxgrid/Box";
import useStyles from "./PuzzleShowcase.styles";
import { useModal } from "store/modalContext";
import ModalPuzzleSelector from "./ModalPuzzleSelector";
import { usePuzzleView } from "./puzzleViewModel";
import { puzzlesData } from "models/puzzles/Puzzle";

function PuzzleShowcase() {
  const { t } = useTranslation();
  const { openModal } = useModal();
  const { puzzles, addPuzzle } = usePuzzleView();
  const [selectedPuzzle, setSelectedPuzzle] = useState<number>();
  const classes = useStyles();

  useEffect(() => {
    if (!selectedPuzzle && puzzles.length) {
      setSelectedPuzzle(puzzles[0].id);
    }
  }, [puzzles, selectedPuzzle]);

  return (
    <Box
      width="7.5rem"
      flexDirection="column"
      gap="2rem"
      padding="2rem 1rem 2rem"
      alignItems="center"
      overflow="auto"
      flexWrap="nowrap"
    >
      {puzzles.map(({ id, key }) => {
        const { label, Icon } = puzzlesData[key];
        return (
          <Tooltip key={id} label={label}>
            <div
              className={clsx(classes.puzzleIcon, {
                selected: id === selectedPuzzle,
              })}
              onClick={() => setSelectedPuzzle(id)}
            >
              <PuzzleBorder className={classes.puzzleBorder} />
              <Icon />
            </div>
          </Tooltip>
        );
      })}
      <Tooltip label={t("Add puzzle")}>
        <IconButton
          size="small"
          onClick={() =>
            openModal(<ModalPuzzleSelector onAddPuzzle={addPuzzle} />)
          }
        >
          <PlusIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default PuzzleShowcase;
