import { createUseStyles } from "react-jss";

import Box from "components/flexboxgrid/Box";
import Spacer from "components/spacer/Spacer";
import Typography from "components/typography/Typography";
import ColorModeToggle from "features/settings/ColorModeToggle";
import LanguageSelector from "features/settings/LanguageSelector";
import theme from "styles/theme";

const useStyles = createUseStyles({
  navbar: {
    display: "flex",
    padding: "1.2rem",
    justifyContent: "space-between",
    transition: theme.transition.generate(["background", "border", "color"]),
    background: theme.palette.background.secondary,
    borderBottom: `${theme.shape.borderWitdh} solid ${theme.palette.border.primary}`,
    color: theme.palette.text.secondary,
  },
});

// TODO: A11y check if the user is navigating using the keyboard when space is pressed after changing the color or the language
// Also check what happen if you have the focus in the Times or Stats component (and there is scroll)

function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.navbar}>
      <Typography variant="h3" weight="regular">
        CCTimer.com
      </Typography>
      <Box alignItems="center">
        <LanguageSelector />
        <Spacer w={1} />
        <ColorModeToggle />
      </Box>
    </div>
  );
}

export default Navbar;
