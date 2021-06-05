import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { createUseStyles } from "react-jss";
import { useTranslation } from "react-i18next";
import theme from "styles/theme";
import { useModal } from "store/modalContext";
import Button from "components/button/Button";
import Typography from "components/typography/Typography";

type ModalHeaderProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const useStyles = createUseStyles({
  header: {
    display: "flex",
    padding: "1rem",
    alignItems: "center",
    justifyContent: "space-between",
    transition: ` border ${theme.transition.duration.colorMode} linear`,
    borderBottom: `1px solid ${theme.palette.border.primary}`,
  },
});

function ModalHeader({ children, className, ...props }: ModalHeaderProps) {
  const classes = useStyles();
  const { closeModal } = useModal();
  const { t } = useTranslation();

  return (
    <div className={clsx(classes.header, className)} {...props}>
      <Typography variant="subtitle1">{children}</Typography>
      <Button variant="contained" onClick={closeModal}>
        {t("Close")}
      </Button>
    </div>
  );
}

export default ModalHeader;
