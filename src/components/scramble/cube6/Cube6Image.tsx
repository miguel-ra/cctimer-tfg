import CubeNImage from "../cubeN/CubeNImage";
import { ScrambleImageProps } from "../Scramble";

import { ReactComponent as Cube6Template } from "./cube6.svg";

function Cube6Image(props: ScrambleImageProps) {
  return <CubeNImage CubeTemplate={Cube6Template} {...props} />;
}

export default Cube6Image;
