import { createUseStyles } from "react-jss";
import theme from "styles/theme";

const useStyles = createUseStyles({
  content: {
    minWidth: "30vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    [theme.breakpoints.up("md")]: {
      maxWidth: "50vw",
    },
  },
  shareButtons: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: "2rem",
    justifyContent: "center",
  },
  shareButton: {
    outlineOffset: "1rem",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    alignItems: "center",
    transition: `opacity 0.2s ease-in-out`,
    margin: "1rem",
    "&:hover": {
      opacity: 0.5,
    },
  },
  icon: {
    width: "6rem",
    border: `${theme.shape.borderWitdh} solid var(--brand-color, ${theme.palette.text.primary})`,
    borderRadius: "100%",
    padding: "1.5rem",
    overflow: "visible",
    marginBottom: "1rem",
  },
  shareText: {
    flex: 1,
    whiteSpace: "break-spaces",
    padding: "0.45rem 0.75rem",
    fontSize: "1.4rem",
    borderRadius: theme.shape.borderRadius,
    transition: `border ${theme.transition.duration.colorMode} linear`,
    border: `${theme.shape.borderWitdh} solid ${theme.palette.border.primary}`,
    outline: "none",
    overflowY: "auto",
    [theme.breakpoints.up("md")]: {
      maxHeight: "20vh",
    },
  },
});

export default useStyles;
