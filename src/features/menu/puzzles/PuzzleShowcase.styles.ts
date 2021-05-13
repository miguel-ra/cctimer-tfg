import { createUseStyles } from "react-jss";
import theme from "styles/theme";

const useStyles = createUseStyles({
  puzzleIcon: {
    "--background-color": theme.palette.background.default,
    position: "relative",
    width: "3.5rem",
    height: "3.5rem",
    display: "flex",
    cursor: "pointer",
    userSelect: "none",
    marginBottom: "2rem",
    WebkitTapHighlightColor: "transparent",
    "& path, & circle, & rect": {
      transition: `all ${theme.transition.duration.colorMode} linear`,
    },
    "&:hover $puzzleBorder": {
      opacity: 1,
      transform: "scale(1.322)",
    },
    "&:hover $puzzleRemove": {
      display: "block",
    },
    "&.selected $puzzleBorder": {
      opacity: 1,
      color: theme.palette.text.primary,
      transform: "scale(1.322)",
    },
    "&.selected $puzzleRemove": {
      color: theme.palette.text.primary,
    },
  },
  puzzleBorder: {
    color: "var(--palette-border-secondary)",
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0,
    transform: "scale(1.1)",
    transition: `opacity ${theme.transition.duration.colorMode} ease-in-out, color ${theme.transition.duration.colorMode} ease-in-out, transform 0.25s ease-in-out`,
  },
  puzzleRemove: {
    display: "none",
    position: "absolute",
    width: 20,
    top: 0,
    right: 0,
    color: "var(--palette-border-secondary)",
    transform: "translate(50%, -45%)",
    transition: `color ${theme.transition.duration.colorMode} ease-in-out, transform ${theme.transition.duration.colorMode} ease-in-out`,
    "&:hover": {
      transform: "translate(50%, -45%) scale(1.22)",
    },
    animation: "$reveal 0.15s ease-in-out forwards",
  },
  "@keyframes reveal": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
});

export default useStyles;
