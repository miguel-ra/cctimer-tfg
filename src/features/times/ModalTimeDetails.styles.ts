import { createUseStyles } from "react-jss";
import theme from "styles/theme";

const useStyles = createUseStyles({
  root: {
    height: "100%",
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
  },
  content: {
    padding: "1.5rem",
    minWidth: "50vw",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  date: {
    textTransform: "uppercase",
    marginBottom: "1.5rem",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "1.5rem",
      marginBottom: "0",
    },
  },
  buttons: {
    transition: ` border ${theme.transition.duration.colorMode} linear`,
    borderTop: `1px solid ${theme.palette.border.primary}`,
    padding: "1.5rem",
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    "& > *": {
      marginRight: "1.5rem",
      "&:last-child": {
        marginRight: 0,
      },
    },
  },
});

export default useStyles;
