import { PuzzleTimeValue, TimeId } from "models/times/Time";
import { statValueToString } from "./format/statValue";
import computeSingle from "./metrics/computeSingle";

type StatKey = "single";
// | "mo3"
// | "ao5"
// | "ao12"
// | "ao25"
// | "ao50"
// | "ao50"
// | "ao100"
// | "ao200"
// | "ao500"
// | "ao1000"
// | "mean"
// | "standarDeviation"

type StatValue = number;

type Stat = {
  value: StatValue;
  ids: TimeId[];
};

type PuzzleStat = {
  current?: Stat;
  best?: Stat;
};

type PuzzleStats = {
  [key in StatKey]: PuzzleStat;
};

type StatsConfig = {
  [key in StatKey]: {
    label: string;
    format: (value?: StatValue) => string;
    compute: (timesValues: PuzzleTimeValue[]) => PuzzleStat;
  };
};

const statsConfig: StatsConfig = {
  single: {
    // t("Single")
    label: "Single",
    format: statValueToString,
    compute: computeSingle,
  },
  // mo3: {
  //   // t("Mo3")
  //   label: "Mo3",
  // },
  // ao5: {
  //   // t("Ao5")
  //   label: "Ao5",
  // },
  // ao12: {
  //   // t("Ao12")
  //   label: "Ao12",
  // },
  // ao25: {
  //   // t("Ao25")
  //   label: "Ao25",
  // },
  // ao50: {
  //   // t("Ao50")
  //   label: "Ao50",
  // },
  // ao100: {
  //   // t("Ao100")
  //   label: "Ao100",
  // },
  // ao200: {
  //   // t("Ao200")
  //   label: "Ao200",
  // },
  // ao500: {
  //   // t("Ao500")
  //   label: "Ao500",
  // },
  // ao1000: {
  //   // t("Ao1000")
  //   label: "Ao1000",
  // },
  // mean: {
  //   // t("Mean")
  //   label: "Mean",
  // },
  // standarDeviation: {
  //   // t("Standard deviation")
  //   label: "Standard deviation",
  // },
};
export type { StatKey, Stat, StatValue, PuzzleStat, PuzzleStats };

export { statsConfig };
