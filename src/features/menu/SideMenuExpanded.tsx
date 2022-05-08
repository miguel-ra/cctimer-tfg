import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";

import Button from "components/button/Button";
import Divider from "components/divider/Divider";
import Box from "components/flexboxgrid/Box";
import Typography from "components/typography/Typography";
import { useUser } from "features/app/appViewModel";
import { useAuth } from "features/auth/authViewModel";
import PuzzleShowcase from "features/puzzles/PuzzleShowcase";
import { loginPathname } from "features/router/pathnames";
import SettingsModal from "features/settings/SettingsModal";
import { useModal } from "store/modalContext";
import theme from "styles/theme";

import { ReactComponent as LoginIcon } from "assets/icons/login.svg";
import { ReactComponent as LogoutIcon } from "assets/icons/logout.svg";
import { ReactComponent as SettingsIcon } from "assets/icons/settings.svg";

const useStyles = createUseStyles({
  root: {
    display: "flex",
    width: "100%",
    height: "100%",
    flexWrap: "wrap",
    placeContent: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    background: theme.palette.background.secondary,
    borderRight: `${theme.shape.borderWitdh} solid ${theme.palette.border.primary}`,
    transition: `background ${theme.transition.duration.colorMode} linear, border ${theme.transition.duration.colorMode} linear`,
  },
  navbar: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    borderRight: `${theme.shape.borderWitdh} solid ${theme.palette.border.primary}`,
    transition: `border ${theme.transition.duration.colorMode} linear`,
  },
  menu: {
    flex: 1,
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    color: theme.palette.text.secondary,
    background: `${theme.palette.background.primary}AA`,
    transition: `background ${theme.transition.duration.colorMode} linear, color ${theme.transition.duration.colorMode} linear`,
  },
});

function SideMenuExpanded() {
  const classes = useStyles();
  const { t } = useTranslation();
  const { openModal } = useModal();
  const { user } = useUser();
  const { logout } = useAuth();

  return (
    <div className={classes.root}>
      <Box width="100%" height="100%">
        <div className={classes.navbar}>
          <PuzzleShowcase />
        </div>
        <div className={classes.menu}>
          <Box padding="0 1.2rem">
            <Typography variant="h3">CCTimer.com</Typography>
          </Box>
          <Divider />
          <Box padding="0 1.2rem" width="100%">
            <Button prefix={<SettingsIcon />} onClick={() => openModal(<SettingsModal />)} fullWidth>
              {t("Settings")}
            </Button>
          </Box>
          <Divider />
          <Box padding="0 1.2rem" width="100%">
            {user ? (
              <Button prefix={<LogoutIcon />} onClick={logout} fullWidth>
                {t("Log out")}
              </Button>
            ) : (
              <Button prefix={<LoginIcon />} to={loginPathname} fullWidth>
                {t("Log in")}
              </Button>
            )}
          </Box>
        </div>
      </Box>
    </div>
  );
}

export default SideMenuExpanded;
