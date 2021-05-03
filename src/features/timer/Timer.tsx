import { createUseStyles } from "react-jss";
import { useTranslation } from "react-i18next";
import Stopwatch from "features/stopwatch/Stopwatch";
import Box from "components/flexboxgrid/Box";
import theme from "styles/theme";

const useStyles = createUseStyles({
  sessionContainer: {
    display: "flex",
    minHeight: "30vh",
    background: theme.palette.background.paper,
    transition: `border ${theme.transition.duration.colorMode}ms linear, background ${theme.transition.duration.colorMode}ms linear`,
    borderTop: `1px solid ${theme.palette.border.primary}`,
  },
  stats: {
    flex: 1,
    display: "flex",
    flexWrap: "wrap",
    placeContent: "center",
    transition: `border ${theme.transition.duration.colorMode}ms linear, background ${theme.transition.duration.colorMode}ms linear`,
    border: `0 solid ${theme.palette.border.primary}`,
    borderWidth: "0 1px 0 1px",
  },
});

function Timer() {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Box flexDirection="column" flex={1}>
      <Box flex={1} placeContent="center">
        <Stopwatch />
      </Box>
      <div className={classes.sessionContainer}>
        <Box flex={1} placeContent="center">
          {t("Times")}
        </Box>
        <div className={classes.stats}>{t("Stats and grahps")}</div>
        <Box flex={1} placeContent="center">
          {t("Scramble image")}
        </Box>
      </div>
    </Box>
  );
}

export default Timer;
