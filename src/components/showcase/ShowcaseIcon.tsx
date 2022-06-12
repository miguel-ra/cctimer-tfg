import clsx from "clsx";
import { FC, SVGProps } from "react";
import { useTranslation } from "react-i18next";

import Tooltip from "components/tooltip/Tooltip";

import { ReactComponent as DeleteIcon } from "assets/icons/delete.svg";
import { ReactComponent as PuzzleBorder } from "assets/icons/puzzles/border.svg";

import styles from "./ShowcaseIcon.module.scss";

type ShowcaseIconProps = {
  label: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
  onSelect: () => void;
  onDelete?: () => void;
  isSelected: boolean;
  canDelete?: boolean;
};

// TODO: Change component to use link instead of a button

function ShowcaseIcon({ label, Icon, isSelected, canDelete, ...props }: ShowcaseIconProps) {
  const { t } = useTranslation();

  return (
    <Tooltip label={label}>
      <div
        {...props}
        aria-label={label}
        aria-expanded={isSelected}
        tabIndex={0}
        role="button"
        className={clsx(styles.showcaseIcon, { [styles.selected]: isSelected })}
      >
        <PuzzleBorder className={styles.iconBorder} />
        <Icon className={styles.icon} />

        {canDelete && (
          <DeleteIcon
            tabIndex={0}
            role="button"
            data-action="delete"
            aria-label={t("Delete")}
            className={styles.iconDelete}
          />
        )}
      </div>
    </Tooltip>
  );
}

ShowcaseIcon.displayName = "ShowcaseIcon";

export default ShowcaseIcon;
