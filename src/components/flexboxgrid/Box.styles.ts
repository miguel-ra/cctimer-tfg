import { CSSProperties } from "react";
import { createUseStyles } from "react-jss";
import { BreakpointKey } from "styles/breakpoints";
import breakpoints from "styles/breakpoints";

type BreakpointsStyles = {
  [key in BreakpointKey]?: CSSProperties;
};

type UseStylesProps = {
  propStyles?: CSSProperties;
  breakpointsStyles?: BreakpointsStyles;
};

function useStyles({ propStyles, breakpointsStyles = {} }: UseStylesProps) {
  return createUseStyles({
    box: {
      boxSizing: "border-box",
      display: "flex",
      flex: "0 1 auto",
      flexDirection: "row",
      flexWrap: "wrap",
      ...propStyles,
    },
    ...(Object.keys(breakpointsStyles) as Array<BreakpointKey>).reduce(
      (accu: any, key) => {
        accu[breakpoints.up(key)] = {
          box: breakpointsStyles[key],
        };
        return accu;
      },
      {}
    ),
  })();
}

export type { BreakpointsStyles };

export default useStyles;
