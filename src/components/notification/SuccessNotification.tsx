import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { ReactComponent as SuccessIcon } from "assets/icons/success.svg";

import Notification from "./Notification";
import { NotificationComponentProps } from "./NotificationsContainer";

type SuccessNotificationProps = {
  title?: string;
  children: ReactNode;
} & NotificationComponentProps;

function SuccessNotification({ title, ...props }: SuccessNotificationProps) {
  const { t } = useTranslation();

  return <Notification title={title || t("Success")} Icon={SuccessIcon} adornmentColor="green" {...props} />;
}

export default SuccessNotification;
