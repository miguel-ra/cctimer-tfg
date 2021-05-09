import { createUseStyles } from "react-jss";
import { useTranslation } from "react-i18next";
import { ReactComponent as SettingsIcon } from "assets/icons/settings.svg";
import ModalSettings from "features/settings/ModalSettings";
import { useModal } from "store/modalContext";
import Box from "components/flexboxgrid/Box";
import Button from "components/button/Button";
import Divider from "components/divider/Divider";
import Typography from "components/typography/Typography";
import PuzzleSelector from "./PuzzleSelector";
import theme from "styles/theme";

const useStyles = createUseStyles({
  root: {
    display: "flex",
    width: "100%",
    height: "100%",
    flexWrap: "wrap",
    placeContent: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    background: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.border.primary}`,
    transition: `background ${theme.transition.duration.colorMode} linear, border ${theme.transition.duration.colorMode} linear`,
  },
  navbar: {
    display: "flex",
    padding: "1rem",
    flexDirection: "column",
    justifyContent: "center",
    borderRight: `1px solid ${theme.palette.border.primary}`,
    transition: `border ${theme.transition.duration.colorMode} linear`,
  },
  menu: {
    flex: 1,
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    background: `${theme.palette.background.default}AA`,
    transition: `background ${theme.transition.duration.colorMode} linear`,
  },
});

function SideMenuExpanded() {
  const classes = useStyles();
  const { t } = useTranslation();
  const { openModal } = useModal();

  return (
    <div className={classes.root}>
      <Box width="100%" height="100%">
        <div className={classes.navbar}>
          <PuzzleSelector />
        </div>
        <div className={classes.menu}>
          <Box padding="1rem">
            <Typography variant="h5">CCTimer.com</Typography>
          </Box>
          <Divider />
          <Box padding="1rem" width="100%">
            <Button
              startIcon={SettingsIcon}
              onClick={() => openModal(<ModalSettings />)}
              fullWidth
            >
              {t("Settings")}
            </Button>
          </Box>
        </div>
      </Box>
    </div>
  );
}

export default SideMenuExpanded;
