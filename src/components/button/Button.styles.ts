import { ButtonHTMLAttributes } from "react";
import { createUseStyles } from "react-jss";
import theme from "styles/theme";

type UseStylesProps = {
  fullWidth: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const useStyles = createUseStyles<any, UseStylesProps>({
  button: {
    border: "none",
    margin: 0,
    padding: "0.5rem 1rem",
    background: "none",
    width: ({ fullWidth }) => (fullWidth ? "100%" : "auto"),
    fontSize: "1.4rem",
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    color: theme.palette.text.primary,
    cursor: "pointer",
    borderRadius: theme.shape.borderRadius,
  },
  icon: {
    width: "2rem",
    opacity: "0.9",
  },
  text: {
    transition: `opacity 0.2s linear`,
    "&:hover": {
      opacity: 0.5,
    },
  },
  contained: {
    // TODO: Change this colors to CSS variables
    background:
      "linear-gradient(to bottom right, #69BFFF 0%, #1A8AFF 50%, #1A8AFF 100%)",
    backgroundSize: "200%",
    backgroundPositionX: "100%",
    color: theme.palette.colors.white.main,
    transition: "background-position-x 0.2s linear",
    "&:hover": {
      backgroundPositionX: "0%",
    },
  },
});

export default useStyles;
