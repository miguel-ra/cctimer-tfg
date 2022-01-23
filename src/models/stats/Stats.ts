import { PuzzleTimeValue, TimeId } from "models/times/Time";

import computeAverage from "./metrics/computeAverage";
import computeMean from "./metrics/computeMean";
import computeSingle from "./metrics/computeSingle";
import computeStandardDeviation from "./metrics/computeStandardDeviation";
import { filterDnf } from "./metrics/shared";

type StatKey =
  | "single"
  | "mo3"
  | "ao5"
  | "ao12"
  | "ao25"
  | "ao50"
  | "ao50"
  | "ao100"
  | "ao200"
  | "ao500"
  | "ao1000"
  | "mean"
  | "standarDeviation";

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
  [key in StatKey]?: PuzzleStat;
};

type StatsConfig = {
  [key in StatKey]: {
    label: string;
    compute: (timesValues: PuzzleTimeValue[]) => PuzzleStat;
  };
};

const statsConfig: StatsConfig = {
  single: {
    // t("Single")
    label: "Single",
    compute: computeSingle,
  },
  mo3: {
    // t("Mo3")
    label: "Mo3",
    compute: (timesValues: PuzzleTimeValue[]) => computeMean(timesValues, 3),
  },
  ao5: {
    // t("Ao5")
    label: "Ao5",
    compute: (timesValues: PuzzleTimeValue[]) => computeAverage(timesValues, 5),
  },
  ao12: {
    // t("Ao12")
    label: "Ao12",
    compute: (timesValues: PuzzleTimeValue[]) => computeAverage(timesValues, 12),
  },
  ao25: {
    // t("Ao25")
    label: "Ao25",
    compute: (timesValues: PuzzleTimeValue[]) => computeAverage(timesValues, 25),
  },
  ao50: {
    // t("Ao50")
    label: "Ao50",
    compute: (timesValues: PuzzleTimeValue[]) => computeAverage(timesValues, 50),
  },
  ao100: {
    // t("Ao100")
    label: "Ao100",
    compute: (timesValues: PuzzleTimeValue[]) => computeAverage(timesValues, 100),
  },
  ao200: {
    // t("Ao200")
    label: "Ao200",
    compute: (timesValues: PuzzleTimeValue[]) => computeAverage(timesValues, 200),
  },
  ao500: {
    // t("Ao500")
    label: "Ao500",
    compute: (timesValues: PuzzleTimeValue[]) => computeAverage(timesValues, 500),
  },
  ao1000: {
    // t("Ao1000")
    label: "Ao1000",
    compute: (timesValues: PuzzleTimeValue[]) => computeAverage(timesValues, 10000),
  },
  mean: {
    // t("Mean")
    label: "Mean",
    compute: (timesValues: PuzzleTimeValue[]) => {
      const nonDnfTimes = filterDnf(timesValues);
      return {
        current: computeMean(nonDnfTimes, nonDnfTimes.length).current,
      };
    },
  },
  standarDeviation: {
    // t("σ")
    label: "σ",
    compute: computeStandardDeviation,
  },
};
export type { StatKey, Stat, StatValue, PuzzleStat, PuzzleStats };

export { statsConfig };
