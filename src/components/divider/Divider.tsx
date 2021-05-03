import { createUseStyles } from "react-jss";
import palette from "styles/palette";

const useStyles = createUseStyles({
  divider: {
    width: "100%",
    border: "none",
    margin: "1rem 0",
    borderBottom: `1px solid ${palette.border.primary}`,
  },
});

function Divider() {
  const classes = useStyles();

  return <hr className={classes.divider} />;
}

export default Divider;
