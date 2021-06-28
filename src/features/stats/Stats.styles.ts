import { createUseStyles } from "react-jss";
import theme from "styles/theme";

const useStyles = createUseStyles({
  root: {
    display: "grid",
    width: "100%",
    height: "100%",
    gridTemplateRows: "1fr auto",
    overflowY: "auto",
    alignItems: "flex-start",
  },
  stats: {
    width: "100%",
    padding: "1rem 1.5rem",
    borderSpacing: 0,
    "& th, & td": {
      letterSpacing: "0.4px",
      fontSize: "1.4rem",
      lineHeight: "1.4",
      padding: "0.75rem 0.5rem",
      borderTop: `1px solid ${theme.palette.border.primary}`,
      transition: `border ${theme.transition.duration.colorMode} linear`,
    },
    "& th": {
      textTransform: "uppercase",
      borderTop: "none",
      borderBottom: `1px solid ${theme.palette.border.primary}`,
      transition: `border ${theme.transition.duration.colorMode} linear`,
      fontWeight: "bold",
      textAlign: "left",
    },
    [theme.breakpoints.down("md")]: {
      "& tbody tr:nth-child(odd)": {
        backgroundColor: theme.palette.background.paper,
        transition: `background-color ${theme.transition.duration.colorMode} linear`,
      },
    },
    [theme.breakpoints.up("md")]: {
      "& tbody tr:nth-child(odd)": {
        backgroundColor: theme.palette.background.default,
        transition: `background-color ${theme.transition.duration.colorMode} linear`,
      },
    },
  },
});

export default useStyles;
