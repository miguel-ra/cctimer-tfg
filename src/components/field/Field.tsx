import {
  ChangeEvent,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from "react";
import clsx from "clsx";
import debounce from "lodash/debounce";
import useStyles from "./Field.styles";

type FieldProps = {
  label: string;
  name: string;
  pattern?: RegExp;
  onChange?: (value: string) => void;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "pattern" | "name" | "onChange"
>;

function Field({
  label,
  name,
  value: valueProp,
  pattern,
  className,
  onChange,
  ...props
}: FieldProps) {
  const [internalValue, setInternalValue] = useState(valueProp || "");
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
    (event: ChangeEvent<HTMLInputElement>) => {
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
    <div className={classes.wrapper}>
      <label htmlFor={name} className={classes.label}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={onChange || pattern ? internalValue : undefined}
        onChange={onChange || pattern ? handleChange : undefined}
        className={clsx(classes.input, className)}
        {...props}
      />
    </div>
  );
}

export default Field;
