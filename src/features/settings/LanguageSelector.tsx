import { useTranslation } from "react-i18next";
import { languages } from "i18n/i18n";
import SelectField from "components/field/SelectField";

function LanguageSelector() {
  const { t, i18n } = useTranslation();

  return (
    <SelectField
      label={t("Language")}
      name="settings.language"
      onChange={(value: string) => {
        i18n.changeLanguage(value);
      }}
      value={i18n.language.slice(0, 2)}
    >
      {languages.map(([key, label]) => (
        <option key={key} value={key}>
          {t(label)}
        </option>
      ))}
    </SelectField>
  );
}

export default LanguageSelector;
