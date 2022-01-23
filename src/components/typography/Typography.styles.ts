import { createUseStyles } from "react-jss";
import typography, { fontWeight, FontWeight } from "styles/typography";

type UseStylesProps = {
  weight?: FontWeight;
};

const useStyles = createUseStyles({
  typography: {
    margin: 0,
    fontWeight: ({ weight }: UseStylesProps) => (weight ? fontWeight[weight] : undefined),
  },
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
