import clsx from "clsx";
import {
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useState,
} from "react";

import useStylesBase from "./Field.styles";
import useStyles from "./SelectField.styles";

type SelectFieldProps = {
  label: string;
  name: string;
  onChange?: (value: string) => void;
  children: ReactNode;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "onChange" | "type">;

function SelectField({
  label,
  name,
  value: valueProp,
  className,
  onChange,
  children,
}: SelectFieldProps) {
  const [internalValue, setInternalValue] = useState(valueProp || "");
  const classes = useStyles();
  const classesBase = useStylesBase();

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
    <div className={classesBase.wrapper}>
      <label htmlFor={name} className={classesBase.label}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        className={clsx(classesBase.input, className, classes.select)}
        value={onChange ? internalValue : undefined}
        onChange={onChange ? handleChange : undefined}
      >
        {children}
      </select>
    </div>
  );
}

export default SelectField;
