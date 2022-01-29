import CubeNImage from "../cubeN/CubeNImage";
import { ScrambleImageProps } from "../Scramble";

import Cube4Template from "./cube4.svg?component";

function Cube4Image(props: ScrambleImageProps) {
  return <CubeNImage CubeTemplate={Cube4Template} {...props} />;
}

export default Cube4Image;
