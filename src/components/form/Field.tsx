import { ReactNode } from "react";

import useStyles from "./Field.styles";

type FieldProps = {
  label: string;
  name: string;
  children: ReactNode;
};

function Field({ label, name, children }: FieldProps) {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <label htmlFor={name} className={classes.label}>
        {label}
      </label>
      {children}
    </div>
  );
}

export default Field;
