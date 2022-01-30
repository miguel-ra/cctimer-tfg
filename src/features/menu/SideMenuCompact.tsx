import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";

import Button from "components/button/Button";
import Divider from "components/divider/Divider";
import Box from "components/flexboxgrid/Box";
import Tooltip from "components/tooltip/Tooltip";
import { loginPathname } from "features/app/pathnames";
import PuzzleShowcase from "features/puzzles/PuzzleShowcase";
import SettingsModal from "features/settings/SettingsModal";
import { useModal } from "store/modalContext";
import theme from "styles/theme";

import { ReactComponent as SettingsIcon } from "assets/icons/settings.svg";
import { ReactComponent as UserIcon } from "assets/icons/user.svg";

const useStyles = createUseStyles({
  sideMenu: {
    display: "flex",
    paddingBottom: "1.2rem",
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
      <Box flexDirection="column">
        <Tooltip label={t("Log in")}>
          <Button size="large" shape="square" aria-label={t("Log in")} to={loginPathname}>
            <UserIcon />
          </Button>
        </Tooltip>
        <Divider h={0.85} />
        <Tooltip label={t("Settings")}>
          <Button
            size="large"
            shape="square"
            aria-label={t("Settings")}
            onClick={() => {
              openModal(<SettingsModal />);
            }}
          >
            <SettingsIcon />
          </Button>
        </Tooltip>
      </Box>
    </div>
  );
}

export default SideMenuCompact;
