import { useTranslation } from "react-i18next";
import { StatKey, PuzzleStat, statsConfig } from "models/stats/Stats";
import { useTimer } from "features/timer/timerViewModel";
import useStyles from "./Stats.styles";

function Stats() {
  const { t } = useTranslation();
  const { puzzleStats } = useTimer();
  const classes = useStyles();

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
          {(Object.entries(puzzleStats) as [StatKey, PuzzleStat][]).map(([statKey, stat]) => {
            const statConfig = statsConfig[statKey as StatKey];
            if (!statConfig) {
              return null;
            }
            return (
              <tr key={statKey}>
                <td>{t(statConfig.label)}</td>
                <td>{statConfig.format(stat.current?.value)}</td>
                <td>{statConfig.format(stat.best?.value)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Stats;
