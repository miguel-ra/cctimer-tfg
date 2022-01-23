import { FunctionComponent, ReactNode, SVGProps } from "react";
import { useTranslation } from "react-i18next";

import Button from "components/button/Button";
import Typography from "components/typography/Typography";
import { PaletteColor } from "styles/colors";

import useStyles from "./Notification.styles";
import { NotificationComponentProps } from "./NotificationsContainer";

type NotificationIcon = FunctionComponent<SVGProps<SVGSVGElement> | { title?: string }>;

type NotificationProps = {
  title: string;
  children: ReactNode;
  Icon?: NotificationIcon;
  adornmentColor?: PaletteColor;
} & NotificationComponentProps;

function Notification({ title, Icon, children, hideNotification, adornmentColor }: NotificationProps) {
  const { t } = useTranslation();
  const classes = useStyles({ adornmentColor });

  return (
    <div className={classes.root}>
      {Icon && <Icon title={t("Icon notification")} className={classes.icon} />}
      <div className={classes.content}>
        <Typography variant="body1" weight="bold" as="h6" gutterBottom>
          {title}
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
