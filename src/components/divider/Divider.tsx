import clsx from "clsx";
import { createUseStyles } from "react-jss";

import theme from "styles/theme";

type DividerProps = {
  h?: number;
  disableTop?: boolean;
  disableBottom?: boolean;
  className?: string;
};

const useStyles = createUseStyles({
  divider: {
    width: "100%",
    border: "none",
    margin: ({ h }: DividerProps) => `calc(1.2rem * ${h}) 0`,
    borderBottom: `${theme.shape.borderWitdh} solid ${theme.palette.border.primary}`,
    transition: ` border ${theme.transition.duration.colorMode} linear`,
  },
  disableTop: {
    marginTop: 0,
  },
  disableBottom: {
    marginBottom: 0,
  },
});

function Divider({ h = 1, className, disableTop, disableBottom }: DividerProps) {
  const classes = useStyles({ h });

  return (
    <hr
      className={clsx(classes.divider, className, {
        [classes.disableTop]: disableTop,
        [classes.disableBottom]: disableBottom,
      })}
    />
  );
}

export default Divider;
