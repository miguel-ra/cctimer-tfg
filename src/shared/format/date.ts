import { LangKey } from "i18n/i18n";

function dateTimeFormat(language: LangKey, date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return new Intl.DateTimeFormat(language, options).format(date);
}

export { dateTimeFormat };
