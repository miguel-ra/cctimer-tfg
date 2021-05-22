import { useEffect, useRef } from "react";
import palette from "styles/palette";
import { ScrambleImageProps } from "../Scramble";
import { ReactComponent as Cube2Template } from "./cube2.svg";

type FaceKey = "0" | "1" | "2" | "3" | "4" | "5";

const colorScheme: { [key in FaceKey]: string } = {
  "0": palette.colors.green.main,
  "1": palette.colors.yellow.main,
  "2": palette.colors.orange.main,
  "3": palette.colors.red.main,
  "4": palette.colors.white.main,
  "5": palette.colors.blue.main,
};

function Cube2Image({ scramble, ...props }: ScrambleImageProps) {
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

  return <Cube2Template ref={elementRef} {...props} />;
}

export default Cube2Image;
