import CubeNImage from "../cubeN/CubeNImage";
import { ScrambleImageProps } from "../Scramble";

import Cube10Template from "./cube10.svg?component";

function Cube10Image(props: ScrambleImageProps) {
  return <CubeNImage CubeTemplate={Cube10Template} {...props} />;
}

export default Cube10Image;
