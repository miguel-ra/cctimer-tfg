import { createUseStyles } from "react-jss";
import theme from "styles/theme";

const useStyles = createUseStyles({
  wrapper: {
    display: "flex",
    gap: "1.5rem",
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
  },
  input: {
    flex: 1,
    padding: "0.45rem 1rem",
    minHeight: "2rem",
    width: "auto",
    boxSizing: "border-box",
    borderRadius: theme.shape.borderRadius * 2,
    border: `1px solid ${theme.palette.border.primary}`,
    transition: `border ${theme.transition.duration.colorMode}ms linear`,
  },
});

export default useStyles;
