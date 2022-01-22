import { createUseStyles } from "react-jss";
import theme from "styles/theme";

const useStyles = createUseStyles({
  sectionContainer: {
    display: "flex",
    height: "33vh",
    background: theme.palette.background.secondary,
    transition: `border ${theme.transition.duration.colorMode} linear, background ${theme.transition.duration.colorMode} linear`,
    borderTop: `${theme.shape.borderWitdh} solid ${theme.palette.border.primary}`,
  },
  section: {
    flex: 1,
    display: "flex",
  },
  stats: {
    flex: 1,
    display: "flex",
    flexWrap: "wrap",
    placeContent: "center",
    transition: `border ${theme.transition.duration.colorMode} linear, background ${theme.transition.duration.colorMode} linear`,
    border: `0 solid ${theme.palette.border.primary}`,
    borderWidth: `0 ${theme.shape.borderWitdh} 0 ${theme.shape.borderWitdh}`,
    "$withoutScramble &": {
      borderWidth: `0 0 0 ${theme.shape.borderWitdh}`,
    },
  },
  scramble: {
    display: "grid",
    height: "100%",
    width: "100%",
    padding: "3rem",
  },
  withoutScramble: {},
});

export default useStyles;
