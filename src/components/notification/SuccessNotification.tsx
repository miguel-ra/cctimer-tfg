import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { ReactComponent as SuccessIcon } from "assets/icons/success.svg";

import Notification from "./Notification";
import { NotificationComponentProps } from "./NotificationsContainer";

type SuccessNotificationProps = {
  children: ReactNode;
} & NotificationComponentProps;

function SuccessNotification(props: SuccessNotificationProps) {
  const { t } = useTranslation();

  return <Notification title={t("Success")} Icon={SuccessIcon} adornmentColor="green" {...props} />;
}

export default SuccessNotification;
