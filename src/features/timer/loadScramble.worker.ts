/* eslint-disable @typescript-eslint/no-explicit-any */
import { Scramble } from "cctimer-scrambles";

import { PuzzleKey, UserPuzzle } from "models/puzzles/Puzzle";

type ScrambleGenerators = {
  [key in PuzzleKey]: () => Promise<typeof import("cctimer-scrambles/cube2")>;
};

type LoadScrambleResponse = { data: { userPuzzle: UserPuzzle; randomScramble: Scramble } };

const scrambleGenerators: ScrambleGenerators = {
  clock: () => import("cctimer-scrambles/clock"),
  cube2: () => import("cctimer-scrambles/cube2"),
  cube3: () => import("cctimer-scrambles/cube3"),
  cube4: () => import("cctimer-scrambles/cube4"),
  cube5: () => import("cctimer-scrambles/cube5"),
  cube6: () => import("cctimer-scrambles/cube6"),
  cube7: () => import("cctimer-scrambles/cube7"),
  cube8: () => import("cctimer-scrambles/cube8"),
  cube9: () => import("cctimer-scrambles/cube9"),
  cube10: () => import("cctimer-scrambles/cube10"),
  cube11: () => import("cctimer-scrambles/cube11"),
  square1: () => import("cctimer-scrambles/square1"),
  skewb: () => import("cctimer-scrambles/skewb"),
  megaminx: () => import("cctimer-scrambles/megaminx"),
  gigaminx: () => import("cctimer-scrambles/gigaminx"),
  pyraminx: () => import("cctimer-scrambles/pyraminx"),
};

async function loadScramble(userPuzzle: UserPuzzle): Promise<LoadScrambleResponse["data"]> {
  const generator = (await scrambleGenerators[userPuzzle.key]())?.default;

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
