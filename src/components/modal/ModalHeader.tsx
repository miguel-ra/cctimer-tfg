import clsx from "clsx";
import { HTMLAttributes, ReactNode } from "react";
import { useTranslation } from "react-i18next";

import Button from "components/button/Button";
import Typography from "components/typography/Typography";
import { useModal } from "store/modalContext";

import styles from "./ModalHeader.module.scss";

type ModalHeaderProps = {
  label: string;
  children?: ReactNode;
  showClose?: boolean;
} & HTMLAttributes<HTMLDivElement>;

function ModalHeader({ label, children, className, showClose = true, ...props }: ModalHeaderProps) {
  const { closeModal } = useModal();
  const { t } = useTranslation();

  return (
    <div className={clsx(styles.header, className)} {...props}>
      <Typography variant="subtitle1">{label}</Typography>
      <div className={styles.buttons}>
        {children}
        {showClose && (
          <Button data-auto-focus variant="outlined" onClick={closeModal} size="small">
            {t("Close")}
          </Button>
        )}
      </div>
    </div>
  );
}

export default ModalHeader;
