import { useEffect, useRef } from "react";
import palette from "styles/palette";
import { ScrambleImageProps } from "../Scramble";
import { ReactComponent as Cube3Template } from "./cube3.svg";

type FaceKey = "U" | "R" | "F" | "L" | "B" | "D";

const colorScheme: { [key in FaceKey]: string } = {
  U: palette.colors.white.main,
  R: palette.colors.red.main,
  F: palette.colors.green.main,
  L: palette.colors.orange.main,
  B: palette.colors.blue.main,
  D: palette.colors.yellow.main,
};

function Cube3Image({ scramble, ...props }: ScrambleImageProps) {
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

  return <Cube3Template ref={elementRef} {...props} />;
}

export default Cube3Image;
