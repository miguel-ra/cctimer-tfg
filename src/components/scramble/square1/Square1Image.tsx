import { useEffect, useRef } from "react";
import clsx from "clsx";
import { createUseStyles } from "react-jss";
import drawScramble from "./drawScramble";
import { ScrambleImageProps } from "../Scramble";

const useStyles = createUseStyles({
  root: {
    "& > svg": {
      width: "100%",
      height: "100%",
      alignSelf: "center",
      justifySelf: "center",
    },
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

  return <div ref={elementRef} className={clsx(classes.root, className)} />;
}

export default Square1Image;
