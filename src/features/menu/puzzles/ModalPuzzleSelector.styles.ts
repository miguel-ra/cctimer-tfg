import { createUseStyles } from "react-jss";
import theme from "styles/theme";

const useStyles = createUseStyles({
  header: {
    display: "flex",
    padding: "1rem",
    alignItems: "center",
    justifyContent: "space-between",
    transition: ` border ${theme.transition.duration.colorMode} linear`,
    borderBottom: `1px solid ${theme.palette.border.primary}`,
  },
  content: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1rem",
    padding: "1.5rem",
    marginBottom: "1.5rem",
    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "repeat(4, 1fr)",
      marginBottom: 0,
      maxHeight: "75vh",
    },
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "repeat(6, 1fr)",
    },
    [theme.breakpoints.up("lg")]: {
      gridTemplateColumns: "repeat(8, 1fr)",
    },
    [theme.breakpoints.up("xl")]: {
      gridTemplateColumns: "repeat(10, 1fr)",
    },
  },
  item: {
    display: "flex",
    flexDirection: "column",
    padding: "2rem 1rem 1.7rem",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "6px",
    cursor: "pointer",
    background: "none",
    color: theme.palette.text.primary,
    border: "none",
    appearance: "none",
    transition: "background 0.1s linear",
    "&:hover": {
      backgroundColor: theme.palette.border.primary,
    },
  },
  icon: {
    maxWidth: "80%",
    maxHeight: "80%",
    marginBottom: "1.5rem",
  },
});

export default useStyles;
