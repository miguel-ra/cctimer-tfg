import CubeNImage from "../cubeN/CubeNImage";
import { ScrambleImageProps } from "../Scramble";

import Cube11Template from "./cube11.svg?component";

function Cube11Image(props: ScrambleImageProps) {
  return <CubeNImage CubeTemplate={Cube11Template} {...props} />;
}

export default Cube11Image;
