import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import ErrorNotification from "components/notification/ErrorNotification";
import EmailInUserError from "models/auth/errors/EmailnUseError";
import WeakPasswordError from "models/auth/errors/WeakPasswordError";
import { useAuthRepository } from "repositories/auth/authRepository";
import { useNotifications } from "store/notificationsContext";

type ViewErrors = {
  email?: string;
  password?: string;
};

function useAccount() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ViewErrors>({});
  const authRepository = useAuthRepository();
  const { addNotification } = useNotifications();
  const { t } = useTranslation();

  const signup = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      authRepository
        .signup(email, password)
        .catch((error) => {
          switch (error.constructor) {
            case EmailInUserError:
              setErrors({ email: t("Email already in use") });
              return;
            case WeakPasswordError:
              setErrors({ password: t("The password must be at least 6 digits long") });
              return;
            default:
              addNotification((props) => (
                <ErrorNotification {...props}>{t("Puzzle could not be added")}</ErrorNotification>
              ));
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [addNotification, authRepository, t]
  );

  return { loading, errors, signup };
}

export type { ViewErrors };

export { useAccount };
