import { FieldError } from "react-hook-form";

const defaultMessages: { [key: string]: string } = {
  // t("This field is required")
  required: "This field is required",
  pattern: ":S",
};

function getMessage(error?: FieldError) {
  if (error?.message) {
    return error?.message;
  }

  if (error?.type) {
    return defaultMessages?.[error?.type];
  }

  return undefined;
}

export { getMessage };
