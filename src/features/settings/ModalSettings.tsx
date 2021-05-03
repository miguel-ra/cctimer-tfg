// TODO: Refactor inputs
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import theme from "styles/theme";
import { useModal } from "store/modalContext";
import { useSettings } from "store/settingsContext";
import { useColorMode } from "store/colorModeContext";
import Box from "components/flexboxgrid/Box";

const useStyles = createUseStyles({
  modalSettings: {
    display: "flex",
    padding: "1rem",
    alignItems: "center",
    justifyContent: "space-between",
    transition: ` border ${theme.transition.duration.colorMode}ms linear`,
    borderBottom: `1px solid ${theme.palette.border.primary}`,
  },
});

function ModalSettings() {
  const classes = useStyles();
  const { closeModal } = useModal();
  const { settings, setSetting } = useSettings();
  const { toggleColorMode } = useColorMode();
  const { t } = useTranslation();

  return (
    <>
      <div className={classes.modalSettings}>
        <span>{t("Settings")}</span>
        <button onClick={closeModal}>{t("Close")}</button>
      </div>
      <form>
        <Box flexDirection="column" padding="1rem">
          <Box justifyContent="space-between" paddingBottom="1rem">
            <label htmlFor="settings.inspection.enabled">{t("Theme")}</label>
            <button type="button" onClick={toggleColorMode}>
              {t("Light/Dark mode")}
            </button>
          </Box>
          <Box paddingBottom="1rem">{t("Inspection behaviour")}</Box>
          <Box justifyContent="space-between" paddingLeft="1rem">
            <label htmlFor="settings.inspection.enabled">{t("Enable")}</label>
            <input
              type="checkbox"
              id="settings.inspection.enabled"
              checked={settings.inspection.enabled}
              onChange={(event) => {
                setSetting("inspection", "enabled", event.target.checked);
              }}
            />
          </Box>
          <Box justifyContent="space-between" paddingLeft="1rem">
            <label htmlFor="settings.inspection.time">
              {t("Inspection time")}
            </label>
            <input
              type="number"
              id="settings.inspection.time"
              style={{ marginRight: 2, width: "20%" }}
              value={settings.inspection.time}
              onChange={(event) => {
                setSetting("inspection", "time", Number(event.target.value));
              }}
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
            <label htmlFor="settings.timer.holdToStart">
              {t("Hold to start")}
            </label>
            <input
              type="checkbox"
              id="settings.timer.holdToStart"
              checked={settings.timer.holdToStart}
              onChange={(event) => {
                setSetting("timer", "holdToStart", event.target.checked);
              }}
            />
          </Box>
        </Box>
      </form>
    </>
  );
}

export default ModalSettings;
