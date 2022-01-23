import { useTranslation } from "react-i18next";

import Button from "components/button/Button";
import { useColorMode } from "store/colorModeContext";

/*
  t("Light mode")
  t("Dark mode")
*/

function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { t } = useTranslation();

  return (
    <Button
      type="button"
      variant="contained"
      onClick={toggleColorMode}
      style={{ minWidth: 110, justifyContent: "center" }}
    >
      {t(colorMode === "dark" ? "Light mode" : "Dark mode")}
    </Button>
  );
}

export default ColorModeToggle;
