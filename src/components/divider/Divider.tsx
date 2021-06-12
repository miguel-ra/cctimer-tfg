import clsx from "clsx";
import { createUseStyles } from "react-jss";
import theme from "styles/theme";

type DividerProps = {
  disableTop?: boolean;
  disableBottom?: boolean;
};

const useStyles = createUseStyles({
  divider: {
    width: "100%",
    border: "none",
    margin: "1.5rem 0",
    borderBottom: `1px solid ${theme.palette.border.primary}`,
    transition: ` border ${theme.transition.duration.colorMode} linear`,
  },
  disableTop: {
    marginTop: 0,
  },
  disableBottom: {
    marginBottom: 0,
  },
});

function Divider({ disableTop, disableBottom }: DividerProps) {
  const classes = useStyles();

  return (
    <hr
      className={clsx(classes.divider, {
        [classes.disableTop]: disableTop,
        [classes.disableBottom]: disableBottom,
      })}
    />
  );
}

export default Divider;
