import CubeNImage from "../cubeN/CubeNImage";
import { ScrambleImageProps } from "../Scramble";

import { ReactComponent as Cube11Template } from "./cube11.svg";

function Cube11Image(props: ScrambleImageProps) {
  return <CubeNImage CubeTemplate={Cube11Template} {...props} />;
}

export default Cube11Image;
