import { createUseStyles } from "react-jss";
import { useTranslation } from "react-i18next";
import { LangKey } from "i18n/i18n";
import theme from "styles/theme";
import { useColorMode } from "store/colorModeContext";
import Box from "components/flexboxgrid/Box";
import Typography from "components/typography/Typography";
import Button from "components/button/Button";
import SelectField from "components/field/SelectField";

const languages: Array<[LangKey, string]> = [
  ["en", "English"],
  ["es", "Spanish"],
  ["pr", "Portuguese"],
];

const useStyles = createUseStyles({
  navbar: {
    display: "flex",
    padding: "1rem 2rem",
    justifyContent: "space-between",
    transition: `background ${theme.transition.duration.colorMode}ms linear, border ${theme.transition.duration.colorMode}ms linear`,
    background: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.border.primary}`,
  },
});

function Navbar() {
  const classes = useStyles();
  const { colorMode, toggleColorMode } = useColorMode();
  const { t, i18n } = useTranslation();

  return (
    <div className={classes.navbar}>
      <Typography variant="h5">CCTimer.com</Typography>
      <Box alignItems="center">
        <Box paddingRight="1.5rem">
          <SelectField
            label={t("Language")}
            name="settings.language"
            onChange={(value: string) => {
              i18n.changeLanguage(value);
            }}
            value={i18n.language}
          >
            {languages.map(([key, label]) => (
              <option key={key} value={key}>
                {t(label)}
              </option>
            ))}
          </SelectField>
        </Box>
        <Button
          onClick={toggleColorMode}
          style={{ minWidth: 100, justifyContent: "center" }}
        >
          {t(colorMode === "dark" ? "Light mode" : "Dark mode")}
        </Button>
      </Box>
    </div>
  );
}

export default Navbar;
