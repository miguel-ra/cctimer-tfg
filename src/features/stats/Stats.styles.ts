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
      ...theme.typography.caption,
      fontSize: "1.3rem",
      lineHeight: "1.4",
      padding: "0.75rem 0.5rem",
    },
    "& th": {
      fontSize: "1.4rem",
      borderBottom: `${theme.shape.borderWitdh} solid ${theme.palette.border.primary}`,
      transition: `border ${theme.transition.duration.colorMode} linear`,
      fontWeight: "bold",
      textAlign: "left",
    },
    "& tr:nth-child(even)": {
      backgroundColor: theme.palette.background.default,
      transition: `background-color ${theme.transition.duration.colorMode} linear`,
    },
  },
});

export default useStyles;
