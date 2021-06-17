import { FunctionComponent, MutableRefObject, SVGProps } from "react";
import { TFunction } from "i18next";
import { AddNotification } from "store/notificationsContext";
import { ReactComponent as CopyIcon } from "assets/icons/copy.svg";
import SuccessNotification from "components/notification/SuccessNotification";
import ErrorNotification from "components/notification/ErrorNotification";

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
  onClick: (data: ShareActionData) => void;
};

const shareActions: ShareAction[] = [
  {
    key: "copy",
    Icon: CopyIcon,
    label: "Copy",
    onClick: ({ shareTextRef, addNotification, t }) => {
      if (shareTextRef.current) {
        shareTextRef.current.focus();
        document.execCommand("selectAll", false);
        document.execCommand("copy");
        shareTextRef.current.blur();
        addNotification(
          (props) => <SuccessNotification {...props}>{t("Text copied to clipboard")}</SuccessNotification>,
          {
            timeOut: 2000,
          }
        );
        return;
      }
      addNotification((props) => (
        <ErrorNotification {...props}>{t("Text could not be copied")}</ErrorNotification>
      ));
    },
  },
];

export default shareActions;
