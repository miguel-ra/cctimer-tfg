import { createUseStyles } from "react-jss";
import theme from "styles/theme";

const useStyles = createUseStyles({
  header: {
    display: "flex",
    padding: "1rem",
    alignItems: "center",
    justifyContent: "space-between",
    transition: ` border ${theme.transition.duration.colorMode} linear`,
    borderBottom: `${theme.shape.borderWitdh} solid ${theme.palette.border.primary}`,
  },
  content: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1rem",
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
    transition: `${theme.transition.generate(["color", "background"])}, transform 0.1s ease-in`,
    "&:hover": {
      color: theme.palette.text.secondary,
      background: theme.palette.border.primary,

      "@media (hover: hover)": {
        "&": {
          transform: "translateY(-4px)",
        },
      },
    },
  },
  icon: {
    maxWidth: "80%",
    maxHeight: "80%",
    marginBottom: "1.5rem",
  },
});

export default useStyles;
