import { ReactComponent as Cube2Icon } from "assets/icons/puzzles/cube2.svg";
import { ReactComponent as Cube3Icon } from "assets/icons/puzzles/cube3.svg";
import { ReactComponent as Cube4Icon } from "assets/icons/puzzles/cube4.svg";
import { ReactComponent as Cube5Icon } from "assets/icons/puzzles/cube5.svg";
import { ReactComponent as Cube6Icon } from "assets/icons/puzzles/cube6.svg";
import { ReactComponent as Cube7Icon } from "assets/icons/puzzles/cube7.svg";
import { ReactComponent as Cube8Icon } from "assets/icons/puzzles/cube8.svg";
import { ReactComponent as Cube9Icon } from "assets/icons/puzzles/cube9.svg";
import { ReactComponent as Cube10Icon } from "assets/icons/puzzles/cube10.svg";
import { ReactComponent as Cube11Icon } from "assets/icons/puzzles/cube11.svg";
import { ReactComponent as ClockIcon } from "assets/icons/puzzles/clock.svg";
import { ReactComponent as SquareIcon } from "assets/icons/puzzles/square.svg";
import { ReactComponent as SkewbIcon } from "assets/icons/puzzles/skewb.svg";
import { ReactComponent as MegaminxIcon } from "assets/icons/puzzles/megaminx.svg";
import { ReactComponent as GigaminxIcon } from "assets/icons/puzzles/gigaminx.svg";
import { ReactComponent as PyraminxIcon } from "assets/icons/puzzles/pyraminx.svg";

export type PuzzleId = number;

export type PuzzleKey =
  | "skewb"
  | "clock"
  | "cube2"
  | "cube3"
  | "cube4"
  | "cube5"
  | "cube6"
  | "cube7"
  | "cube8"
  | "cube9"
  | "cube10"
  | "cube11"
  | "square"
  | "megaminx"
  | "pyraminx"
  | "gigaminx";

export type UserPuzzle = {
  id: PuzzleId;
  key: PuzzleKey;
};

export type Puzzle = {
  label: string;
  Icon: typeof Cube2Icon;
};

export type PuzzlesData = {
  [key in PuzzleKey]: Puzzle;
};

export const puzzlesData: PuzzlesData = {
  cube2: {
    label: "2x2 Cube",
    Icon: Cube2Icon,
  },
  cube3: {
    label: "Cube 3x3",
    Icon: Cube3Icon,
  },
  cube4: {
    label: "4x4 Cube",
    Icon: Cube4Icon,
  },
  cube5: {
    label: "5x5 Cube",
    Icon: Cube5Icon,
  },
  cube6: {
    label: "6x6 Cube",
    Icon: Cube6Icon,
  },
  cube7: {
    label: "7x7 Cube",
    Icon: Cube7Icon,
  },
  cube8: {
    label: "8x8 Cube",
    Icon: Cube8Icon,
  },
  cube9: {
    label: "9x9 Cube",
    Icon: Cube9Icon,
  },
  cube10: {
    label: "10x10 Cube",
    Icon: Cube10Icon,
  },
  cube11: {
    label: "11x11 Cube",
    Icon: Cube11Icon,
  },
  clock: {
    label: "Rubik's clock",
    Icon: ClockIcon,
  },
  square: {
    label: "Square-1",
    Icon: SquareIcon,
  },
  skewb: {
    label: "Skewb",
    Icon: SkewbIcon,
  },
  megaminx: {
    label: "Megaminx",
    Icon: MegaminxIcon,
  },
  gigaminx: {
    label: "Gigaminx",
    Icon: GigaminxIcon,
  },
  pyraminx: {
    label: "Pyraminx",
    Icon: PyraminxIcon,
  },
};
