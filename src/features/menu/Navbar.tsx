import { createUseStyles } from "react-jss";
import theme from "styles/theme";
import Box from "components/flexboxgrid/Box";
import Typography from "components/typography/Typography";
import LanguageSelector from "features/settings/LanguageSelector";
import ColorModeToggle from "features/settings/ColorModeToggle";
import Button from "components/button/Button";
import { useNotifications } from "store/notificationsContext";
import Notification from "components/notification/Notification";
import { useState } from "react";

const useStyles = createUseStyles({
  navbar: {
    display: "flex",
    padding: "1rem 1.5rem",
    justifyContent: "space-between",
    transition: `background ${theme.transition.duration.colorMode} linear, border ${theme.transition.duration.colorMode} linear`,
    background: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.border.primary}`,
  },
});

function Navbar() {
  const classes = useStyles();
  const { addNotification } = useNotifications();
  const [index, setIndex] = useState(1);

  return (
    <div className={classes.navbar}>
      <Typography variant="h5">CCTimer.com</Typography>
      <Box alignItems="center">
        <Box paddingRight="1.5rem">
          <LanguageSelector />
        </Box>
        <ColorModeToggle />
        <Button
          style={{ marginLeft: "1.5rem" }}
          variant="contained"
          onClick={() => {
            setIndex(index + 1);
            addNotification(
              ({ hideNotification }) => (
                <Notification hideNotification={hideNotification}>
                  {index} - No se ha podido guardar el tiempo
                </Notification>
              )
              // { timeOut: 3000 }
            );
          }}
        >
          Agregar notificación
        </Button>
      </Box>
    </div>
  );
}

export default Navbar;
