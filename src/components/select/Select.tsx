import clsx from "clsx";
import { ChangeEvent, InputHTMLAttributes, ReactElement, ReactNode, useEffect, useState } from "react";

import { ReactComponent as ArrowDownIcon } from "./ArrowDown.svg";
import useStyles from "./Select.styles";

type SelectProps = {
  sufix?: ReactElement;
  className?: string;
  children: ReactNode;
  onChange?: (value: string) => void;
  size?: "small" | "medium";
  width?: string;
} & Omit<InputHTMLAttributes<HTMLSelectElement>, "onChange" | "size">;

const defaultSufix = <ArrowDownIcon />;

function Select({
  sufix = defaultSufix,
  value: valueProp,
  children,
  onChange,
  size,
  width,
  ...props
}: SelectProps) {
  const [internalValue, setInternalValue] = useState(valueProp || "");
  const classes = useStyles({ width });

  useEffect(() => {
    if (valueProp !== internalValue) {
      setInternalValue(valueProp || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueProp]);

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    setInternalValue(value);
    window.requestAnimationFrame(() => {
      onChange?.(value);
    });
  }

  return (
    <div className={clsx(classes.wrapper, size)}>
      <select onChange={handleChange} className={classes.select} {...props}>
        {children}
      </select>
      {sufix && <span className={classes.sufix}>{sufix}</span>}
    </div>
  );
}

export default Select;
