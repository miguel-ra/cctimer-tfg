import CubeNImage from "../cubeN/CubeNImage";
import { ScrambleImageProps } from "../Scramble";

import Cube6Template from "./cube6.svg?component";

function Cube6Image(props: ScrambleImageProps) {
  return <CubeNImage CubeTemplate={Cube6Template} {...props} />;
}

export default Cube6Image;
