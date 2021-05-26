import { createUseStyles } from "react-jss";
import theme from "styles/theme";
import Typography from "components/typography/Typography";

type ScrambleTextProps = {
  children: string;
};

const useStyles = createUseStyles({
  root: {
    position: "absolute",
    width: "100%",
    padding: "1.5rem",
    textAlign: "center",
    whiteSpace: "pre-wrap",
    overflowWrap: "break-word",
    fontSize: "1.6rem",
    [theme.breakpoints.up("md")]: {
      padding: "2rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "2rem",
    },
  },
});

function ScrambleText({ children }: ScrambleTextProps) {
  const classes = useStyles();

  return (
    <Typography variant="h6" className={classes.root}>
      {children}
    </Typography>
  );
}

export default ScrambleText;
