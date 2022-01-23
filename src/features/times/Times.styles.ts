import { createUseStyles } from "react-jss";
import theme from "styles/theme";

const useStyles = createUseStyles({
  root: {
    display: "grid",
    width: "100%",
    maxHeight: "100%",
    gridTemplateRows: "1fr auto",
  },
  timesWrapper: {
    display: "grid",
    alignItems: "flex-start",
    overflowY: "auto",
  },
  times: {
    width: "100%",
    display: "grid",
    gap: "1rem",
    padding: "1.25rem",
    justifyContent: "space-between",
    gridTemplateColumns: "repeat(3, 1fr)",
    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "1.5rem",
      padding: "1.5rem",
    },
    [theme.breakpoints.up("lg")]: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    [theme.breakpoints.up("xl")]: {
      gridTemplateColumns: "repeat(5, 1fr)",
    },
    //TODO: Fix this
    // "$withoutScramble &": {
    //   gridTemplateColumns: "repeat(3, 1fr)",
    //   [theme.breakpoints.up("lg")]: {
    //     gridTemplateColumns: "repeat(4, 1fr)",
    //   },
    //   [theme.breakpoints.up("xl")]: {
    //     gridTemplateColumns: "repeat(6, 1fr)",
    //   },
    // },
  },
  time: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.secondary,
    border: `${theme.shape.borderWitdh} solid ${theme.palette.border.primary}`,
    transition: `border ${theme.transition.duration.colorMode} linear, background ${theme.transition.duration.colorMode} linear, color ${theme.transition.duration.colorMode} linear, transform 0.25s ease-in-out, opacity 0.25s ease-in-out`,
    padding: "0.8rem 1rem",
    textAlign: "center",
    cursor: "pointer",
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
    "@media (hover: hover)": {
      "&:hover, &:focus": {
        backgroundColor: theme.palette.border.primary,
        opacity: 0.8,
      },
    },
    "@media (hover: none)": {
      "&:active": {
        backgroundColor: theme.palette.border.primary,
        opacity: 0.8,
      },
    },
  },
  bestTime: {
    "&, &:hover, &:active, &:focus": {
      border: `${theme.shape.borderWitdh} solid ${theme.palette.colors.green.main}`,
      backgroundColor: theme.palette.colors.green.main,
      color: theme.palette.colors.green.contrastText,
    },
  },
  actionBar: {
    position: "relative",
    padding: "1rem 1.25rem",
    "&:after": {
      content: '""',
      position: "absolute",
      top: `-${theme.shape.borderWitdh}`,
      left: "50%",
      width: "calc(100% - 2.5rem)",
      transform: "translateX(-50%)",
      borderTop: `${theme.shape.borderWitdh} solid ${theme.palette.border.primary}`,
      transition: `border ${theme.transition.duration.colorMode} linear`,
    },
    [theme.breakpoints.up("md")]: {
      padding: "1.5rem",
      "&:after": {
        width: "100%",
      },
    },
  },
});

export default useStyles;
