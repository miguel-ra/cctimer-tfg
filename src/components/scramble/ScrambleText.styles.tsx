import { createUseStyles } from "react-jss";
import theme from "styles/theme";

const useStyles = createUseStyles({
  root: {
    position: "absolute",
    width: "100%",
    overflow: "hidden",
    maxHeight: "calc(22vh - 2rem)",
  },
  text: {
    color: theme.palette.text.secondary,
    transition: `color ${theme.transition.duration.colorMode} linear`,
    textAlign: "center",
    whiteSpace: "pre-wrap",
    overflowWrap: "break-word",
    fontSize: "1.6rem",
    padding: "1.5rem",
    [theme.breakpoints.up("md")]: {
      padding: "2rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "2rem",
    },
  },
  showScramble: {
    position: "absolute",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "1.5rem",
  },
  hiddenScramble: {
    visibility: "hidden",
  },
});

export default useStyles;
