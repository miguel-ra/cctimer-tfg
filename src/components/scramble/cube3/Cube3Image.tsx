import clsx from "clsx";
import { useEffect, useRef } from "react";
import { createUseStyles } from "react-jss";

import theme from "styles/theme";

import { ScrambleImageProps } from "../Scramble";

import Cube3Template from "./cube3.svg?component";

type FaceKey = "U" | "R" | "F" | "L" | "B" | "D";

const colorScheme: { [key in FaceKey]: string } = {
  U: theme.palette.colors.white.main,
  R: theme.palette.colors.red.main,
  F: theme.palette.colors.green.main,
  L: theme.palette.colors.orange.main,
  B: theme.palette.colors.blue.main,
  D: theme.palette.colors.yellow.main,
};

const useStyles = createUseStyles({
  root: {
    "& path": {
      transition: `fill ${theme.transition.duration.scrambleColor} ease-in-out`,
    },
  },
});

function Cube3Image({ scramble, className, ...props }: ScrambleImageProps) {
  const classes = useStyles();
  const elementRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element || !scramble) {
      return;
    }
    ([...scramble] as FaceKey[]).forEach((char, index) => {
      element.style.setProperty(
        `--sticker-${index}`,
        colorScheme[char as FaceKey]
      );
    });
  }, [scramble]);

  return (
    <Cube3Template
      className={clsx(classes.root, className)}
      ref={elementRef}
      {...props}
    />
  );
}

export default Cube3Image;
