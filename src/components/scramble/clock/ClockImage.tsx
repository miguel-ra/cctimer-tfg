import { useEffect, useRef } from "react";
import palette from "styles/palette";
import { ScrambleImageProps } from "../Scramble";
import { ReactComponent as ClockTemplate } from "./clock.svg";

const pegColors = [palette.colors.yellow.dark, palette.colors.yellow.main];

function ClockImage({ scramble, ...props }: ScrambleImageProps) {
  const elementRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element || !scramble) {
      return;
    }

    const [dials, pegs] = scramble.split(";");

    [...dials.split(",")].map(Number).forEach((hour, index) => {
      const clock = element.querySelector(`.clock-${index}`);
      const transform = clock
        ?.getAttribute("transform")
        ?.replace(/rotate\([^)]*\)/, `rotate(${hour * 30})`);
      if (transform) {
        clock?.setAttribute("transform", transform);
      }
    });

    [...pegs.split(",")].map(Number).forEach((active, index) => {
      element.style.setProperty(`--pegs-front-${index}`, pegColors[active]);
      element.style.setProperty(`--pegs-back-${index}`, pegColors[1 - active]);
    });
  }, [scramble]);

  return <ClockTemplate ref={elementRef} {...props} />;
}

export default ClockImage;
