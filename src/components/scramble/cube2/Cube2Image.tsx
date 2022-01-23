import clsx from "clsx";
import { useEffect, useRef } from "react";
import { createUseStyles } from "react-jss";

import theme from "styles/theme";

import { ScrambleImageProps } from "../Scramble";

import { ReactComponent as Cube2Template } from "./cube2.svg";

type FaceKey = "0" | "1" | "2" | "3" | "4" | "5";

const colorScheme: { [key in FaceKey]: string } = {
  "0": theme.palette.colors.green.main,
  "1": theme.palette.colors.yellow.main,
  "2": theme.palette.colors.orange.main,
  "3": theme.palette.colors.red.main,
  "4": theme.palette.colors.white.main,
  "5": theme.palette.colors.blue.main,
};

const useStyles = createUseStyles({
  root: {
    "& path": {
      transition: `fill ${theme.transition.duration.scrambleColor} ease-in-out`,
    },
  },
});

function Cube2Image({ scramble, className, ...props }: ScrambleImageProps) {
  const classes = useStyles();
  const elementRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element || !scramble) {
      return;
    }
    ([...scramble] as FaceKey[]).forEach((colorKey, index) => {
      element.style.setProperty(`--sticker-${index}`, colorScheme[colorKey]);
    });
  }, [scramble]);

  return (
    <Cube2Template
      className={clsx(classes.root, className)}
      ref={elementRef}
      {...props}
    />
  );
}

export default Cube2Image;
