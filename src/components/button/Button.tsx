import clsx from "clsx";
import { ButtonHTMLAttributes, ElementType, ReactElement, ReactNode } from "react";

import Link from "components/link/Link";
import { Color } from "styles/colors";

import useStyles from "./Button.styles";

type ButtonVariant = "ghost" | "contained" | "outlined";
type ButtonSize = "small" | "medium" | "large";
type ButtonShape = "square";

type ButtonProps = {
  prefix?: ReactElement;
  fullWidth?: boolean;
  center?: boolean;
  className?: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  width?: string;
  color?: Color | "currentColor";
  shape?: ButtonShape;
  to?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "prefix">;

function Button({
  prefix,
  width,
  fullWidth = false,
  center = false,
  className,
  children,
  variant = "ghost",
  color = "currentColor",
  size = "medium",
  shape,
  to,
  ...props
}: ButtonProps) {
  const classes = useStyles({ center, width, fullWidth, color });

  let Component: ReactElement | ElementType = "button";
  let componentProps = {};

  if (to) {
    Component = Link;
    componentProps = { to };
  }

  return (
    <Component
      className={clsx(classes.button, className, size, shape, classes[variant])}
      {...props}
      {...componentProps}
    >
      {prefix && <span className={classes.prefix}>{prefix}</span>}
      {children}
    </Component>
  );
}

export type { ButtonVariant };

export default Button;
