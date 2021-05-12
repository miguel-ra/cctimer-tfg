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
    WebkitTapHighlightColor: "transparent",
    "& path, & circle, & rect": {
      transition: `all ${theme.transition.duration.colorMode} linear`,
    },
    "&:hover $puzzleBorder": {
      opacity: 0.4,
      transform: "scale(1.32)",
    },
    "&.selected $puzzleBorder": {
      opacity: 0.8,
      transform: "scale(1.32)",
    },
  },
  puzzleBorder: {
    color: theme.palette.text.primary,
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0,
    transform: "scale(1.1)",
    transition: "opacity 0.25s ease-in-out, transform 0.25s ease-in-out",
  },
});

export default useStyles;
