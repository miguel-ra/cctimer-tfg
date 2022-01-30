import clsx from "clsx";
import { InputHTMLAttributes } from "react";
import { createUseStyles } from "react-jss";

import theme from "styles/theme";

const useStyles = createUseStyles({
  input: {
    width: "100%",
    minWidth: "0",
    display: "inline-flex",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    border: `${theme.shape.borderWitdh} solid ${theme.palette.border.primary}`,
    borderRadius: theme.shape.borderRadius,
    padding: "0 1.2rem",
    background: theme.palette.background.secondary,
    color: theme.palette.text.secondary,
    lineHeight: "normal",
    outline: "none",
    transition: theme.transition.generate(["border-color", "color", "background"]),
    height: "4rem",
    fontSize: "1.4rem",
    "&.large": {
      height: "4.8rem",
      fontSize: "1.6rem",
    },
    "&::placeholder": {
      opacity: 1,
    },
    "&:focus": {
      borderColor: theme.palette.border.secondary,
      color: theme.palette.text.secondary,
    },
  },
});

type InputProps = {
  name: string;
  size?: "medium" | "large";
} & Omit<InputHTMLAttributes<HTMLInputElement>, "pattern" | "name" | "onChange" | "size">;

function Input({ name, size = "medium", className, ...props }: InputProps) {
  const classes = useStyles();

  return <input name={name} className={clsx(classes.input, size, className)} {...props} />;
}

export default Input;
