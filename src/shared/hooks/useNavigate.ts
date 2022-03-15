import { useCallback } from "react";
import { useTranslation } from "react-i18next";
// eslint-disable-next-line no-restricted-imports
import { NavigateOptions, Path, useNavigate as useNavigateBase } from "react-router-dom";

function useNavigate() {
  const {
    i18n: { language },
  } = useTranslation();
  const navigateBase = useNavigateBase();

  const navigate = useCallback(
    (path: Partial<Path> | string, options?: NavigateOptions) => {
      if (typeof path !== "string") {
        navigateBase(path, options);
        return;
      }

      let basePath = `/${language}`;

      if (!path.startsWith("/")) {
        basePath = `${basePath}/`;
      }

      navigateBase(`${basePath}${path}`, options);
    },
    [language, navigateBase]
  );

  return navigate;
}

export default useNavigate;
