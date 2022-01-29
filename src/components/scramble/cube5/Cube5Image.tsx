import CubeNImage from "../cubeN/CubeNImage";
import { ScrambleImageProps } from "../Scramble";

import Cube5Template from "./cube5.svg?component";

function Cube5Image(props: ScrambleImageProps) {
  return <CubeNImage CubeTemplate={Cube5Template} {...props} />;
}

export default Cube5Image;
