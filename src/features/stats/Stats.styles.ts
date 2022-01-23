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
    padding: "1.5rem 0",
    position: "relative",
    overflow: "hidden",
  },
  stats: {
    width: "100%",
    padding: "0 1.5rem",
    borderSpacing: 0,

    "& thead th": {
      position: "sticky",
      top: 0,
      "&:before": {
        display: "block",
        content: "''",
        width: "calc(100% + 3.5rem)",
        height: "1.5rem",
        position: "absolute",
        top: `calc(-1.5rem - ${theme.shape.borderWitdh})`,
        left: "-1.5rem",
        background: theme.palette.background.secondary,
        transition: theme.transition.generate(["background"]),
        zIndex: -1,
      },
    },
  },
});

export default useStyles;
