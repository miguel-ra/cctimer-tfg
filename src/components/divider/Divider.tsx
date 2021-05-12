import { createUseStyles } from "react-jss";
import theme from "styles/theme";

const useStyles = createUseStyles({
  divider: {
    width: "100%",
    border: "none",
    margin: "1rem 0",
    borderBottom: `1px solid ${theme.palette.border.primary}`,
    transition: ` border ${theme.transition.duration.colorMode} linear`,
  },
});

function Divider() {
  const classes = useStyles();

  return <hr className={classes.divider} />;
}

export default Divider;
