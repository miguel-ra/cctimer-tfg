import { HTMLAttributes, ReactNode } from "react";
import { createUseStyles } from "react-jss";

import theme from "styles/theme";

type ButtonGroupProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const useStyles = createUseStyles({
  root: {
    display: "flex",
    "& > *": {
      borderRadius: 0,
      zIndex: 0,
      margin: "0 -1px 0",
      "&:hover, &:focus": {
        zIndex: 1,
      },
      "&[disabled]": {
        zIndex: 2,
      },
      "&:first-child": {
        borderTopLeftRadius: theme.shape.borderRadius,
        borderBottomLeftRadius: theme.shape.borderRadius,
      },
      "&:last-child": {
        borderTopRightRadius: theme.shape.borderRadius,
        borderBottomRightRadius: theme.shape.borderRadius,
      },
    },
  },
});

function ButtonGroup({ children, ...props }: ButtonGroupProps) {
  const classes = useStyles();

  return (
    <div {...props} className={classes.root} role="group">
      {children}
    </div>
  );
}

export default ButtonGroup;
