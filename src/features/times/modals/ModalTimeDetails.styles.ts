import { createUseStyles } from "react-jss";
import theme from "styles/theme";

const useStyles = createUseStyles({
  root: {
    height: "100%",
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
  },
  modalBody: {
    paddingBottom: 0,
  },
  content: {
    minWidth: "50vw",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    paddingBottom: "1.5rem",
  },
  time: {
    color: theme.palette.text.secondary,
    transition: theme.transition.generate(["color"]),
  },
  date: {
    marginBottom: "1.5rem",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "2rem",
      marginBottom: "0",
    },
  },
});

export default useStyles;
