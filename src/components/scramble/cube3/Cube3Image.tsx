import { useEffect, useRef } from "react";
import palette from "styles/palette";
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

function Cube3Image({ randomScramble, ...props }: any) {
  const elementRef = useRef<HTMLElement | null>();

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }
    [...randomScramble.state].forEach((char: FaceKey, index) => {
      element.style.setProperty(`--sticker-${index}`, colorScheme[char]);
    });
  }, [randomScramble.state]);

  return <Cube3Template ref={elementRef} {...props} />;
}

export default Cube3Image;
