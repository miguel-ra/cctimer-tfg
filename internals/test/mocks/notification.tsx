/* eslint-disable react/display-name */
import { ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

import { Notification } from "store/notificationsContext";

function TestNotification({ children }: { children: ReactNode }) {
  return <span>{children}</span>;
}

function generateNotification(text: string): Notification {
  return { id: uuidv4(), Component: () => <TestNotification>{text}</TestNotification>, visible: true };
}

function generateNotifications(texts: string[]): Notification[] {
  return texts.map(generateNotification);
}

export { generateNotification, generateNotifications };
