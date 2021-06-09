import clsx from "clsx";
import { ButtonHTMLAttributes, ElementType, ReactNode } from "react";
import { Color } from "styles/colors";
import useStyles from "./Button.styles";

type ButtonProps = {
  startIcon?: ElementType;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
  variant?: "text" | "contained" | "outlined";
  color?: Color;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
  startIcon: StartIcon,
  fullWidth = false,
  className,
  children,
  variant = "text",
  color = "blue",
  ...props
}: ButtonProps) {
  const classes = useStyles({ fullWidth, color });

  return (
    <button className={clsx(classes.button, className, classes[variant])} {...props}>
      {StartIcon && <StartIcon className={classes.icon} />}
      {children}
    </button>
  );
}

export default Button;
