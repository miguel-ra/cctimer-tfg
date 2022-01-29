import CubeNImage from "../cubeN/CubeNImage";
import { ScrambleImageProps } from "../Scramble";

import Cube8Template from "./cube8.svg?component";

function Cube8Image(props: ScrambleImageProps) {
  return <CubeNImage CubeTemplate={Cube8Template} {...props} />;
}

export default Cube8Image;
