import { lazy } from "react";
import cube3Scramble from "cctimer-scrambles/cube3";
import { ScrambleGenerator } from "cctimer-scrambles";

const scrambleGenerator = {
  getRandomScramble: cube3Scramble.getRandomScramble,
  ScrambleImage: lazy(() => import("./Cube3Image")),
} as ScrambleGenerator;

export default scrambleGenerator;
