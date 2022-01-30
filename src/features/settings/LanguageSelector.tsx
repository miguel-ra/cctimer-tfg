import { useTranslation } from "react-i18next";

import Select from "components/select/Select";
import { languages } from "i18n/i18n";

function LanguageSelector() {
  const { t, i18n } = useTranslation();

  return (
    <Select
      onChange={(value: string) => {
        i18n.changeLanguage(value);
      }}
      value={i18n.language.slice(0, 2)}
      size="small"
      width="12.5rem"
    >
      {languages.map(([key, label]) => (
        <option key={key} value={key}>
          {t(label)}
        </option>
      ))}
    </Select>
  );
}

export default LanguageSelector;
