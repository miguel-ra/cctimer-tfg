import { lazy } from "react";
import scramble from "cctimer-scrambles/cube2";
import { ScrambleGenerator } from "cctimer-scrambles";

const scrambleGenerator = {
  getRandomScramble: scramble.getRandomScramble,
  ScrambleImage: lazy(() => import("./Cube2Image")),
} as ScrambleGenerator;

export default scrambleGenerator;
