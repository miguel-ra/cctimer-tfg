import { ReactNode } from "react";
import { createUseStyles } from "react-jss";
import { useTranslation } from "react-i18next";
import theme from "styles/theme";
import ModalHeader from "components/modal/ModalHeader";
import ModalBody from "components/modal/ModalBody";

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
