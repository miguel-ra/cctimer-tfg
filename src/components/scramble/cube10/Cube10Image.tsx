import CubeNImage from "../cubeN/CubeNImage";
import { ScrambleImageProps } from "../Scramble";
import { ReactComponent as Cube10Template } from "./cube10.svg";

function Cube10Image(props: ScrambleImageProps) {
  return <CubeNImage CubeTemplate={Cube10Template} {...props} />;
}

export default Cube10Image;
