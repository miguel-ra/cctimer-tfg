import clsx from "clsx";
import { ButtonHTMLAttributes, ElementType, ReactNode } from "react";
import { Color } from "styles/colors";
import useStyles from "./Button.styles";

type ButtonVariant = "text" | "contained" | "outlined";

type ButtonProps = {
  startIcon?: ElementType;
  fullWidth?: boolean;
  center?: boolean;
  className?: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: "medium" | "large";
  color?: Color | "currentColor";
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
  startIcon: StartIcon,
  fullWidth = false,
  center = false,
  className,
  children,
  variant = "text",
  color = "blue",
  size = "medium",
  ...props
}: ButtonProps) {
  const classes = useStyles({ center, fullWidth, color, size });

  return (
    <button className={clsx(classes.button, className, classes[variant])} {...props}>
      {StartIcon && <StartIcon className={classes.icon} />}
      {children}
    </button>
  );
}

export type { ButtonVariant };

export default Button;
