import { createUseStyles } from "react-jss";

import theme from "styles/theme";
import typography, { fontWeight, FontWeight } from "styles/typography";

type UseStylesProps = {
  weight?: FontWeight;
  secondary?: boolean;
};

const useStyles = createUseStyles({
  typography: ({ weight, secondary }: UseStylesProps) => ({
    margin: 0,
    transition: theme.transition.generate(["color"]),
    fontWeight: weight ? fontWeight[weight] : undefined,
    color: secondary ? theme.palette.text.secondary : undefined,
  }),
  gutterBottom: {
    marginBottom: "0.35em",
  },
  h1: typography.h1,
  h2: typography.h2,
  h3: typography.h3,
  h4: typography.h4,
  h5: typography.h5,
  h6: typography.h6,
  subtitle1: typography.subtitle1,
  subtitle2: typography.subtitle2,
  body1: typography.body1,
  body2: typography.body2,
  button: typography.button,
  caption: typography.caption,
  overline: typography.overline,
});

export default useStyles;
