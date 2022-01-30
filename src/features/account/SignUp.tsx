import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";

import Button from "components/button/Button";
import Box from "components/flexboxgrid/Box";
import Input from "components/input/Input";
import Link from "components/link/Link";
import Spacer from "components/spacer/Spacer";
import Typography from "components/typography/Typography";
import { loginPathname } from "features/app/pathnames";
import theme from "styles/theme";

const useStyles = createUseStyles({
  wrapper: {
    width: "100%",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    background: theme.palette.background.secondary,
    transition: theme.transition.generate(["background"]),
  },
  signup: {
    width: "100%",
    maxWidth: "320px",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
  },
  footer: {
    padding: "3.2rem",
  },
});

function SignUp() {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <section className={classes.wrapper}>
      <div className={classes.signup}>
        <Typography variant="h1" secondary>
          {t("Sign up")}
        </Typography>
        <Spacer h={3} />
        <Input size="large" placeholder="Email address" name="email" />
        <Spacer h={1} />
        <Input size="large" placeholder="Password" name="password" type="password" />
        <Spacer h={2} />
        <Button size="large" variant="contained" center color="blue">
          {t("Sign up")}
        </Button>
        <Spacer h={3} />
        <Box justifyContent="center">
          {t("Already have an account?")} &nbsp;<Link to={loginPathname}>{t("Log in")}</Link>
        </Box>
      </div>
    </section>
  );
}

export default SignUp;
