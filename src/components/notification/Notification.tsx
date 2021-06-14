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
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    boxShadow: `0 0 0 ${theme.shape.borderWitdh} ${theme.palette.border.primary}`,
    opacity: 0.95,
    willChange: "opacity",
    transition: `box-shadow ${theme.transition.duration.colorMode} linear, background ${theme.transition.duration.colorMode} linear`,
    "@supports (backdrop-filter: blur(1px))": {
      opacity: 0.85,
    },
    // Safari support
    "@media not all and (min-resolution:.001dpcm)": {
      "@media": {
        opacity: 0.9,
      },
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
    position: "relative",
    zIndex: 1,
    borderLeft: `${theme.shape.borderWitdh} solid ${theme.palette.border.primary}`,
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
