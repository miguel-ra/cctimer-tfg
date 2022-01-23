import { createUseStyles } from "react-jss";
import theme from "styles/theme";

const useStyles = createUseStyles({
  header: {
    display: "flex",
    padding: "1rem",
    transition: `background ${theme.transition.duration.colorMode} linear, border ${theme.transition.duration.colorMode} linear, color ${theme.transition.duration.colorMode} linear, opacity 0.2s linear`,
    background: theme.palette.background.secondary,
    borderBottom: `${theme.shape.borderWitdh} solid ${theme.palette.border.primary}`,
    alignItems: "center",
    cursor: "pointer",
    userSelect: "none",
    color: theme.palette.text.secondary,
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
    background: theme.palette.background.secondary,
    transition: `background ${theme.transition.duration.colorMode} linear`,
  },
  button: {
    margin: 0,
    flex: 1,
    display: "flex",
    flexWrap: "wrap",
    placeContent: "center",
    border: `${theme.shape.borderWitdh} solid ${theme.palette.border.primary}`,
    borderWidth: `${theme.shape.borderWitdh} 0 0 0`,
    background: "transparent",
    padding: "1.5rem",
    cursor: "pointer",
    color: theme.palette.text.primary,
    fontSize: "1.6rem",
    transition: `border ${theme.transition.duration.colorMode} linear, color ${theme.transition.duration.colorMode} linear, opacity 0.2s linear`,
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",

    "&[aria-expanded='true']": {
      borderTopColor: theme.palette.colors.blue.main,
      color: theme.palette.colors.blue.main,
    },
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: "1rem",
  },
});

export default useStyles;
