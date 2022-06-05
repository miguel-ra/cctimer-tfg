import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Button from "components/button/Button";
import Box from "components/flexboxgrid/Box";
import Input from "components/input/Input";
import Link from "components/link/Link";
import Spacer from "components/spacer/Spacer";
import Typography from "components/typography/Typography";
import { signUpPathname } from "features/router/pathnames";
import useForm from "shared/form/useForm";

import { useAuth, ViewErrors } from "./authViewModel";
import styles from "./Login.module.scss";

type Inputs = {
  email: string;
  password: string;
};

// TODO : Translate error messages

function Login() {
  const { t } = useTranslation();
  const { registerWithErrors, handleSubmit, clearErrors, setError } = useForm<Inputs>();
  const { loading, login, errors } = useAuth();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    clearErrors();
    login(data.email, data.password);
  };

  useEffect(() => {
    const entries = Object.entries(errors) as [keyof ViewErrors, string][];
    for (const [name, message] of entries) {
      setError(name, {
        type: "manual",
        message,
      });
    }
  }, [errors, setError]);

  return (
    <section className={styles.wrapper}>
      <form className={styles.login} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h1" secondary>
          {t("Log in")}
        </Typography>
        <Spacer h={3} />
        <Input
          {...registerWithErrors("email", {
            required: "What is your email?",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          size="large"
          placeholder={t("Email address")}
        />
        <Spacer h={1} />
        <Input
          {...registerWithErrors("password", {
            required: "What is your password?",
            minLength: { value: 6, message: t("Password must have at least 6 characters") },
          })}
          size="large"
          placeholder={t("Password")}
          type="password"
        />
        <Spacer h={2} />
        <Button type="submit" size="large" variant="contained" center color="blue" loading={loading}>
          {t("Log in")}
        </Button>
        <Spacer h={3} />
        <Box justifyContent="center">
          {t("Don't have an account?")} &nbsp;<Link to={signUpPathname}>{t("Sign up")}</Link>
        </Box>
      </form>
    </section>
  );
}

export default Login;
