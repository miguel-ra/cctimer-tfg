import CubeNImage from "../cubeN/CubeNImage";
import { ScrambleImageProps } from "../Scramble";

import { ReactComponent as Cube8Template } from "./cube8.svg";

function Cube8Image(props: ScrambleImageProps) {
  return <CubeNImage CubeTemplate={Cube8Template} {...props} />;
}

export default Cube8Image;
