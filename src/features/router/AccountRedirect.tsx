import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";

import { useUser } from "features/app/appViewModel";

type AccountRedirectProps = {
  children: JSX.Element;
};

function AccountRedirect({ children }: AccountRedirectProps) {
  const { user } = useUser();
  const { i18n } = useTranslation();

  if (user) {
    return <Navigate to={`/${i18n.language}`} replace />;
  }

  return children;
}

export default AccountRedirect;
