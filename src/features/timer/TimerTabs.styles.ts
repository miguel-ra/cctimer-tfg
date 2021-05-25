import { createUseStyles } from "react-jss";
import theme from "styles/theme";

const useStyles = createUseStyles({
  header: {
    display: "flex",
    padding: "1rem",
    transition: `background ${theme.transition.duration.colorMode} linear, border ${theme.transition.duration.colorMode} linear`,
    background: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.border.primary}`,
  },
  sections: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
  },
  section: {
    position: "absolute",
    width: "100%",
    height: "100%",
    willChange: "transform",
  },
  buttons: {
    display: "flex",
    background: theme.palette.background.paper,
    transition: `border ${theme.transition.duration.colorMode} linear, background ${theme.transition.duration.colorMode} linear`,
    borderTop: `1px solid ${theme.palette.border.primary}`,
  },
  button: {
    flex: 1,
    display: "flex",
    flexWrap: "wrap",
    placeContent: "center",
    transition: `border ${theme.transition.duration.colorMode} linear`,
    borderRight: `1px solid ${theme.palette.border.primary}`,
    padding: "1rem",
  },
});

export default useStyles;
