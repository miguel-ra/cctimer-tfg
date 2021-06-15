import { ReactElement } from "react";
import clsx from "clsx";
import { Notification, NotificationId } from "store/notificationsContext";
import Portal from "components/portal/Portal";
import useStyles from "./NotificationsContainer.styles";

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
        {notifications.map(({ id, Component, visible }) => (
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
