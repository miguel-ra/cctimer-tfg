import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Button from "components/button/Button";
import Box from "components/flexboxgrid/Box";
import Input from "components/input/Input";
import Link from "components/link/Link";
import Spacer from "components/spacer/Spacer";
import Typography from "components/typography/Typography";
import { signUpPathname } from "features/app/pathnames";

import { useAccount } from "./accountViewModel";
import styles from "./Login.module.scss";

type Inputs = {
  email: string;
  password: string;
};

function Login() {
  const { t } = useTranslation();
  const {} = useAccount();
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <section className={styles.wrapper}>
      <form className={styles.login} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h1" secondary>
          {t("Log in")}
        </Typography>
        <Spacer h={3} />
        <Input
          size="large"
          placeholder="Email address"
          {...register("email", { required: true, maxLength: 20 })}
        />
        <Spacer h={1} />
        <Input
          size="large"
          placeholder="Password"
          type="password"
          {...register("password", { required: true, maxLength: 20 })}
        />
        <Spacer h={2} />
        <Button type="submit" size="large" variant="contained" center color="blue">
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
