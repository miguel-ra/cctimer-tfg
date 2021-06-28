import { useTranslation } from "react-i18next";
import { StatKey, PuzzleStat, statsConfig } from "models/stats/Stats";
import { statValueToString } from "models/stats/format/statValue";
import { useTimer } from "features/timer/timerViewModel";
import Box from "components/flexboxgrid/Box";
import useStyles from "./Stats.styles";

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

  return (
    <div className={classes.root}>
      <table className={classes.stats}>
        <thead>
          <tr>
            <th>{t("Stats")}</th>
            <th>{t("Current")}</th>
            <th>{t("Best")}</th>
          </tr>
        </thead>
        <tbody>
          {(Object.entries(puzzleStats) as [StatKey, PuzzleStat][])
            .filter(([_, stat]) => stat?.current?.value)
            .map(([statKey, stat]) => {
              const statConfig = statsConfig[statKey as StatKey];
              if (!statConfig) {
                return null;
              }
              return (
                <tr key={statKey}>
                  <td>{t(statConfig.label)}</td>
                  <td>{statValueToString(stat.current?.value)}</td>
                  <td>{statValueToString(stat.best?.value)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Stats;
