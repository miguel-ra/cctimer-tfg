import clsx from "clsx";
import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

import { ReactComponent as ErrorIcon } from "assets/icons/error.svg";

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
      <input
        ref={ref}
        name={name}
        className={clsx(styles.input, styles?.[size], { [styles.error]: error }, className)}
        {...props}
      />
      {error && (
        <>
          <div className={styles.helperText}>
            <ErrorIcon /> <span>{helperText}</span>
          </div>
        </>
      )}
    </>
  );
}

export default forwardRef(Input);
