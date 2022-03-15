import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import ErrorNotification from "components/notification/ErrorNotification";
import SuccessNotification from "components/notification/SuccessNotification";
import EmailInUserError from "models/auth/errors/EmailnUseError";
import WeakPasswordError from "models/auth/errors/WeakPasswordError";
import { useAuthRepository } from "repositories/auth/authRepository";
import useNavigate from "shared/hooks/useNavigate";
import { useNotifications } from "store/notificationsContext";

type ViewErrors = {
  email?: string;
  password?: string;
};

function useAuth() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ViewErrors>({});
  const authRepository = useAuthRepository();
  const { addNotification } = useNotifications();
  const { t } = useTranslation();

  const login = useCallback(
    (email: string, password: string) => {
      setLoading(true);
      authRepository
        .login(email, password)
        .then(() => {
          addNotification(
            (props) => (
              <SuccessNotification title={t("Logged in!")} {...props}>
                {t("Happy cubing")} &nbsp;🎊
              </SuccessNotification>
            ),
            {
              timeOut: 2000,
            }
          );
        })
        .catch(() => {
          addNotification((props) => (
            // TODO: Add error handler (EMAIL_NOT_FOUND)
            <ErrorNotification {...props}>{t("Failed to log in")}</ErrorNotification>
          ));
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [addNotification, authRepository, t]
  );

  const signup = useCallback(
    (email: string, password: string) => {
      setLoading(true);
      authRepository
        .signup(email, password)
        .then(() => {
          addNotification(
            (props) => (
              <SuccessNotification title={t("Account created!")} {...props}>
                {t("Happy cubing")} &nbsp;🎊
              </SuccessNotification>
            ),
            {
              timeOut: 2000,
            }
          );
        })
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

  const logout = useCallback(() => {
    authRepository.logout().catch(() => {
      addNotification((props) => <ErrorNotification {...props}>{t("Failed to log out")}</ErrorNotification>);
    });
  }, [addNotification, authRepository, t]);

  return { loading, logout, errors, login, signup };
}

export type { ViewErrors };

export { useAuth };
