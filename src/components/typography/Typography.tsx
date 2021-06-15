import { ElementType, HTMLProps } from "react";
import clsx from "clsx";
import get from "lodash/get";
import { FontWeight, TypographyKey } from "styles/typography";
import useStyles from "./Typography.styles";

type TypographyProps = {
  className?: string;
  variant?: TypographyKey;
  gutterBottom?: boolean;
  weight?: FontWeight;
  as?: ElementType;
} & HTMLProps<HTMLElement>;

const componentMap: { [key in TypographyKey]?: ElementType } = {
  h1: "h2",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p",
};

function Typography({
  className,
  variant = "body1",
  gutterBottom = false,
  weight,
  as,
  ...props
}: TypographyProps) {
  const classes = useStyles({ weight });
  const Component = as || componentMap[variant] || "span";

  return (
    <Component
      className={clsx(classes.typography, get(classes, variant), className, {
        [classes.gutterBottom]: gutterBottom,
      })}
      {...props}
    />
  );
}

export default Typography;
