import { Scramble } from "cctimer-scrambles";
import { PuzzleKey } from "models/puzzles/Puzzle";

type ScrambleGenerators = {
  [key in PuzzleKey]: () => Promise<typeof import("cctimer-scrambles/cube2")>;
};

type LoadScrambleResponse = { puzzleKey: PuzzleKey; randomScramble: Scramble };

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

async function loadScramble(puzzleKey: PuzzleKey): Promise<LoadScrambleResponse> {
  const generator = (await scrambleGenerators[puzzleKey]())?.default;

  return { puzzleKey, randomScramble: generator() };
}

// eslint-disable-next-line no-restricted-globals
const ctx: Worker = self as any;

ctx.addEventListener("message", ({ data: puzzleKey }: { data: PuzzleKey }) => {
  loadScramble(puzzleKey).then((response) => {
    ctx.postMessage(response);
  });
});

export type { ScrambleGenerators, LoadScrambleResponse };

// We need to export anything otherwise typescript would complain that
// it can't find a module
export default null as any;
