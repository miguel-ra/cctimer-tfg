import { CSSProperties, ElementType, ReactNode } from "react";
import { BreakpointKey } from "styles/breakpoints";
import breakpoints from "styles/breakpoints";
import useStyles, { BreakpointsStyles } from "./Box.styles";

interface BoxProps extends BreakpointsStyles, CSSProperties {
  as?: ElementType;
  children: ReactNode;
  componentProps?: object;
}

type ObjectStyles = CSSProperties | BreakpointsStyles;

function splitBreakpointsStyles(
  object: CSSProperties | BreakpointsStyles,
  keys: Array<CSSProperties | BreakpointKey>
) {
  return (Object.keys(object) as Array<keyof ObjectStyles>).reduce(
    (accu: [BreakpointsStyles, CSSProperties], key: keyof ObjectStyles) => {
      const accuKey = keys.includes(key) ? 0 : 1;
      accu[accuKey][key] = object[key];
      return accu;
    },
    [{}, {}]
  );
}

function Box({
  as: Component = "div",
  componentProps,
  children,
  ...props
}: BoxProps) {
  const [breakpointsStyles, propStyles] = splitBreakpointsStyles(
    props,
    breakpoints.keys
  );
  const classes = useStyles({ propStyles, breakpointsStyles });

  return (
    <Component className={classes.box} {...componentProps}>
      {children}
    </Component>
  );
}

export default Box;
