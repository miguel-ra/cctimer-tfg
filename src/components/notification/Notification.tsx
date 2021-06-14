import { ReactNode } from "react";
import { createUseStyles } from "react-jss";
import { useTranslation } from "react-i18next";
import theme from "styles/theme";
import Button from "components/button/Button";
import Typography from "components/typography/Typography";
import { NotificationComponentProps } from "./NotificationsContainer";

type NotificationProps = {
  children: ReactNode;
} & NotificationComponentProps;

const useStyles = createUseStyles({
  root: {
    display: "flex",
    position: "relative",
    minHeight: "3rem",
    border: `1px solid ${theme.palette.border.primary}`,
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    opacity: 0.95,
    willChange: "opacity",
    transition: `border ${theme.transition.duration.colorMode} linear, background ${theme.transition.duration.colorMode} linear`,
    "@supports (backdrop-filter: blur(1px))": {
      opacity: 0.85,
    },
  },
  content: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    marginRight: "1.5rem",
    padding: "1rem 1.5rem",
  },
  buttons: {
    borderLeft: `1px solid ${theme.palette.border.primary}`,
    transition: `border ${theme.transition.duration.colorMode} linear`,
    display: "flex",
    flexDirection: "column",
    "& > *": {
      flex: 1,
    },
  },
});

function Notification({ children, hideNotification }: NotificationProps) {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography variant="body1" weight="bold" gutterBottom>
          Error
        </Typography>
        <Typography variant="body2">{children}</Typography>
      </div>
      <div className={classes.buttons}>
        <Button onClick={hideNotification}>{t("Close")}</Button>
      </div>
    </div>
  );
}

export type { NotificationProps };

export default Notification;
