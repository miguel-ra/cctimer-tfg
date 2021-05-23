import CubeNImage from "../cubeN/CubeNImage";
import { ScrambleImageProps } from "../Scramble";
import { ReactComponent as Cube4Template } from "./cube4.svg";

function Cube4Image(props: ScrambleImageProps) {
  return <CubeNImage CubeTemplate={Cube4Template} {...props} />;
}

export default Cube4Image;
