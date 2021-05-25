import { createUseStyles } from "react-jss";
import theme from "styles/theme";

const useStyles = createUseStyles({
  withoutScramble: {},
  sectionContainer: {
    display: "flex",
    height: "30vh",
    background: theme.palette.background.paper,
    transition: `border ${theme.transition.duration.colorMode} linear, background ${theme.transition.duration.colorMode} linear`,
    borderTop: `1px solid ${theme.palette.border.primary}`,
  },
  section: {
    maxHeight: "100%",
    overflow: "auto",
    flex: 1,
  },
  stats: {
    flex: 1,
    display: "flex",
    flexWrap: "wrap",
    placeContent: "center",
    transition: `border ${theme.transition.duration.colorMode} linear, background ${theme.transition.duration.colorMode} linear`,
    border: `0 solid ${theme.palette.border.primary}`,
    borderWidth: "0 1px 0 1px",
    "$withoutScramble &": {
      borderWidth: "0 0 0 1px",
    },
  },
  scramble: {
    display: "grid",
    height: "100%",
    width: "100%",
    padding: "3rem",
  },
});

export default useStyles;
