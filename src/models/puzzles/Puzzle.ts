import { ScrambleGenerator } from "cctimer-scrambles";
import ClockIcon from "components/icon/ClockIcon";
import Cube2Icon from "components/icon/Cube2Icon";
import Cube3Icon from "components/icon/Cube3Icon";
import Cube4Icon from "components/icon/Cube4Icon";
import Cube5Icon from "components/icon/Cube5Icon";
import Cube6Icon from "components/icon/Cube6Icon";
import Cube7Icon from "components/icon/Cube7Icon";
import Cube8Icon from "components/icon/Cube8Icon";
import Cube9Icon from "components/icon/Cube9Icon";
import Cube10Icon from "components/icon/Cube10Icon";
import Cube11Icon from "components/icon/Cube11Icon";
import SquareIcon from "components/icon/SquareIcon";
import SkewbIcon from "components/icon/SkewbIcon";
import MegaminxIcon from "components/icon/MegaminxIcon";
import GigaminxIcon from "components/icon/GigaminxIcon";
import PyraminxIcon from "components/icon/PyraminxIcon";

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
  loadScramble?: () => Promise<{ default: ScrambleGenerator }>;
};

export type PuzzlesData = {
  [key in PuzzleKey]: Puzzle;
};

export const puzzlesData: PuzzlesData = {
  cube2: {
    label: "2x2 Cube",
    Icon: Cube2Icon,
    loadScramble: () => import("cctimer-scrambles/cube2"),
  },
  cube3: {
    label: "Cube 3x3",
    Icon: Cube3Icon,
    loadScramble: () => import("components/scramble/cube3"),
  },
  cube4: {
    label: "4x4 Cube",
    Icon: Cube4Icon,
    loadScramble: () => import("cctimer-scrambles/cube4"),
  },
  cube5: {
    label: "5x5 Cube",
    Icon: Cube5Icon,
    loadScramble: () => import("cctimer-scrambles/cube5"),
  },
  cube6: {
    label: "6x6 Cube",
    Icon: Cube6Icon,
    loadScramble: () => import("cctimer-scrambles/cube6"),
  },
  cube7: {
    label: "7x7 Cube",
    Icon: Cube7Icon,
    loadScramble: () => import("cctimer-scrambles/cube7"),
  },
  cube8: {
    label: "8x8 Cube",
    Icon: Cube8Icon,
    loadScramble: () => import("cctimer-scrambles/cube8"),
  },
  cube9: {
    label: "9x9 Cube",
    Icon: Cube9Icon,
    loadScramble: () => import("cctimer-scrambles/cube9"),
  },
  cube10: {
    label: "10x10 Cube",
    Icon: Cube10Icon,
    loadScramble: () => import("cctimer-scrambles/cube10"),
  },
  cube11: {
    label: "11x11 Cube",
    Icon: Cube11Icon,
    loadScramble: () => import("cctimer-scrambles/cube11"),
  },
  clock: {
    label: "Rubik's clock",
    Icon: ClockIcon,
    loadScramble: () => import("cctimer-scrambles/clock"),
  },
  square: {
    label: "Square-1",
    Icon: SquareIcon,
    loadScramble: () => import("cctimer-scrambles/square"),
  },
  skewb: {
    label: "Skewb",
    Icon: SkewbIcon,
    loadScramble: () => import("cctimer-scrambles/skewb"),
  },
  megaminx: {
    label: "Megaminx",
    Icon: MegaminxIcon,
    loadScramble: () => import("cctimer-scrambles/megaminx"),
  },
  gigaminx: {
    label: "Gigaminx",
    Icon: GigaminxIcon,
    loadScramble: () => import("cctimer-scrambles/gigaminx"),
  },
  pyraminx: {
    label: "Pyraminx",
    Icon: PyraminxIcon,
    loadScramble: () => import("cctimer-scrambles/pyraminx"),
  },
};
