import { useTranslation } from "react-i18next";
import { StatKey, PuzzleStat, statsConfig } from "models/stats/Stats";
import { statValueToString } from "models/stats/format/statValue";
import { useTimer } from "features/timer/timerViewModel";
import Box from "components/flexboxgrid/Box";
import Table from "components/table/Table";
import useStyles from "./Stats.styles";

type Stat = {
  key: string;
  name: string;
  current: string;
  best: string;
};

function Stats() {
  const { t } = useTranslation();
  const { puzzleStats } = useTimer();
  const classes = useStyles();

  if (!puzzleStats) {
    return (
      <Box width="100%" height="100%" padding="2rem" display="grid" placeContent="center">
        {t("Not enough data to compute stats.")}
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
