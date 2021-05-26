import { createUseStyles } from "react-jss";
import theme from "styles/theme";

type UseStylesProps = {
  size?: "small" | "medium";
};

const useStyles = createUseStyles<any, UseStylesProps>({
  button: {
    "--size": ({ size }) => (size === "small" ? "2.4rem" : "3.5rem"),
    background: "none",
    border: "none",
    padding: "0",
    cursor: "pointer",
    width: "var(--size)",
    height: "var(--size)",
    color: theme.palette.text.primary,
    transition: `opacity 0.2s linear`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
    "&:hover": {
      opacity: 0.5,
    },
    "& svg": {
      width: "75%",
      "& path": {
        transition: `color ${theme.transition.duration.colorMode} linear`,
      },
    },
  },
});

export default useStyles;
