import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";

import ModalBody from "components/modal/ModalBody";
import ModalHeader from "components/modal/ModalHeader";
import theme from "styles/theme";

type ModalPuzzleSelectorProps = {
  children: ReactNode;
};

const useStyles = createUseStyles({
  header: {
    display: "flex",
    padding: "1rem",
    alignItems: "center",
    justifyContent: "space-between",
    transition: ` border ${theme.transition.duration.colorMode} linear`,
    borderBottom: `${theme.shape.borderWitdh} solid ${theme.palette.border.primary}`,
  },
  content: {
    padding: "1.5rem",
    textAlign: "center",
    whiteSpace: "pre-wrap",
    overflowWrap: "break-word",
    paddingBottom: 0,
    marginBottom: "1.5rem",
  },
});

function ModalScrambleText({ children }: ModalPuzzleSelectorProps) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <ModalHeader label={t("Scramble details")} />
      <ModalBody className={classes.content}>{children}</ModalBody>
    </>
  );
}

export default ModalScrambleText;
