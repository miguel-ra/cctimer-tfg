import { FieldError } from "react-hook-form";

const defaultMessages: { [key: string]: string } = {
  // t("This field is required")
  required: "This field is required",
  min: "Sube un poco más, no llegas al mínimo",
  max: "A donde vas loco! Baja esa cifra",
  maxLength: "Te has pasado escribiendo, borra algunos caracteres",
  minLength: "No seas tímido, escribe algún caracter más",
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
