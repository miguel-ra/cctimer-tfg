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

import { useAccount } from "./accountViewModel";
import styles from "./SignUp.module.scss";

type Inputs = {
  email: string;
  password: string;
  passwordConfirm: string;
};

function SignUp() {
  const { t } = useTranslation();
  const { signup } = useAccount();
  const { registerWithErrors, handleSubmit } = useForm<Inputs>({
    defaultValues: { email: "therollershark@gmail.com", password: "test123.", passwordConfirm: "test123." },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signup(data.email, data.password);
  };

  return (
    <section className={styles.wrapper}>
      <form className={styles.signup} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h1" secondary>
          {t("Sign up")}
        </Typography>
        <Spacer h={3} />
        <Input
          {...registerWithErrors("email", { required: true })}
          size="large"
          placeholder="Email address"
        />
        <Spacer h={1} />
        <Input
          {...registerWithErrors("password", { required: true, minLength: 6 })}
          size="large"
          placeholder="Password"
          type="password"
        />
        <Spacer h={1} />
        <Input
          {...registerWithErrors("passwordConfirm", { required: true, minLength: 6 })}
          size="large"
          placeholder="Confirm password"
          type="password"
        />
        <Spacer h={2} />
        <Button type="submit" size="large" variant="contained" center color="blue">
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
