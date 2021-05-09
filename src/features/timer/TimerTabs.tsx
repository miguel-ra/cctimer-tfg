import { createUseStyles } from "react-jss";
import { useTranslation } from "react-i18next";
import theme from "styles/theme";
import Stopwatch from "features/stopwatch/Stopwatch";
import Typography from "components/typography/Typography";
import Box from "components/flexboxgrid/Box";

const useStyles = createUseStyles({
  header: {
    display: "flex",
    padding: "1rem",
    transition: `background ${theme.transition.duration.colorMode} linear, border ${theme.transition.duration.colorMode} linear`,
    background: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.border.primary}`,
  },
  tabs: {
    display: "flex",
    background: theme.palette.background.paper,
    transition: `border ${theme.transition.duration.colorMode} linear, background ${theme.transition.duration.colorMode} linear`,
    borderTop: `1px solid ${theme.palette.border.primary}`,
  },
  stats: {
    flex: 1,
    display: "flex",
    flexWrap: "wrap",
    placeContent: "center",
    transition: `border ${theme.transition.duration.colorMode} linear, background ${theme.transition.duration.colorMode} linear`,
    border: `0 solid ${theme.palette.border.primary}`,
    borderWidth: "0 1px 0 1px",
  },
});

function TimerTabs() {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Box width="100%" height="100%" flexDirection="column">
      <div className={classes.header}>
        <Typography variant="subtitle1">3x3 Cube</Typography>
      </div>
      <Box flexDirection="column" flex={1}>
        <Box flex={1}>
          <Stopwatch />
        </Box>
        <div className={classes.tabs}>
          <Box flex={1} placeContent="center" padding="1rem">
            {t("Timer")}
          </Box>
          <div className={classes.stats}>{t("Session")}</div>
          <Box flex={1} placeContent="center" padding="1rem">
            {t("Stats")}
          </Box>
        </div>
      </Box>
    </Box>
  );
}

export default TimerTabs;
