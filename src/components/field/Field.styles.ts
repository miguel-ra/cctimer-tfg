import { createUseStyles } from "react-jss";
import theme from "styles/theme";

const useStyles = createUseStyles({
  wrapper: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: "1rem",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    position: "relative",
    cursor: "pointer",
    lineHeight: "2rem",
    display: "inline-block",
    width: "100%",
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
  },
  input: {
    flex: 1,
    padding: "0.45rem 0.75rem",
    minHeight: "2rem",
    width: "auto",
    boxSizing: "border-box",
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.border.primary}`,
    transition: `border ${theme.transition.duration.colorMode} linear`,
    fontSize: "1.4rem",
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
  },
});

export default useStyles;
