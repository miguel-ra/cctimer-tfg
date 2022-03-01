import clsx from "clsx";
import { useEffect, useRef } from "react";
import { createUseStyles } from "react-jss";

import theme from "styles/theme";

import { ScrambleImageProps } from "../Scramble";

import { ReactComponent as MegaminxTemplate } from "./megaminx.svg";

type FaceKey = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11";

const colorScheme: { [key in FaceKey]: string } = {
  "0": theme.palette.colors.white.main,
  "1": theme.palette.colors.green.dark,
  "2": theme.palette.colors.red.light,
  "3": theme.palette.colors.blue.main,
  "4": theme.palette.colors.yellow.dark,
  "5": theme.palette.colors.purple.main,
  "6": theme.palette.colors.yellow.light,
  "7": theme.palette.colors.pink.main,
  "8": theme.palette.colors.green.main,
  "9": theme.palette.colors.orange.main,
  "10": theme.palette.colors.blue.light,
  "11": theme.palette.colors.gray.main,
};

const useStyles = createUseStyles({
  root: {
    "& path": {
      transition: `fill ${theme.transition.duration.scrambleColor} ease-in-out`,
    },
  },
});

function MegaminxImage({ scramble, className, ...props }: ScrambleImageProps) {
  const classes = useStyles();
  const elementRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element || !scramble) {
      return;
    }
    ([...scramble.split(",")] as FaceKey[]).forEach((colorKey, index) => {
      element.style.setProperty(`--sticker-${index}`, colorScheme[colorKey]);
    });
  }, [scramble]);

  return <MegaminxTemplate className={clsx(classes.root, className)} ref={elementRef} {...props} />;
}

export default MegaminxImage;
