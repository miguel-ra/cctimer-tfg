import { createUseStyles } from "react-jss";

import theme from "styles/theme";

const useStyles = createUseStyles({
  container: {
    zIndex: 1,
    position: "fixed",
    right: 0,
    width: "100%",
    padding: "0.5rem 1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    [theme.breakpoints.up("md")]: {
      width: "auto",
      right: "1rem",
      top: "6.5rem",
    },
  },
  notification: {
    opacity: 0,
    margin: "0.5rem 0",
    backdropFilter: "blur(1rem)",
    borderRadius: theme.shape.borderRadius,
    willChange: "opacity, max-height",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "auto",
    },
  },
  fadeIn: {
    maxHeight: 0,
    animation: "$reveal 0.5s ease-in-out forwards",
  },
  fadeOut: {
    animation: "$hide 0.5s ease-in-out forwards",
  },
  "@keyframes reveal": {
    "0%": {
      opacity: 0,
      maxHeight: 0,
    },
    "100%": {
      opacity: 1,
      maxHeight: "30vh",
    },
  },
  "@keyframes hide": {
    "0%": {
      opacity: 1,
      maxHeight: "30vh",
    },
    "100%": {
      opacity: 0,
      maxHeight: 0,
    },
  },
});

export default useStyles;
