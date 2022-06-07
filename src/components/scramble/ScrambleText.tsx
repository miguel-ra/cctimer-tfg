import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import Button from "components/button/Button";
import Typography from "components/typography/Typography";
import { useScramble } from "features/timer/timerViewModel";
import { useModal } from "store/modalContext";

import { ReactComponent as RefreshIcon } from "assets/icons/refresh.svg";

import ModalScrambleText from "./ModalScrambleText";
import useStyles from "./ScrambleText.styles";

type ScrambleTextProps = {
  showRefresh?: boolean;
  children: string;
};

function ScrambleText({ children, showRefresh }: ScrambleTextProps) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { openModal } = useModal();
  const [showMore, setShowMore] = useState(false);
  const { refreshScramble } = useScramble();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const checkScrambleHeight = useCallback(() => {
    setShowMore(
      (containerRef?.current && containerRef?.current.scrollHeight > containerRef?.current.clientHeight) ||
        false
    );
  }, []);

  useEffect(() => {
    window.addEventListener("resize", checkScrambleHeight);
    return () => {
      window.removeEventListener("resize", checkScrambleHeight);
    };
  }, [checkScrambleHeight]);

  return (
    <>
      {showMore && (
        <div className={classes.showScramble}>
          <Button onClick={() => openModal(<ModalScrambleText>{children}</ModalScrambleText>)}>
            [ {t("Tap here to see scramble")} ]
          </Button>
        </div>
      )}
      <div
        ref={(element) => {
          containerRef.current = element;
          checkScrambleHeight();
        }}
        className={clsx(classes.root, { [classes.hiddenScramble]: showMore })}
      >
        <Typography variant="h6" className={classes.text}>
          {children}
        </Typography>

        {showRefresh && (
          <Button size="small" shape="square" aria-label={t("Refresh scramble")} onClick={refreshScramble}>
            <RefreshIcon />
          </Button>
        )}
      </div>
    </>
  );
}

export default ScrambleText;
