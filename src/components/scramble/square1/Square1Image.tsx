import clsx from "clsx";
import { useEffect, useRef } from "react";
import { createUseStyles } from "react-jss";

import theme from "styles/theme";

import { ScrambleImageProps } from "../Scramble";

import drawScramble from "./drawScramble";

const useStyles = createUseStyles({
  root: {
    opacity: 0,
    transition: `opacity ${theme.transition.duration.scrambleColor} linear`,
    "& > svg": {
      width: "100%",
      height: "100%",
      alignSelf: "center",
      justifySelf: "center",
    },
  },
  visible: {
    opacity: 1,
  },
});

function Square1Image({ scramble, className }: ScrambleImageProps) {
  const classes = useStyles();
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!elementRef.current || !scramble) {
      return;
    }
    elementRef.current.innerHTML = "";
    drawScramble(elementRef.current, scramble);
  }, [scramble]);

  return (
    <div
      ref={elementRef}
      className={clsx(classes.root, className, { [classes.visible]: Boolean(scramble) })}
    />
  );
}

export default Square1Image;
