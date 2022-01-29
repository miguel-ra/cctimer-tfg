import clsx from "clsx";
import { useEffect, useRef } from "react";
import { createUseStyles } from "react-jss";

import theme from "styles/theme";

import { ScrambleImageProps } from "../Scramble";

import { ReactComponent as PyraminxTemplate } from "./pyraminx.svg";

type FaceKey = "1" | "2" | "3" | "4";

const colorScheme: { [key in FaceKey]: string } = {
  "1": theme.palette.colors.green.main,
  "2": theme.palette.colors.red.main,
  "3": theme.palette.colors.yellow.main,
  "4": theme.palette.colors.blue.main,
};

const useStyles = createUseStyles({
  root: {
    "& path": {
      transition: `fill ${theme.transition.duration.scrambleColor} ease-in-out`,
    },
  },
});

function PyraminxImage({ scramble, className, ...props }: ScrambleImageProps) {
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

  return <PyraminxTemplate className={clsx(classes.root, className)} ref={elementRef} {...props} />;
}

export default PyraminxImage;
