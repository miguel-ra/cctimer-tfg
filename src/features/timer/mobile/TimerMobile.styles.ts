import { createUseStyles } from "react-jss";
import theme from "styles/theme";

const useStyles = createUseStyles({
  header: {
    display: "flex",
    padding: "1rem",
    transition: `background ${theme.transition.duration.colorMode} linear, border ${theme.transition.duration.colorMode} linear, opacity 0.2s linear`,
    background: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.border.primary}`,
    alignItems: "center",
    cursor: "pointer",
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
    "&:active": {
      opacity: 0.5,
    },
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
    margin: 0,
    flex: 1,
    display: "flex",
    flexWrap: "wrap",
    placeContent: "center",
    border: `1px solid ${theme.palette.border.primary}`,
    borderWidth: "0 1px 0 1px",
    background: "transparent",
    padding: "1rem",
    cursor: "pointer",
    color: theme.palette.text.primary,
    fontSize: "1.6rem",
    transition: `border ${theme.transition.duration.colorMode} linear, color ${theme.transition.duration.colorMode} linear`,
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: "1rem",
  },
});

export default useStyles;
