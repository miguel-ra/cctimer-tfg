import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import { useSettings } from "store/settingsContext";
import Field from "components/field/Field";
import Box from "components/flexboxgrid/Box";
import ModalBody from "components/modal/ModalBody";
import ModalHeader from "components/modal/ModalHeader";
import CheckboxField from "components/field/CheckboxField";
import LanguageSelector from "./LanguageSelector";
import ColorModeToggle from "./ColorModeToggle";

// t("Auto start after inspection ends")
// t("Hide time during solve")
// t("Hide UI during solve")

const useStyles = createUseStyles({
  content: {
    minWidth: "60vw",
  },
});

function ModalSettings() {
  const classes = useStyles();
  const { settings, setSetting } = useSettings();
  const { t } = useTranslation();

  return (
    <>
      <ModalHeader label={t("Settings")} />
      <ModalBody className={classes.content}>
        <form>
          <Box flexDirection="column" padding="1.5rem">
            <Box justifyContent="space-between" alignItems="center" paddingBottom="1rem">
              <label>{t("Theme")}</label>
              <ColorModeToggle />
            </Box>
            <Box paddingBottom="1rem">
              <LanguageSelector />
            </Box>
            <Box paddingBottom="1rem">{t("Inspection behaviour")}</Box>
            <Box justifyContent="space-between" paddingLeft="1rem" paddingBottom="0.5rem">
              <CheckboxField
                label={t("Enable")}
                name="settings.inspection.enabled"
                onChange={(checked: boolean) => {
                  setSetting("inspection", "enabled", checked);
                }}
                checked={settings.inspection.enabled}
              />
            </Box>
            <Box justifyContent="space-between" paddingLeft="1rem" paddingBottom="0.5rem">
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
      </ModalBody>
    </>
  );
}

export default ModalSettings;
