/* eslint-disable @typescript-eslint/no-explicit-any */
import { Scramble } from "cctimer-scrambles";
import clockGenerator from "cctimer-scrambles/clock";
import cube10Generator from "cctimer-scrambles/cube10";
import cube11Generator from "cctimer-scrambles/cube11";
import cube2Generator from "cctimer-scrambles/cube2";
import cube3Generator from "cctimer-scrambles/cube3";
import cube4Generator from "cctimer-scrambles/cube4";
import cube5Generator from "cctimer-scrambles/cube5";
import cube6Generator from "cctimer-scrambles/cube6";
import cube7Generator from "cctimer-scrambles/cube7";
import cube8Generator from "cctimer-scrambles/cube8";
import cube9Generator from "cctimer-scrambles/cube9";
import gigaminxGenerator from "cctimer-scrambles/gigaminx";
import megaminxGenerator from "cctimer-scrambles/megaminx";
import pyraminxGenerator from "cctimer-scrambles/pyraminx";
import skewbGenerator from "cctimer-scrambles/skewb";
import square1Generator from "cctimer-scrambles/square1";

import { PuzzleKey, UserPuzzle } from "../../models/puzzles/Puzzle";

type ScrambleGenerators = {
  [key in PuzzleKey]: typeof clockGenerator;
};

type LoadScrambleResponse = {
  data: { userPuzzle: UserPuzzle; randomScramble: Scramble };
};

const scrambleGenerators: ScrambleGenerators = {
  clock: clockGenerator,
  cube2: cube2Generator,
  cube3: cube3Generator,
  cube4: cube4Generator,
  cube5: cube5Generator,
  cube6: cube6Generator,
  cube7: cube7Generator,
  cube8: cube8Generator,
  cube9: cube9Generator,
  cube10: cube10Generator,
  cube11: cube11Generator,
  square1: square1Generator,
  skewb: skewbGenerator,
  megaminx: megaminxGenerator,
  gigaminx: gigaminxGenerator,
  pyraminx: pyraminxGenerator,
};

async function loadScramble(userPuzzle: UserPuzzle): Promise<LoadScrambleResponse["data"]> {
  const generator = scrambleGenerators[userPuzzle.key];

  return { userPuzzle, randomScramble: generator() };
}

const ctx: Worker = self as any;

ctx.addEventListener("message", ({ data: userPuzzle }: { data: UserPuzzle }) => {
  loadScramble(userPuzzle).then((response) => {
    ctx.postMessage(response);
  });
});

export type { ScrambleGenerators, LoadScrambleResponse };

// We need to export anything otherwise typescript would complain that
// it can't find a module
export default null as any;
