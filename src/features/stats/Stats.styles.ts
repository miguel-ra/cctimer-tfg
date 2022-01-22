import { createUseStyles } from "react-jss";

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
  },
});

export default useStyles;
