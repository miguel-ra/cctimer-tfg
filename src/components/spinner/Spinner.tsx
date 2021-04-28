import { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { ReactComponent as IconSpinner } from "assets/icons/spinner.svg";

type SpinnerProps = {
  delay?: number;
};

const useStyles = createUseStyles({
  icon: {
    width: "1.6rem",
    height: "1.6rem",
    animation: "$spin 1s linear infinite",
  },
  "@keyframes spin": {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" },
  },
});

function Spinner({ delay = 250 }: SpinnerProps) {
  const [visible, setVisible] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setVisible(true);
    }, delay);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay]);

  if (!visible) {
    return null;
  }

  return (
    <IconSpinner role="img" aria-label="spinner" className={classes.icon} />
  );
}

export default Spinner;
