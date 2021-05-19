import { createUseStyles } from "react-jss";
import theme from "styles/theme";

const useStyles = createUseStyles({
  sectionContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    height: "30vh",
    background: theme.palette.background.paper,
    transition: `border ${theme.transition.duration.colorMode} linear, background ${theme.transition.duration.colorMode} linear`,
    borderTop: `1px solid ${theme.palette.border.primary}`,
  },
  section: {
    maxHeight: "100%",
    overflow: "auto",
  },
  stats: {
    flex: 1,
    display: "flex",
    flexWrap: "wrap",
    placeContent: "center",
    transition: `border ${theme.transition.duration.colorMode} linear, background ${theme.transition.duration.colorMode} linear`,
    border: `0 solid ${theme.palette.border.primary}`,
    borderWidth: "0 1px 0 1px",
  },
  times: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    [theme.breakpoints.up("lg")]: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    [theme.breakpoints.up("xl")]: {
      gridTemplateColumns: "repeat(5, 1fr)",
    },
    padding: "2rem",
    gap: "2rem",
    justifyContent: "space-between",
    overflow: "auto",
  },
  time: {
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.border.primary}`,
    transition: `border ${theme.transition.duration.colorMode} linear`,
    padding: "1rem",
    textAlign: "center",
  },
  scramble: {
    display: "grid",
    height: "100%",
    width: "100%",
    padding: "3rem",
    "& > canvas": {
      alignSelf: "center",
      justifySelf: "center",
    },
  },
});

export default useStyles;
