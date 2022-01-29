import { LangKey } from "./i18n";
import translationEn from "./locales/en/translation.json";
import translationEs from "./locales/es/translation.json";
import translationPt from "./locales/pt/translation.json";

type Translation = { [key: string]: string };

type Resources = {
  [key in LangKey]?: { translation: Translation };
};

const resources: Resources = {
  en: { translation: translationEn },
  es: { translation: translationEs as unknown as Translation },
  pt: { translation: translationPt as unknown as Translation },
};

export default resources;
