import { createUseStyles } from "react-jss";
import theme from "styles/theme";

const useStyles = createUseStyles({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    background: `${theme.palette.background.paper}AA`,
    transition: `background ${theme.transition.duration.colorMode} linear`,
    backdropFilter: "blur(1rem)",
    width: "100%",
    height: "100%",
    zIndex: "1",
  },
  modal: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    background: theme.palette.background.paper,
    transition: `background ${theme.transition.duration.colorMode} linear, border ${theme.transition.duration.colorMode} linear`,
    outline: "none",
    zIndex: "1",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      position: "relative",
      border: `1px solid ${theme.palette.border.primary}`,
      borderRadius: theme.shape.borderRadius,
      minWidth: "60vw",
      height: "auto",
      width: "auto",
    },
  },
});

export default useStyles;
