import { ChangeEvent, InputHTMLAttributes, useEffect, useState } from "react";
import clsx from "clsx";
import useStylesBase from "./Field.styles";
import useStyles from "./CheckboxField.styles";

type CheckboxFieldProps = {
  label: string;
  name: string;
  onChange?: (value: boolean) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "onChange" | "type">;

function CheckboxField({
  label,
  name,
  checked: checkedProp,
  className,
  onChange,
  ...props
}: CheckboxFieldProps) {
  const [internalValue, setInternalValue] = useState(checkedProp || false);
  const classesBase = useStylesBase();
  const classes = useStyles();

  useEffect(() => {
    if (checkedProp !== internalValue) {
      setInternalValue(checkedProp || false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedProp]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { checked } = event.target;
    setInternalValue(checked);
    window.requestAnimationFrame(() => {
      onChange?.(checked);
    });
  }

  return (
    <div className={clsx(classesBase.wrapper, classes.wrapper)}>
      <input
        id={name}
        name={name}
        type="checkbox"
        checked={onChange ? internalValue : undefined}
        onChange={onChange ? handleChange : undefined}
        className={clsx(classesBase.input, classes.input, className)}
        {...props}
      />
      <label htmlFor={name} className={clsx(classesBase.label, classes.label)}>
        {label}
      </label>
    </div>
  );
}

export default CheckboxField;
