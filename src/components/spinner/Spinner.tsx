import { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { ReactComponent as IconSpinner } from "assets/icons/spinner.svg";

type SpinnerProps = {
  delay?: number;
};

const useStyles = createUseStyles({
  spinner: {
    width: "1.6rem",
    height: "1.6rem",
    animation:
      "$spin 1s cubic-bezier(0.5, 0.2, 0.5, 0.8) infinite, $reveal 0.25s linear forwards",
  },
  "@keyframes spin": {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" },
  },
  "@keyframes reveal": {
    from: { opacity: 0 },
    to: { opacity: 1 },
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
    <IconSpinner
      role="alert"
      aria-busy="true"
      aria-label="spinner"
      aria-hidden="false"
      className={classes.spinner}
    />
  );
}

export default Spinner;
