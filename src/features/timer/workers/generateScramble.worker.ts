import { Scramble } from "cctimer-scrambles";
import { PuzzleKey } from "models/puzzles/Puzzle";

type ScrambleGenerators = {
  [key in PuzzleKey]: () => Promise<typeof import("cctimer-scrambles/cube2")>;
};

type GenerateScrambleResponse = {
  data: { puzzleKey: PuzzleKey; randomScramble: Scramble };
};

const scrambleGenerators: ScrambleGenerators = {
  clock: () => import("cctimer-scrambles/clock"),
  cube2: () => import("cctimer-scrambles/cube2"),
  cube3: () => import("cctimer-scrambles/cube3"),
  cube4: () => import("cctimer-scrambles/cube4"),
};

async function generateScramble(puzzleKey: PuzzleKey) {
  const generator = (await scrambleGenerators[puzzleKey]())?.default;

  const response = { puzzleKey, randomScramble: generator() };
  console.log(response);
  return response;
}

// eslint-disable-next-line no-restricted-globals
const ctx: Worker = self as any;

ctx.addEventListener("message", ({ data: puzzleKey }: { data: PuzzleKey }) => {
  generateScramble(puzzleKey).then((response) => {
    ctx.postMessage(response);
  });
});

export type { ScrambleGenerators, GenerateScrambleResponse };

export { generateScramble };

// We need to export anything otherwise typescript would complain that
// it can't find a module
export default null as any;