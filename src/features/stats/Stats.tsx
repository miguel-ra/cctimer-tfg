import { useTranslation } from "react-i18next";

import Box from "components/flexboxgrid/Box";
import Table from "components/table/Table";
import { statValueToString } from "models/stats/format/statValue";
import { PuzzleStat, StatKey, statsConfig } from "models/stats/Stats";

import useStyles from "./Stats.styles";
import useStats from "./statsViewModel";

type Stat = {
  key: string;
  name: string;
  current: string;
  best: string;
};

type StatsProps = {
  mobile?: boolean;
};

function Stats({ mobile }: StatsProps) {
  const { t } = useTranslation();
  const { puzzleStats } = useStats();
  const classes = useStyles({ mobile });

  if (!puzzleStats) {
    return (
      <Box width="100%" height="100%" padding="2rem" display="grid" placeContent="center">
        {t("Not enough data to compute stats")}
      </Box>
    );
  }

  // TODO: Click on best/worst and highlight them in the list. Or maybe open the modal
  // TODO: Make Stats column full width
  const data: Stat[] = (Object.entries(puzzleStats) as [StatKey, PuzzleStat][])
    .filter(([_, stat]) => stat?.current?.value)
    .map(([statKey, stat]) => {
      const statConfig = statsConfig[statKey as StatKey];
      return {
        key: statKey,
        name: t(statConfig.label),
        current: statValueToString(stat.current?.value),
        best: statValueToString(stat.best?.value),
      };
    });

  return (
    <div className={classes.root}>
      <Table<Stat> data={data} className={classes.stats}>
        <Table.Column<Stat> prop="name" label={t("Stats")} width="50%" />
        <Table.Column<Stat> prop="current" label={t("Current")} />
        <Table.Column<Stat> prop="best" label={t("Best")} />
      </Table>
    </div>
  );
}

export default Stats;
