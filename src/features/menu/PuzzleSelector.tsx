import { MouseEvent, useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { ReactComponent as PuzzleBorder } from "assets/icons/puzzles/border.svg";
import { ReactComponent as PlusIcon } from "assets/icons/plus.svg";
import { ReactComponent as Cube2Icon } from "assets/icons/puzzles/cube2.svg";
import { ReactComponent as Cube3Icon } from "assets/icons/puzzles/cube3.svg";
import { ReactComponent as Cube4Icon } from "assets/icons/puzzles/cube4.svg";
import { ReactComponent as MegaminxIcon } from "assets/icons/puzzles/megaminx.svg";
import { ReactComponent as ClockIcon } from "assets/icons/puzzles/clock.svg";
import IconButton from "components/button/IconButton";
import Tooltip from "components/tooltip/Tooltip";
import Box from "components/flexboxgrid/Box";
import useStyles from "./PuzzleSelector.styles";

const puzzles = [
  {
    key: "cube2",
    label: "Cube 2x2",
    Icon: Cube2Icon,
  },
  {
    key: "cube3",
    label: "Cube 3x3",
    Icon: Cube3Icon,
  },
  {
    key: "cube4",
    label: "Cube 4x4",
    Icon: Cube4Icon,
  },
  {
    key: "megaminx",
    label: "Megaminx",
    Icon: MegaminxIcon,
  },
  {
    key: "clock",
    label: "Rubik's clock",
    Icon: ClockIcon,
  },
];

function PuzzleSelector() {
  const { t } = useTranslation();
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
          onClick={(event: MouseEvent<HTMLButtonElement>) => {
            console.log(event.target);
          }}
        >
          <PlusIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default PuzzleSelector;
