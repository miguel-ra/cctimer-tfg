import { useEffect, useRef } from "react";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import theme from "styles/theme";
import { ScrambleImageProps } from "../Scramble";
import { ReactComponent as ClockTemplate } from "./clock.svg";

const pegColors = [theme.palette.colors.yellow.darker, theme.palette.colors.yellow.main];

const useStyles = createUseStyles({
  root: {
    "& g[class^='clock']": {
      transition: `transform ${theme.transition.duration.scrambleColor} ease-in-out`,
    },
    "& circle": {
      transition: `fill ${theme.transition.duration.scrambleColor} ease-in-out`,
    },
  },
});

function ClockImage({ scramble, className, ...props }: ScrambleImageProps) {
  const classes = useStyles();
  const elementRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element || !scramble) {
      return;
    }

    const [dials, pegs] = scramble.split(";");

    [...dials.split(",")].map(Number).forEach((hour, index) => {
      const clock = element.querySelector(`.clock-${index}`);
      const transform = clock?.getAttribute("transform")?.replace(/rotate\([^)]*\)/, `rotate(${hour * 30})`);
      if (transform) {
        clock?.setAttribute("transform", transform);
      }
    });

    [...pegs.split(",")].map(Number).forEach((active, index) => {
      element.style.setProperty(`--pegs-front-${index}`, pegColors[active]);
      element.style.setProperty(`--pegs-back-${index}`, pegColors[1 - active]);
    });
  }, [scramble]);

  return <ClockTemplate className={clsx(classes.root, className)} ref={elementRef} {...props} />;
}

export default ClockImage;
