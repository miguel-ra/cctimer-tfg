import clsx from "clsx";
import { ButtonHTMLAttributes, CSSProperties, ElementType, ReactElement, ReactNode } from "react";

import Link from "components/link/Link";
import { Color } from "styles/colors";

import styles from "./Button.module.scss";

type ButtonVariant = "ghost" | "contained" | "outlined";
type ButtonSize = "small" | "medium" | "large";
type ButtonShape = "normal" | "square";

type ButtonProps = {
  prefix?: ReactElement;
  fullWidth?: boolean;
  center?: boolean;
  className?: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  style?: CSSProperties;
  color?: Color | "currentColor";
  shape?: ButtonShape;
  to?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "prefix">;

function Button({
  prefix,
  fullWidth = false,
  center = false,
  className,
  children,
  variant = "ghost",
  color = "currentColor",
  size = "medium",
  style,
  shape = "normal",
  to,
  ...props
}: ButtonProps) {
  let Component: ReactElement | ElementType = "button";
  let componentProps = {};

  if (to) {
    Component = Link;
    componentProps = { to };
  }

  return (
    <Component
      style={style}
      className={clsx(
        styles.button,
        styles?.[variant],
        styles?.[shape],
        styles?.[size],
        {
          [styles.fullWidth]: fullWidth,
          [styles.center]: center,
        },
        color,
        className
      )}
      {...props}
      {...componentProps}
    >
      {prefix && <span className={styles.prefix}>{prefix}</span>}
      {children}
    </Component>
  );
}

export type { ButtonVariant };

export default Button;
