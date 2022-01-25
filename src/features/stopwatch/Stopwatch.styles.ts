import { createUseStyles } from "react-jss";

import theme from "styles/theme";
import { fontFamily } from "styles/typography";

const useStyles = createUseStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    placeContent: "center",
    minWidth: "100%",
    minHeight: "100%",
    cursor: "pointer",
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
  },
  displayWrapper: {
    position: "relative",
  },
  display: {
    fontFamily: fontFamily,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "8rem",
    color: theme.palette.text.secondary,
    transition: `color ${theme.transition.duration.colorMode} linear`,
    ".pressed &": {
      transform: "scale(0.95)",
      transition: "none",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "12rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "14rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "18rem",
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "20rem",
    },
    "@media (max-height:600px)": {
      fontSize: "8rem",
    },
  },
});

export default useStyles;
