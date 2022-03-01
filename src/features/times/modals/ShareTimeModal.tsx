import { CSSProperties, useRef } from "react";
import { useTranslation } from "react-i18next";

import Button from "components/button/Button";
import ModalBody from "components/modal/ModalBody";
import ModalFooter from "components/modal/ModalFooter";
import ModalHeader from "components/modal/ModalHeader";
import Spacer from "components/spacer/Spacer";
import Typography from "components/typography/Typography";
import { LangKey } from "i18n/i18n";
import { PuzzleTime } from "models/times/Time";
import { dateTimeToDayLocale } from "shared/format/date";
import { elapsedTimeWithPenalty } from "shared/format/puzzleTime";
import { useNotifications } from "store/notificationsContext";

import shareActions from "./ShareTimeModal.actions";
import useStyles from "./ShareTimeModal.styles";

type ShareTimeModalProps = {
  time: PuzzleTime;
  goBack: () => void;
};

function ShareTimeModal({ time, goBack }: ShareTimeModalProps) {
  const shareTextRef = useRef<HTMLDivElement | null>(null);
  const { t, i18n } = useTranslation();
  const { addNotification } = useNotifications();
  const classes = useStyles();

  const shareText = `${t("Generated by CCTimer.com on")} ${dateTimeToDayLocale(
    i18n.language as LangKey,
    new Date(time.createdAt)
  )}\n\n${elapsedTimeWithPenalty(time.elapsedTime, time.penalty)}\n\n${time.scramble.text}`.trim();

  return (
    <>
      <ModalHeader label={t("Share time")} />
      <ModalBody className={classes.content}>
        <div className={classes.shareButtons}>
          {shareActions.map(({ key, Icon, label, color, callback }) => {
            const shareAction = () => {
              callback({ shareText, shareTextRef, addNotification, t });
            };
            return (
              <div
                key={key}
                role="button"
                tabIndex={0}
                className={classes.shareButton}
                style={{ "--brand-color": color } as CSSProperties}
                onClick={shareAction}
                onKeyDown={(event) => {
                  if (["Enter", " "].includes(event.key)) {
                    shareAction();
                  }
                }}
              >
                <Icon className={classes.icon} />
                <Spacer h={1} />
                <Typography variant="button">{t(label)}</Typography>
              </div>
            );
          })}
        </div>
        <div
          ref={shareTextRef}
          className={classes.shareText}
          contentEditable
          suppressContentEditableWarning
          onPaste={(event) => event.preventDefault()}
          onInput={(event) => {
            (event.target as HTMLDivElement).textContent = shareText;
          }}
          onKeyDown={(event) => {
            if (!event.metaKey && event.key !== "Tab") {
              event.preventDefault();
            }
          }}
        >
          {shareText}
        </div>
      </ModalBody>
      <ModalFooter style={{ justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={goBack} size="small">
          {t("Go back")}
        </Button>
      </ModalFooter>
    </>
  );
}

export default ShareTimeModal;
