import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

import useStyles from "./IconButton.styles";

type IconButtonProps = {
  children: ReactNode;
  className?: string;
  size?: "small" | "medium";
} & ButtonHTMLAttributes<HTMLButtonElement>;

function IconButton({
  className,
  size = "medium",
  children,
  ...props
}: IconButtonProps) {
  const classes = useStyles({ size });
  return (
    <button className={clsx(classes.button, className)} {...props}>
      {children}
    </button>
  );
}

export default IconButton;
