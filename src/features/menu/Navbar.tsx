import { createUseStyles } from "react-jss";
import theme from "styles/theme";
import LanguageSelector from "features/settings/LanguageSelector";
import ColorModeToggle from "features/settings/ColorModeToggle";
import Typography from "components/typography/Typography";
import Box from "components/flexboxgrid/Box";

const useStyles = createUseStyles({
  navbar: {
    display: "flex",
    padding: "1rem 1.5rem",
    justifyContent: "space-between",
    transition: `background ${theme.transition.duration.colorMode} linear, border ${theme.transition.duration.colorMode} linear`,
    background: theme.palette.background.paper,
    borderBottom: `${theme.shape.borderWitdh} solid ${theme.palette.border.primary}`,
  },
});

function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.navbar}>
      <Typography variant="h5">CCTimer.com</Typography>
      <Box alignItems="center">
        <Box paddingRight="1.5rem">
          <LanguageSelector />
        </Box>
        <ColorModeToggle />
      </Box>
    </div>
  );
}

export default Navbar;
