import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";

import CheckboxField from "components/field_DEPRECATED/CheckboxField";
import FieldDeprecated from "components/field_DEPRECATED/Field";
import Box from "components/flexboxgrid/Box";
import Field from "components/form/Field";
import ModalBody from "components/modal/ModalBody";
import ModalHeader from "components/modal/ModalHeader";
import { useSettings } from "store/settingsContext";

import ColorModeToggle from "./ColorModeToggle";
import LanguageSelector from "./LanguageSelector";

// t("Auto start after inspection ends")
// t("Hide time during solve")
// t("Hide UI during solve")

const useStyles = createUseStyles({
  content: {
    minWidth: "60vw",
  },
});

function SettingsModal() {
  const classes = useStyles();
  const { settings, setSetting } = useSettings();
  const { t } = useTranslation();

  return (
    <>
      <ModalHeader label={t("Settings")} />
      <ModalBody className={classes.content}>
        <form>
          <Box flexDirection="column">
            <Box justifyContent="space-between" alignItems="center" paddingBottom="1.2rem">
              <label>{t("Theme")}</label>
              <ColorModeToggle />
            </Box>
            <Box paddingBottom="1.2rem">
              <Field name="settings.language" label={t("Language")}>
                <LanguageSelector />
              </Field>
            </Box>
            <Box paddingBottom="1.2rem">{t("Inspection behaviour")}</Box>
            <Box justifyContent="space-between" paddingLeft="1.2rem" paddingBottom="0.5rem">
              <CheckboxField
                label={t("Enable")}
                name="settings.inspection.enabled"
                onChange={(checked: boolean) => {
                  setSetting("inspection", "enabled", checked);
                }}
                checked={settings.inspection.enabled}
              />
            </Box>
            <Box justifyContent="space-between" paddingLeft="1.2rem" paddingBottom="0.5rem">
              <FieldDeprecated
                type="number"
                label={t("Inspection time")}
                name="settings.inspection.time"
                onChange={(value: string) => {
                  setSetting("inspection", "time", Number(value));
                }}
                value={settings.inspection.time}
              />
            </Box>
            {/* <Box justifyContent="space-between" paddingLeft="1.2rem">
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
            <Box padding="1.2rem 0">{t("Timer behaviour")}</Box>
            {/* <Box justifyContent="space-between" paddingLeft="1.2rem">
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
          <Box justifyContent="space-between" paddingLeft="1.2rem">
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
            <Box justifyContent="space-between" paddingLeft="1.2rem">
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

export default SettingsModal;
