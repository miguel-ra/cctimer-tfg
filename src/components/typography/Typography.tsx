import { ElementType, HTMLProps } from "react";
import clsx from "clsx";
import { TypographyKey } from "styles/typography";
import useStyles from "./Typography.styles";

type TypographyProps = {
  className?: string;
  variant?: TypographyKey;
  gutterBottom?: boolean;
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
  ...props
}: TypographyProps) {
  const classes = useStyles();
  const Component = componentMap[variant] || "span";

  return (
    <Component
      className={clsx(
        classes.typography,
        (classes as any)?.[variant],
        className,
        {
          [classes.gutterBottom]: gutterBottom,
        }
      )}
      {...props}
    />
  );
}

export default Typography;
