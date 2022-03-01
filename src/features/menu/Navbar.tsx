import { useTranslation } from "react-i18next";

import Button from "components/button/Button";
import Box from "components/flexboxgrid/Box";
import Spacer from "components/spacer/Spacer";
import Typography from "components/typography/Typography";
import { loginPathname } from "features/app/pathnames";
import ColorModeToggle from "features/settings/ColorModeToggle";
import LanguageSelector from "features/settings/LanguageSelector";

import styles from "./Navbar.module.scss";

// TODO: A11y check if the user is navigating using the keyboard when space is pressed after changing the color or the language
// Also check what happen if you have the focus in the Times or Stats component (and there is scroll)

function Navbar() {
  const { t } = useTranslation();

  return (
    <div className={styles.navbar}>
      <Typography variant="h3" weight="regular">
        CCTimer.com
      </Typography>
      <Box alignItems="center">
        <LanguageSelector />
        <Spacer w={1} />
        <ColorModeToggle />
        <Spacer w={1} />
        <Button variant="outlined" size="small" to={loginPathname}>
          {t("Log in")}
        </Button>
      </Box>
    </div>
  );
}

export default Navbar;
