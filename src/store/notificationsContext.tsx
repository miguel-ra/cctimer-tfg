import { createContext, lazy, ReactNode, Suspense, useCallback, useContext, useMemo, useState } from "react";
import uuid from "shared/uuid";
import { NotificationComponent } from "components/notification/NotificationsContainer";

type NotificationId = string;

type NotificationOptions = { timeOut?: number };

type Notification = {
  id: NotificationId;
  Component: NotificationComponent;
  visible: boolean;
};

type AddNotification = (Component: NotificationComponent, options?: NotificationOptions) => Notification;

type NotificationsState = {
  addNotification: AddNotification;
  hideNotification: (notificationId: NotificationId) => void;
};

type NotificationsProviderProps = {
  children: ReactNode;
};

const containerId = "root-notifications";
const NotificationsContainer = lazy(() => import("components/notification/NotificationsContainer"));

const NotificationsContext = createContext<NotificationsState | null>(null);

function useNotifications() {
  const context = useContext(NotificationsContext);

  if (!context) {
    throw new Error("useNotifications must be used within the NotificationsContext");
  }
  return context;
}

function NotificationsProvider({ children }: NotificationsProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const hideNotification = useCallback((notificationId: NotificationId) => {
    setNotifications((prevNotifications) => {
      const notificationIndex = prevNotifications.findIndex(
        (notification) => notification.id === notificationId
      );
      if (notificationIndex === -1) {
        return prevNotifications;
      }
      const newNotifications = [...prevNotifications];
      newNotifications[notificationIndex].visible = false;
      return newNotifications;
    });
  }, []);

  const addNotification = useCallback(
    (Component: NotificationComponent, options?: NotificationOptions) => {
      const id = uuid();
      const newNotification: Notification = {
        id,
        Component,
        visible: true,
      };
      setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
      if (options?.timeOut) {
        setTimeout(() => {
          hideNotification(id);
        }, options.timeOut);
      }
      return newNotification;
    },
    [hideNotification]
  );

  const removeNotification = useCallback((notificationId: NotificationId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== notificationId)
    );
  }, []);

  const state = useMemo(() => ({ addNotification, hideNotification }), [addNotification, hideNotification]);

  return (
    <NotificationsContext.Provider value={state}>
      <Suspense fallback={null}>
        <NotificationsContainer
          notifications={notifications}
          containerId={containerId}
          hideNotification={hideNotification}
          removeNotification={removeNotification}
        />
      </Suspense>
      {children}
    </NotificationsContext.Provider>
  );
}

export type { Notification, NotificationId, AddNotification };

export { NotificationsProvider, useNotifications };
