import { createUseStyles } from "react-jss";

type SpacerProps = {
  h?: number;
  w?: number;
};

const useStyles = createUseStyles({
  spacer: {
    display: "block",
    width: ({ w }: SpacerProps) => `calc(${w} * 1.2rem)`,
    height: ({ h }: SpacerProps) => `calc(${h} * 1.2rem)`,
    padding: "0 0 0 0",
    margin: "0 0 0 0",
  },
});

function Spacer({ w = 1, h = 1 }: SpacerProps) {
  const classes = useStyles({ w, h });

  return <span className={classes.spacer} />;
}

export default Spacer;
