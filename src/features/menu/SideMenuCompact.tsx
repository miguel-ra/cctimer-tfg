import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";

import IconButton from "components/button/IconButton";
import Box from "components/flexboxgrid/Box";
import Tooltip from "components/tooltip/Tooltip";
import PuzzleShowcase from "features/puzzles/PuzzleShowcase";
import ModalSettings from "features/settings/ModalSettings";
import { useModal } from "store/modalContext";
import theme from "styles/theme";

import SettingsIcon from "assets/icons/settings.svg?component";

const useStyles = createUseStyles({
  sideMenu: {
    display: "flex",
    paddingBottom: "2rem",
    height: "100vh",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    transition: `background ${theme.transition.duration.colorMode} linear, border ${theme.transition.duration.colorMode} linear`,
    background: theme.palette.background.secondary,
    borderRight: `${theme.shape.borderWitdh} solid ${theme.palette.border.primary}`,
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
        paddingTop="1.4rem"
        borderTop={`${theme.shape.borderWitdh} solid ${theme.palette.border.primary}`}
        transition={`border ${theme.transition.duration.colorMode} linear`}
      >
        <Tooltip label={t("Settings")}>
          <IconButton
            aria-label={t("Settings")}
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
