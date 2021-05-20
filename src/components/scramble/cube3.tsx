import cube3Scramble from "cctimer-scrambles/cube3";
import { lazy } from "react";

const scrambleGenerator = {
  getRandomScramble: cube3Scramble.getRandomScramble,
  ScrambleImage: lazy(() => import("./Cube3Image")),
};

export default scrambleGenerator;
