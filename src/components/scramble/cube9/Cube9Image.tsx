import CubeNImage from "../cubeN/CubeNImage";
import { ScrambleImageProps } from "../Scramble";
import { ReactComponent as Cube9Template } from "./cube9.svg";

function Cube9Image(props: ScrambleImageProps) {
  return <CubeNImage CubeTemplate={Cube9Template} {...props} />;
}

export default Cube9Image;
