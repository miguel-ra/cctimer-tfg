import { useTranslation } from "react-i18next";

import Button from "components/button/Button";
import ShowcaseDivider from "components/showcase/ShowcaseDivider";
import Tooltip from "components/tooltip/Tooltip";
import PuzzleShowcase from "features/puzzles/PuzzleShowcase";
import RoomShowcase from "features/rooms/RoomShowcase";
import SettingsModal from "features/settings/SettingsModal";
import { useModal } from "store/modalContext";

import { ReactComponent as SettingsIcon } from "assets/icons/settings.svg";

import styles from "./SideMenuCompact.module.scss";
import { useSideMenu } from "./sideMenuViewModel";

function SideMenuCompact() {
  const { t } = useTranslation();
  const { openModal } = useModal();
  const { disableConfig } = useSideMenu();

  return (
    <div className={styles.sideMenuCompact}>
      <PuzzleShowcase />
      <ShowcaseDivider />
      <RoomShowcase className={styles.expandArea} />
      {!disableConfig && (
        <>
          <ShowcaseDivider />
          <div className={styles.bottomArea}>
            <Tooltip label={t("Settings")}>
              <Button
                shape="square"
                aria-label={t("Settings")}
                onClick={() => {
                  openModal(<SettingsModal />);
                }}
              >
                <SettingsIcon />
              </Button>
            </Tooltip>
          </div>
        </>
      )}
    </div>
  );
}

export default SideMenuCompact;
