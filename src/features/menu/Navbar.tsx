import { createUseStyles } from "react-jss";
import { useTranslation } from "react-i18next";
import { useColorMode } from "store/colorModeContext";
import theme from "styles/theme";
import Box from "components/flexboxgrid/Box";
import { LangKey } from "i18n/i18n";
// import Typography from "components/typography/Typography";

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
  const { toggleColorMode } = useColorMode();
  const { t, i18n } = useTranslation();

  return (
    <div className={classes.navbar}>
      {/* <Typography variant="h5">CCTimer.com</Typography> */}
      <Box alignItems="center">
        <Box paddingRight="1rem">
          <label>
            {t("Language")}:{" "}
            <select
              name="settings.language"
              onChange={(event) => {
                i18n.changeLanguage(event.target.value);
              }}
              defaultValue={i18n.language}
            >
              {languages.map(([key, label]) => (
                <option key={key} value={key}>
                  {t(label)}
                </option>
              ))}
            </select>
          </label>
        </Box>
        <button onClick={toggleColorMode}>{t("Light/Dark mode")}</button>
      </Box>
    </div>
  );
}

export default Navbar;
