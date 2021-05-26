import { createUseStyles } from "react-jss";
import theme from "styles/theme";

const useStyles = createUseStyles({
  root: {
    display: "grid",
    alignItems: "flex-start",
    overflowY: "auto",
    width: "100%",
    maxHeight: "100%",
  },
  times: {
    width: "100%",
    display: "grid",
    gap: "2rem",
    padding: "2rem",
    justifyContent: "space-between",
    gridTemplateColumns: "repeat(3, 1fr)",
    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.breakpoints.up("lg")]: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    [theme.breakpoints.up("xl")]: {
      gridTemplateColumns: "repeat(5, 1fr)",
    },
    "$withoutScramble &": {
      gridTemplateColumns: "repeat(3, 1fr)",
      [theme.breakpoints.up("lg")]: {
        gridTemplateColumns: "repeat(4, 1fr)",
      },
      [theme.breakpoints.up("xl")]: {
        gridTemplateColumns: "repeat(6, 1fr)",
      },
    },
  },
  time: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.border.primary}`,
    transition: `border ${theme.transition.duration.colorMode} linear, background ${theme.transition.duration.colorMode} linear`,
    padding: "1rem",
    textAlign: "center",
  },
});

export default useStyles;
