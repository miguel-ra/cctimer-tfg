import { createUseStyles } from "react-jss";
import { useTranslation } from "react-i18next";
import theme from "styles/theme";
import { ReactComponent as CopyIcon } from "assets/icons/copy.svg";
import ModalHeader from "components/modal/ModalHeader";
import Button from "components/button/Button";
import ModalBody from "components/modal/ModalBody";
import ModalFooter from "components/modal/ModalFooter";
import Typography from "components/typography/Typography";

type ModalShareTimeProps = {
  goBack: () => void;
};

const useStyles = createUseStyles({
  content: {
    minWidth: "30vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  shareButtons: {
    display: "flex",
    marginBottom: "2rem",
    padding: "1rem",
    justifyContent: "center",
  },
  shareButton: {
    outlineOffset: "0.5rem",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    alignItems: "center",
    transition: `opacity 0.2s linear`,
    "&:hover": {
      opacity: 0.5,
    },
  },
  icon: {
    width: "6rem",
    border: "2px solid white",
    borderRadius: "100%",
    padding: "1.5rem",
    overflow: "visible",
    marginBottom: "1rem",
  },
  shareText: {
    flex: 1,
    whiteSpace: "break-spaces",
    padding: "0.45rem 0.75rem",
    fontSize: "1.4rem",
    borderRadius: theme.shape.borderRadius,
    transition: `border ${theme.transition.duration.colorMode} linear`,
    border: `${theme.shape.borderWitdh} solid ${theme.palette.border.primary}`,
    outline: "none",
    overflowY: "auto",
    [theme.breakpoints.up("md")]: {
      maxHeight: "20vh",
    },
  },
});

function getShareText() {
  return `Generado por CCTimer.com el 2021-06-11
  
DNF(50:02)
  
R+  d-- r-- d++ r-- D++ R++ d+  R-  d-- y2
R-- D++ r-  D-  r-  d-- r-  D++ R+  d++ y2'
r-  D-  R-  d-- r-- d+  r+  D-  r-  d-- y'
R+  d-  R-  D-- R+  d+  R-  d-  r+  D-- y2'
R-- d-  r-  D+  r+  D-  R+  d-  r++ d+  y2'
R++ d++ R+  D+  R-- d-  r++ d-- R-  d-- y2
R-- d-  r-- D-- R-- d-- R-  D-  r+  d++ y2
r+  D-  r+  d-  R-  d++ r-  D++ R-- D+  y
r++ d-  r-  D-- r-  d++ r-  d+  R-  D+  y2'
r++ D++ r-- d-- r++ d-- R-  d-- r-- D-  y'
R+  D-- R++ D-  R+  d-- r-- d++ R-  D+  y2
R+  d++ R-- d-  r++ d-  R+  d++ R-  d-  y2'
R++ D++ r+  d+  R-  d-- R-  D++ R+  D-  y
R++ d-- r++ d-  R-- D++ R-  D-- R-- d-  y'
R+  D-  r-- D-- R++ D+  r++ D-- r++ d-  y2
r-  D-- R++ D+  R-- d-- r-  d+  r-- d-- y2'
R-- D-- r++ D+  R-- d-  R-  d+  R+  d++ y2'
r-  D-- R-- D-- r++ D-- R-  d-- r-  D+  y
r++ D-  r+  D-  r-- D++ R++ D-- r++ d++ y
r+  d-- r+  D-- R-- d-  R++ d++ r++ D+  y2'
r-  D-- r+  D-- R-  D-  r-- D-- r-  D-  y'
r+  D+  r++ d-  R+  D++ r-  D-- r++ D++ y2'
R-  D++ r-  d+  r+  d-  R++ d+  r+  d+  y2'
r++ d-  R++ d-  R++ D-  R++ d-  R-  d++ y2
R+  D-- r++ D-  r-- D++ r++ d+  r++ D-- y
R++ D-- R-  d-- r++ d-  r-- d+  r++ d++ y'
R+  D-  r-  d-  R-  d-- R++ D-- R-  d-- y2'
r++ D+  r-  D+  R-- D+  R-- d++ R+  d++ y'
R++ D-  R-- D-  R+  d+  R-- d-  R+  d-- y
r+  d++ r++ d+  R++ d-  r+  d+  r+  d-- y`;
}

const shareButtons = [
  {
    key: "copy",
    Icon: CopyIcon,
    label: "Copy",
  },
];

function ModalShareTime({ goBack }: ModalShareTimeProps) {
  const { t } = useTranslation();
  const classes = useStyles();

  const shareText = getShareText();

  return (
    <>
      <ModalHeader label={t("Share time")} />
      <ModalBody className={classes.content}>
        <div className={classes.shareButtons}>
          {shareButtons.map(({ key, Icon, label }) => (
            <div key={key} role="button" tabIndex={0} className={classes.shareButton}>
              <Icon className={classes.icon} />
              <Typography variant="button">{t(label)}</Typography>
            </div>
          ))}
        </div>
        <div
          className={classes.shareText}
          contentEditable
          suppressContentEditableWarning
          onPaste={(event) => event.preventDefault()}
          onKeyDown={(event) => {
            if (!event.metaKey && event.key !== "Tab") {
              event.preventDefault();
            }
          }}
        >
          {shareText}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="contained" onClick={goBack}>
          {t("Go back")}
        </Button>
      </ModalFooter>
    </>
  );
}

export default ModalShareTime;
