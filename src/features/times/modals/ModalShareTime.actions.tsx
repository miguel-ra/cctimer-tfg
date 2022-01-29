import { TFunction } from "i18next";
import { FunctionComponent, MutableRefObject, SVGProps } from "react";

import ErrorNotification from "components/notification/ErrorNotification";
import SuccessNotification from "components/notification/SuccessNotification";
import { AddNotification } from "store/notificationsContext";

import CopyIcon from "assets/icons/copy.svg?component";
import FacebookIcon from "assets/icons/facebook.svg?component";
import TelegramIcon from "assets/icons/telegram.svg?component";
import TwitterIcon from "assets/icons/twitter.svg?component";
import WhatsappIcon from "assets/icons/whatsapp.svg?component";

type ShareActionData = {
  shareText: string;
  shareTextRef: MutableRefObject<HTMLDivElement | null>;
  addNotification: AddNotification;
  t: TFunction;
};

type ShareAction = {
  key: string;
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  label: string;
  color?: string;
  callback: (data: ShareActionData) => void;
};

const shareActions: ShareAction[] = [
  {
    key: "copy",
    Icon: CopyIcon,
    label: "Copy",
    callback: ({ shareTextRef, addNotification, t }) => {
      if (shareTextRef.current) {
        shareTextRef.current.focus();
        document.execCommand("selectAll", false);
        document.execCommand("copy");
        shareTextRef.current.blur();
        addNotification(
          (props) => (
            <SuccessNotification {...props}>
              {t("Text copied to clipboard")}
            </SuccessNotification>
          ),
          {
            timeOut: 2000,
          }
        );
        return;
      }
      addNotification((props) => (
        <ErrorNotification {...props}>
          {t("Text could not be copied")}
        </ErrorNotification>
      ));
    },
  },
  {
    key: "facebook",
    Icon: FacebookIcon,
    label: "Facebook",
    color: "#2d88ff",
    callback: ({ shareText }) => {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=cctimer.com&quote=${encodeURI(
          shareText
        )}`,
        "_blank"
      );
    },
  },
  {
    key: "twitter",
    Icon: TwitterIcon,
    label: "Twitter",
    color: "#1da1f2",
    callback: ({ shareText }) => {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURI(shareText)}`,
        "_blank"
      );
    },
  },
  {
    key: "whatsapp",
    Icon: WhatsappIcon,
    label: "Whatsapp",
    color: "#1BD741",
    callback: ({ shareText }) => {
      window.open(
        `https://api.whatsapp.com/send?text=${encodeURI(shareText)}`,
        "_blank"
      );
    },
  },
  {
    key: "telegram",
    Icon: TelegramIcon,
    label: "Telegram",
    color: "#3390EC",
    callback: ({ shareText }) => {
      window.open(
        `https://telegram.me/share/url?url=${encodeURI(" ")}&text=${encodeURI(
          shareText
        )}`,
        "_blank"
      );
    },
  },
];

export default shareActions;
