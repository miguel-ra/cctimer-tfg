import { lazy } from "react";
import scramble from "cctimer-scrambles/cube3";
import { ScrambleGenerator } from "cctimer-scrambles";

const scrambleGenerator = {
  getRandomScramble: scramble.getRandomScramble,
  ScrambleImage: lazy(() => import("./Cube3Image")),
} as ScrambleGenerator;

export default scrambleGenerator;
