import { useEffect, useRef } from "react";
import palette from "styles/palette";
import { ReactComponent as Cube2Template } from "./cube2.svg";

const colorScheme = [
  palette.colors.green.main,
  palette.colors.yellow.main,
  palette.colors.orange.main,
  palette.colors.red.main,
  palette.colors.white.main,
  palette.colors.blue.main,
];

function Cube2Image({ randomScramble, ...props }: any) {
  const elementRef = useRef<HTMLElement | null>();

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }
    [...randomScramble.state].forEach((colorKey: number, index) => {
      element.style.setProperty(`--sticker-${index}`, colorScheme[colorKey]);
    });
  }, [randomScramble.state]);

  return <Cube2Template ref={elementRef} {...props} />;
}

export default Cube2Image;
