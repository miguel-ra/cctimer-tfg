import { useEffect, useRef } from "react";
import { SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Button from "components/button/Button";
import Box from "components/flexboxgrid/Box";
import Input from "components/input/Input";
import Link from "components/link/Link";
import Spacer from "components/spacer/Spacer";
import Typography from "components/typography/Typography";
import { loginPathname } from "features/app/pathnames";
import useForm from "shared/form/useForm";

import { useAccount, ViewErrors } from "./accountViewModel";
import styles from "./SignUp.module.scss";

type Inputs = {
  email: string;
  password: string;
  passwordConfirm: string;
};

function SignUp() {
  const { t } = useTranslation();
  const { registerWithErrors, handleSubmit, watch, clearErrors, setError } = useForm<Inputs>();
  const { loading, signup, errors } = useAccount();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    clearErrors();
    signup(data.email, data.password);
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
      <form className={styles.signup} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h1" secondary>
          {t("Sign up")}
        </Typography>
        <Spacer h={3} />
        <Input
          {...registerWithErrors("email", {
            required: "You must specify an email",
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
            required: "You must specify a password",
            minLength: { value: 6, message: t("Password must have at least 6 characters") },
          })}
          size="large"
          placeholder={t("Password")}
          type="password"
        />
        <Spacer h={1} />
        <Input
          {...registerWithErrors("passwordConfirm", {
            validate: (value) => value === password.current || "The passwords do not match",
          })}
          size="large"
          placeholder={t("Confirm password")}
          type="password"
        />
        <Spacer h={2} />
        <Button type="submit" size="large" variant="contained" center color="blue" loading={loading}>
          {t("Sign up")}
        </Button>
        <Spacer h={3} />
        <Box justifyContent="center">
          {t("Already have an account?")} &nbsp;<Link to={loginPathname}>{t("Log in")}</Link>
        </Box>
      </form>
    </section>
  );
}

export default SignUp;
