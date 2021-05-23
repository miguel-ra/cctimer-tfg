import CubeNImage from "../cubeN/CubeNImage";
import { ScrambleImageProps } from "../Scramble";
import { ReactComponent as Cube7Template } from "./cube7.svg";

function Cube7Image(props: ScrambleImageProps) {
  return <CubeNImage CubeTemplate={Cube7Template} {...props} />;
}

export default Cube7Image;
