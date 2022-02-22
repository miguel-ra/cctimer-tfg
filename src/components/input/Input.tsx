import clsx from "clsx";
import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

import styles from "./Input.module.scss";

type InputProps = {
  name: string;
  size?: "medium" | "large";
  error?: boolean;
  helperText?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "pattern" | "name" | "onChange" | "size">;

function Input(
  { name, size = "medium", className, error, helperText, ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <>
      <input ref={ref} name={name} className={clsx(styles.input, styles?.[size], className)} {...props} />
      {error && helperText}
    </>
  );
}

export default forwardRef(Input);
