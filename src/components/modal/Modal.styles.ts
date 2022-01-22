import { createUseStyles } from "react-jss";
import theme from "styles/theme";

const useStyles = createUseStyles({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    background: theme.palette.background.secondary,
    transition: `background ${theme.transition.duration.colorMode} linear`,
    backdropFilter: "blur(1rem)",
    width: "100%",
    height: "100%",
    zIndex: "1",
    opacity: 0.9,
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    background: theme.palette.background.secondary,
    transition: `background ${theme.transition.duration.colorMode} linear, border ${theme.transition.duration.colorMode} linear`,
    outline: "none",
    zIndex: "1",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      position: "relative",
      border: `${theme.shape.borderWitdh} solid ${theme.palette.border.primary}`,
      borderRadius: theme.shape.borderRadius,
      maxWidth: "70vw",
      maxHeight: "70vh",
      overflow: "auto",
      height: "auto",
      width: "auto",
    },
  },
});

export default useStyles;
