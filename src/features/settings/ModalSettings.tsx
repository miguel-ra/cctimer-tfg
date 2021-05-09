// TODO: Refactor inputs
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import theme from "styles/theme";
import { useModal } from "store/modalContext";
import { useSettings } from "store/settingsContext";
import { useColorMode } from "store/colorModeContext";
import Box from "components/flexboxgrid/Box";
import Button from "components/button/Button";
import CheckboxField from "components/field/CheckboxField";
import Field from "components/field/Field";

const useStyles = createUseStyles({
  modalSettings: {
    display: "flex",
    padding: "1rem",
    alignItems: "center",
    justifyContent: "space-between",
    transition: ` border ${theme.transition.duration.colorMode} linear`,
    borderBottom: `1px solid ${theme.palette.border.primary}`,
  },
});

function ModalSettings() {
  const classes = useStyles();
  const { closeModal } = useModal();
  const { settings, setSetting } = useSettings();
  const { colorMode, toggleColorMode } = useColorMode();
  const { t } = useTranslation();

  return (
    <>
      <div className={classes.modalSettings}>
        <span>{t("Settings")}</span>
        <Button variant="contained" onClick={closeModal}>
          {t("Close")}
        </Button>
      </div>
      <form>
        <Box flexDirection="column" padding="1rem">
          <Box justifyContent="space-between" paddingBottom="1rem">
            <label htmlFor="settings.inspection.enabled">{t("Theme")}</label>
            <Button type="button" onClick={toggleColorMode} variant="contained">
              {t(colorMode === "dark" ? "Light mode" : "Dark mode")}
            </Button>
          </Box>
          <Box paddingBottom="1rem">{t("Inspection behaviour")}</Box>
          <Box
            justifyContent="space-between"
            paddingLeft="1rem"
            paddingBottom="0.5rem"
          >
            <CheckboxField
              label={t("Enable")}
              name="settings.inspection.enabled"
              onChange={(checked: boolean) => {
                setSetting("inspection", "enabled", checked);
              }}
              checked={settings.inspection.enabled}
            />
          </Box>
          <Box
            justifyContent="space-between"
            paddingLeft="1rem"
            paddingBottom="0.5rem"
          >
            <Field
              type="number"
              label={t("Inspection time")}
              name="settings.inspection.time"
              onChange={(value: string) => {
                setSetting("inspection", "time", Number(value));
              }}
              value={settings.inspection.time}
            />
          </Box>
          {/* <Box justifyContent="space-between" paddingLeft="1rem">
            <label htmlFor="settings.inspection.autoStart">
              {t("Auto start after inspection ends")}
            </label>
            <input
              type="checkbox"
              id="settings.inspection.autoStart"
              checked={settings.inspection.autoStart}
              onChange={(event) => {
                setSetting("inspection", "autoStart", event.target.checked);
              }}
            />
          </Box>  */}
          <Box padding="1rem 0">{t("Timer behaviour")}</Box>
          {/* <Box justifyContent="space-between" paddingLeft="1rem">
            <label htmlFor="settings.timer.hideTime">
              {t("Hide time during solve")}
            </label>
            <input
              type="checkbox"
              id="settings.timer.hideTime"
              checked={settings.timer.hideTime}
              onChange={(event) => {
                setSetting("timer", "hideTime", event.target.checked);
              }}
            />
          </Box>
          <Box justifyContent="space-between" paddingLeft="1rem">
            <label htmlFor="settings.timer.hideUI">
              {t("Hide UI during solve")}
            </label>
            <input
              type="checkbox"
              id="settings.timer.hideUI"
              checked={settings.timer.hideUI}
              onChange={(event) => {
                setSetting("timer", "hideUI", event.target.checked);
              }}
            />
          </Box> */}
          <Box justifyContent="space-between" paddingLeft="1rem">
            <CheckboxField
              label={t("Hold to start")}
              name="settings.timer.holdToStart"
              onChange={(checked: boolean) => {
                setSetting("timer", "holdToStart", checked);
              }}
              checked={settings.timer.holdToStart}
            />
          </Box>
        </Box>
      </form>
    </>
  );
}

export default ModalSettings;
