import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import theme from "styles/theme";
import { useModal } from "store/modalContext";
import { ReactComponent as SettingsIcon } from "assets/icons/settings.svg";
import ModalSettings from "features/settings/ModalSettings";
import IconButton from "components/button/IconButton";
import Tooltip from "components/tooltip/Tooltip";
import Box from "components/flexboxgrid/Box";
import PuzzleShowcase from "./puzzles/PuzzleShowcase";

const useStyles = createUseStyles({
  sideMenu: {
    display: "flex",
    paddingBottom: "2rem",
    height: "100vh",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    transition: `background ${theme.transition.duration.colorMode} linear, border ${theme.transition.duration.colorMode} linear`,
    background: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.border.primary}`,
  },
});

function SideMenuCompact() {
  const classes = useStyles();
  const { t } = useTranslation();
  const { openModal } = useModal();

  return (
    <div className={classes.sideMenu}>
      <PuzzleShowcase />
      <Box
        flexDirection="column"
        paddingTop="2rem"
        borderTop={`1px solid ${theme.palette.border.primary}`}
        transition={`border ${theme.transition.duration.colorMode} linear`}
      >
        <Tooltip label={t("Settings")}>
          <IconButton
            onClick={() => {
              openModal(<ModalSettings />);
            }}
          >
            <SettingsIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </div>
  );
}

export default SideMenuCompact;
