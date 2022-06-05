import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
// eslint-disable-next-line no-restricted-imports
import { Link as LinkBase, LinkProps as LinkBaseProps } from "react-router-dom";

import theme from "styles/theme";

type LinkProps = LinkBaseProps & {
  to: string;
};

const useStyles = createUseStyles({
  link: {
    textDecoration: "none",
    color: theme.palette.colors.blue.main,
    "&:hover": {
      backgroundImage: `linear-gradient(${theme.palette.colors.blue.main},${theme.palette.colors.blue.main})`,
      backgroundSize: "100% 1px",
      backgroundPosition: "0 100%",
      backgroundRepeat: "no-repeat",
    },
  },
});

function Link({ to: toProp, ...props }: LinkProps) {
  const { i18n } = useTranslation();
  const classes = useStyles();

  let to = toProp;

  if (to.startsWith("/")) {
    to = `/${i18n.language.slice(0, 2)}${to}`;
  }

  return <LinkBase className={classes.link} to={to} {...props} />;
}

export default Link;
