import cube3Scramble from "cctimer-scrambles/cube3";
import { ReactComponent as Cube3Template } from "./templates/cube3.svg";

function ScrambleImage(props: any) {
  return <Cube3Template {...props} />;
}

const scrambleGenerator = {
  getRandomScramble: cube3Scramble.getRandomScramble,
  ScrambleImage,
};

export default scrambleGenerator;
