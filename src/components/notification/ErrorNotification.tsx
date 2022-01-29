import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { ReactComponent as ErrorIcon } from "assets/icons/error.svg";

import Notification from "./Notification";
import { NotificationComponentProps } from "./NotificationsContainer";

type ErrorNotificationProps = {
  children: ReactNode;
} & NotificationComponentProps;

function ErrorNotification(props: ErrorNotificationProps) {
  const { t } = useTranslation();

  return <Notification title={t("Error")} Icon={ErrorIcon} adornmentColor="red" {...props} />;
}

export default ErrorNotification;
