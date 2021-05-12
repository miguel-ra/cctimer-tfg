import { useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { ReactComponent as PuzzleBorder } from "assets/icons/puzzles/border.svg";
import { ReactComponent as PlusIcon } from "assets/icons/plus.svg";
import { ReactComponent as Cube3Icon } from "assets/icons/puzzles/cube3.svg";
import IconButton from "components/button/IconButton";
import Tooltip from "components/tooltip/Tooltip";
import Box from "components/flexboxgrid/Box";
import useStyles from "./PuzzleShowcase.styles";
import { useModal } from "store/modalContext";
import ModalPuzzleSelector from "./ModalPuzzleSelector";

const puzzles = [
  {
    key: "cube3",
    label: "Cube 3x3",
    Icon: Cube3Icon,
  },
];

function PuzzleShowcase() {
  const { t } = useTranslation();
  const { openModal } = useModal();
  const [selectedPuzzle, setSelectedPuzzle] = useState(puzzles[0].key);
  const classes = useStyles();

  return (
    <Box
      width="5.5rem"
      flexWrap="wrap"
      flexDirection="column"
      gap="2rem"
      paddingTop="1rem"
      alignItems="center"
    >
      {puzzles.map(({ key, label, Icon }) => (
        <Tooltip key={key} label={label}>
          <div
            className={clsx(classes.puzzleIcon, {
              selected: key === selectedPuzzle,
            })}
            onClick={() => setSelectedPuzzle(key)}
          >
            <PuzzleBorder className={classes.puzzleBorder} />
            <Icon />
          </div>
        </Tooltip>
      ))}
      <Tooltip label={t("Add puzzle")}>
        <IconButton
          size="small"
          onClick={() => openModal(<ModalPuzzleSelector />)}
        >
          <PlusIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default PuzzleShowcase;
