import { ReactElement } from "react";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import theme from "styles/theme";
import { Notification, NotificationId } from "store/notificationsContext";
import Portal from "components/portal/Portal";

type NotificationComponentProps = {
  hideNotification: () => void;
};

type NotificationComponent = (props: NotificationComponentProps) => ReactElement;

type NotificationsContainerProps = {
  containerId: string;
  notifications: Notification[];
  hideNotification: (notificationId: NotificationId) => void;
  removeNotification: (notificationId: NotificationId) => void;
};

const useStyles = createUseStyles({
  container: {
    zIndex: 1,
    position: "fixed",
    right: "1rem",
    bottom: "1rem",
    width: "100%",
    padding: "0 1rem",
    [theme.breakpoints.up("md")]: {
      width: "auto",
    },
  },
  notification: {
    opacity: 0,
    margin: "0.5rem 0",
    backdropFilter: "blur(1.5rem)",
    borderRadius: theme.shape.borderRadius,
    willChange: "opacity, max-height",
  },
  fadeIn: {
    maxHeight: 0,
    animation: "$reveal 0.5s ease-in-out forwards",
  },
  fadeOut: {
    animation: "$hide 0.5s ease-in-out forwards",
  },
  "@keyframes reveal": {
    from: {
      opacity: 0,
      maxHeight: 0,
    },
    to: {
      opacity: 1,
      maxHeight: "100vh",
    },
  },
  "@keyframes hide": {
    "0%": {
      opacity: 1,
      maxHeight: "100vh",
    },
    "25%": {
      maxHeight: "100vh",
    },
    "100%": {
      opacity: 0,
      maxHeight: 0,
    },
  },
});

function NotificationsContainer({
  notifications,
  containerId,
  hideNotification,
  removeNotification,
}: NotificationsContainerProps) {
  const classes = useStyles();

  if (!notifications.length) {
    return null;
  }

  return (
    <Portal containerId={containerId}>
      <div
        className={classes.container}
        onAnimationEnd={(event) => {
          const target = event.target as HTMLElement;
          if (!target.classList.contains(classes.fadeOut)) {
            return;
          }
          const notificationId = target.dataset.id as NotificationId;
          if (notificationId) {
            removeNotification(notificationId);
          }
        }}
      >
        {notifications.reverse().map(({ id, Component, visible }) => (
          <div
            key={id}
            data-id={id}
            role="alert"
            className={clsx(classes.notification, visible ? classes.fadeIn : classes.fadeOut)}
          >
            <Component hideNotification={() => hideNotification(id)} />
          </div>
        ))}
      </div>
    </Portal>
  );
}

export type { NotificationComponent, NotificationComponentProps };

export default NotificationsContainer;
