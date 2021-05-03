import { createUseStyles } from "react-jss";
import breakpoints from "styles/breakpoints";

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
  display: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "8rem",
    transition: "color 0.1s linear",
    [breakpoints.up("sm")]: {
      fontSize: "12rem",
    },
    [breakpoints.up("md")]: {
      fontSize: "14rem",
    },
    [breakpoints.up("lg")]: {
      fontSize: "18rem",
    },
    [breakpoints.up("xl")]: {
      fontSize: "20rem",
    },
  },
});

export default useStyles;
