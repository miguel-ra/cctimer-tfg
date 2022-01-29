import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

console.log(initReactI18next);

import resources from "./resources";

type LangKey = "en" | "es" | "pt";

const supportedLangs: LangKey[] = ["en", "es", "pt"];

const languages: [LangKey, string][] = [
  // t("English")
  ["en", "English"],
  // t("Spanish")
  ["es", "Spanish"],
  // t("Portuguese")
  ["pt", "Portuguese"],
];

i18n.on("languageChanged", (langWithContry) => {
  const lang = langWithContry.slice(0, 2);
  const { pathname } = window.location;
  const selectedLangPattern = new RegExp("^/" + lang);
  const isUrlUpdated = selectedLangPattern.test(pathname);

  if (isUrlUpdated) {
    return;
  }

  const langPattern = new RegExp("^/(" + supportedLangs.join("|") + ")");
  const hasLangInURL = langPattern.test(pathname);
  let newUrl;

  if (hasLangInURL) {
    newUrl = pathname.replace(langPattern, `/${lang}`);
  } else {
    newUrl = `/${lang}${pathname}`;
  }

  window.history.replaceState(null, "", newUrl.replace(/\/$/, ""));
});

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    load: "languageOnly",
    supportedLngs: supportedLangs,
    fallbackLng: "en",
    resources,
    detection: {
      order: ["path", "localStorage", "navigator"],
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export type { LangKey };

export { languages };

export default i18n;
