import clsx from "clsx";
import { HTMLAttributes, ReactNode } from "react";
import { createUseStyles } from "react-jss";

import theme from "styles/theme";

type ModalFooterProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const useStyles = createUseStyles({
  footer: {
    transition: ` border ${theme.transition.duration.colorMode} linear`,
    borderTop: `${theme.shape.borderWitdh} solid ${theme.palette.border.primary}`,
    padding: "1rem 1.5rem",
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    "& > *:not(:last-child)": {
      marginRight: "1.5rem",
    },
  },
});

function ModalFooter({ children, className, ...props }: ModalFooterProps) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.footer, className)} {...props}>
      {children}
    </div>
  );
}

export default ModalFooter;
