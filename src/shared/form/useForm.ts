import get from "lodash/get";
import { useCallback } from "react";
import {
  FieldError,
  FieldPath,
  FieldValues,
  RegisterOptions,
  useForm as useFormBase,
  UseFormProps,
} from "react-hook-form";

import { getMessage } from "./messages";

type FieldName<T> = FieldPath<T>;
type FieldOptions<T> = RegisterOptions<T, FieldName<T>>;

function useForm<T extends FieldValues>(props?: UseFormProps<T>) {
  const form = useFormBase<T>(props);
  const {
    register,
    formState: { errors },
  } = form;

  const registerWithErrors = useCallback(
    (name: FieldName<T>, options: FieldOptions<T>) => {
      const error = get(errors, name) as FieldError;
      return {
        error: !!error,
        helperText: getMessage(error),
        ...register(name, options),
      };
    },
    [errors, register]
  );

  return { ...form, registerWithErrors };
}

export default useForm;
