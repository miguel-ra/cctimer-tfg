import { ChangeEvent, InputHTMLAttributes, useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import debounce from "lodash/debounce";
import useStylesBase from "./Field.styles";
import { createUseStyles } from "react-jss";
import theme from "styles/theme";

type TextFieldProps = {
  label: string;
  name: string;
  pattern?: RegExp;
  onChange?: (value: string) => void;
} & Omit<InputHTMLAttributes<HTMLTextAreaElement>, "pattern" | "name" | "onChange">;

const useStyles = createUseStyles({
  wrapper: {
    gridTemplateColumns: "1fr",
  },
  textarea: {
    ...theme.typography.body2,
    resize: "none",
    width: "100%",
    padding: "0.5rem",
  },
});

function TextField({
  label,
  name,
  value: valueProp,
  pattern,
  className,
  onChange,
  ...props
}: TextFieldProps) {
  const [internalValue, setInternalValue] = useState(valueProp || "");
  const classesBase = useStylesBase();
  const classes = useStyles();

  useEffect(() => {
    if (valueProp !== internalValue) {
      setInternalValue(valueProp || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueProp]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceOnChange = useCallback(
    debounce((value) => onChange?.(value), 300),
    []
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target;
      if (pattern) {
        const regex = new RegExp(pattern);
        if (!regex.test(value)) {
          return;
        }
      }
      setInternalValue(value);
      debounceOnChange(value);
    },
    [debounceOnChange, pattern]
  );

  return (
    <div className={clsx(classesBase.wrapper, classes.wrapper)}>
      <label htmlFor={name} className={classesBase.label}>
        {label}
      </label>
      <textarea
        rows={3}
        id={name}
        name={name}
        value={onChange || pattern ? internalValue : undefined}
        onChange={onChange || pattern ? handleChange : undefined}
        className={clsx(classesBase.input, classes.textarea, className)}
        {...props}
      />
    </div>
  );
}

export default TextField;
