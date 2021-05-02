import { createUseStyles } from "react-jss";
import theme from "styles/theme";

const useStyles = createUseStyles({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    background: `${theme.palette.background.paper}AA`,
    transition: `background ${theme.transition.duration.colorMode}ms linear`,
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
    transition: `background ${theme.transition.duration.colorMode}ms linear, border ${theme.transition.duration.colorMode}ms linear`,
    outline: "none",
    zIndex: "1",
    [theme.breakpoints.up("sm")]: {
      border: `1px solid ${theme.palette.border.primary}`,
      borderRadius: theme.shape.borderRadius,
      position: "absolute",
      top: "50%",
      left: "50%",
      minWidth: "60vw",
      height: "auto",
      width: "auto",
      transform: "translate(-50%, -50%)",
    },
  },
});

export default useStyles;
