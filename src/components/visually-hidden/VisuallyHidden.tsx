import clsx from "clsx";
import { ElementType, ReactNode } from "react";
import { createUseStyles } from "react-jss";

type VisuallyHiddenProps = {
  className?: string;
  as: ElementType;
  children: ReactNode;
};

const useStyles = createUseStyles({
  visuallyHidden: {
    border: "0",
    padding: "0",
    clip: "rect(0 0 0 0)",
    clipPath: "inset(100%)",
    height: "1px",
    width: "1px",
    margin: "-1px",
    overflow: "hidden",
    position: "absolute",
    appearance: "none",
    whiteSpace: "nowrap",
    wordWrap: "normal",
  },
});

function VisuallyHidden({ as: Component, className }: VisuallyHiddenProps) {
  const classes = useStyles();

  return <Component className={clsx(classes.visuallyHidden, className)} />;
}

export default VisuallyHidden;
