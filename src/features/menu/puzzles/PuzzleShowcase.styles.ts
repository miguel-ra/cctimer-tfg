import { createUseStyles } from "react-jss";
import theme from "styles/theme";

const useStyles = createUseStyles({
  puzzleWrapper: {
    "--background-color": theme.palette.background.primary,
    position: "relative",
    width: "3.5rem",
    height: "3.5rem",
    display: "flex",
    cursor: "pointer",
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
    outlineOffset: "0.75rem",
    "& path, & circle, & rect": {
      transition: `all ${theme.transition.duration.colorMode} linear`,
    },
    "&:hover $puzzleBorder, &:focus-within $puzzleBorder": {
      opacity: 1,
      transform: "scale(1.322)",
    },
    "&:hover, &[aria-expanded=true], &:focus-within": {
      "& $puzzleDelete": {
        display: "block",
      },
    },
    "&.selected $puzzleBorder": {
      opacity: 1,
      color: theme.palette.text.primary,
      transform: "scale(1.322)",
    },
    "&.selected $puzzleDelete": {
      color: theme.palette.text.primary,
    },
    "&:focus": {
      outline: "5px auto -webkit-focus-ring-color",
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
  puzzleIcon: {
    width: "100%",
    height: "100%",
  },
  puzzleDelete: {
    display: "none",
    position: "absolute",
    width: 20,
    top: 0,
    right: 0,
    opacity: 0,
    color: "var(--palette-border-secondary)",
    transform: "translate(50%, -45%)",
    transition: `color ${theme.transition.duration.colorMode} ease-in-out, transform ${theme.transition.duration.colorMode} ease-in-out`,
    "&:hover, &:focus": {
      transform: "translate(50%, -45%) scale(1.15)",
    },
    animation: "$reveal 0.2s ease-in-out forwards",
    animationDelay: "0.2s",
  },
  "@keyframes reveal": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
});

export default useStyles;
