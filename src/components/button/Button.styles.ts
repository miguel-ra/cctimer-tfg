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
    padding: "0.5rem",
    background: "none",
    width: ({ fullWidth }) => (fullWidth ? "100%" : "auto"),
    fontSize: "1.6rem",
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
});

export default useStyles;
