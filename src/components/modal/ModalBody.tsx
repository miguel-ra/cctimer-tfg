import clsx from "clsx";
import { HTMLAttributes, ReactNode } from "react";
import { createUseStyles } from "react-jss";

type ModalBodyProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const useStyles = createUseStyles({
  body: {
    display: "grid",
    alignItems: "flex-start",
    overflow: "auto",
  },
});

function ModalBody({ children, className, ...props }: ModalBodyProps) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.body, className)} {...props}>
      {children}
    </div>
  );
}

export default ModalBody;
