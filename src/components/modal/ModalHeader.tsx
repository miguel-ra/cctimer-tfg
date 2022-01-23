import clsx from "clsx";
import { HTMLAttributes, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";

import Button from "components/button/Button";
import Typography from "components/typography/Typography";
import { useModal } from "store/modalContext";
import theme from "styles/theme";

type ModalHeaderProps = {
  label: string;
  children?: ReactNode;
  showClose?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const useStyles = createUseStyles({
  header: {
    display: "flex",
    padding: "1rem",
    alignItems: "center",
    justifyContent: "space-between",
    color: theme.palette.text.secondary,
    transition: theme.transition.generate(["color", "border"]),
    borderBottom: `${theme.shape.borderWitdh} solid ${theme.palette.border.primary}`,
    [theme.breakpoints.up("md")]: {
      padding: "1rem 1.5rem",
    },
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    "& > *": {
      marginLeft: "1.5rem",
    },
  },
});

function ModalHeader({ label, children, className, showClose = true, ...props }: ModalHeaderProps) {
  const classes = useStyles();
  const { closeModal } = useModal();
  const { t } = useTranslation();

  return (
    <div className={clsx(classes.header, className)} {...props}>
      <Typography variant="subtitle1">{label}</Typography>
      <div className={classes.buttons}>
        {children}
        {showClose && (
          <Button data-auto-focus variant="contained" onClick={closeModal}>
            {t("Close")}
          </Button>
        )}
      </div>
    </div>
  );
}

export default ModalHeader;
