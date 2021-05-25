import { ComponentType, lazy, LazyExoticComponent } from "react";
import { ScrambleImageProps } from "components/scramble/Scramble";
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
  | "square1"
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
  Image?: LazyExoticComponent<ComponentType<ScrambleImageProps>>;
};

export type PuzzlesData = {
  [key in PuzzleKey]: Puzzle;
};

export const puzzlesData: PuzzlesData = {
  cube2: {
    // t("2x2 Cube")
    label: "2x2 Cube",
    Icon: Cube2Icon,
    Image: lazy(() => import("components/scramble/cube2/Cube2Image")),
  },
  cube3: {
    // t("3x3 Cube")
    label: "3x3 Cube",
    Icon: Cube3Icon,
    Image: lazy(() => import("components/scramble/cube3/Cube3Image")),
  },
  cube4: {
    // t("4x4 Cube")
    label: "4x4 Cube",
    Icon: Cube4Icon,
    Image: lazy(() => import("components/scramble/cube4/Cube4Image")),
  },
  cube5: {
    // t("5x5 Cube")
    label: "5x5 Cube",
    Icon: Cube5Icon,
    Image: lazy(() => import("components/scramble/cube5/Cube5Image")),
  },
  cube6: {
    // t("6x6 Cube")
    label: "6x6 Cube",
    Icon: Cube6Icon,
    Image: lazy(() => import("components/scramble/cube6/Cube6Image")),
  },
  cube7: {
    // t("7x7 Cube")
    label: "7x7 Cube",
    Icon: Cube7Icon,
    Image: lazy(() => import("components/scramble/cube7/Cube7Image")),
  },
  cube8: {
    // t("8x8 Cube")
    label: "8x8 Cube",
    Icon: Cube8Icon,
    Image: lazy(() => import("components/scramble/cube8/Cube8Image")),
  },
  cube9: {
    // t("9x9 Cube")
    label: "9x9 Cube",
    Icon: Cube9Icon,
    Image: lazy(() => import("components/scramble/cube9/Cube9Image")),
  },
  cube10: {
    // t("10x10 Cube")
    label: "10x10 Cube",
    Icon: Cube10Icon,
    Image: lazy(() => import("components/scramble/cube10/Cube10Image")),
  },
  cube11: {
    // t("11x11 Cube")
    label: "11x11 Cube",
    Icon: Cube11Icon,
    Image: lazy(() => import("components/scramble/cube11/Cube11Image")),
  },
  clock: {
    // t("Rubik's clock")
    label: "Rubik's clock",
    Icon: ClockIcon,
    Image: lazy(() => import("components/scramble/clock/ClockImage")),
  },
  square1: {
    // t("Square-1")
    label: "Square-1",
    Icon: SquareIcon,
    Image: lazy(() => import("components/scramble/square1/Square1Image")),
  },
  skewb: {
    // t "Skewb")
    label: "Skewb",
    Icon: SkewbIcon,
    Image: lazy(() => import("components/scramble/skewb/SkewbImage")),
  },
  megaminx: {
    // t "Megaminx")
    label: "Megaminx",
    Icon: MegaminxIcon,
    Image: lazy(() => import("components/scramble/megaminx/MegaminxImage")),
  },
  gigaminx: {
    // t "Gigaminx")
    label: "Gigaminx",
    Icon: GigaminxIcon,
  },
  pyraminx: {
    // t "Pyraminx")
    label: "Pyraminx",
    Icon: PyraminxIcon,
    Image: lazy(() => import("components/scramble/pyraminx/PyraminxImage")),
  },
};
