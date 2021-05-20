import { ScrambleGenerator } from "cctimer-scrambles";

async function getRandomScramble() {
  const generator = (await import("components/scramble/cube3"))
    ?.default as ScrambleGenerator;

  return generator.getRandomScramble();
}

// eslint-disable-next-line no-restricted-globals
const ctx: Worker = self as any;

ctx.addEventListener("message", () => {
  getRandomScramble().then((response) => {
    ctx.postMessage(response);
  });
});

export { getRandomScramble };

// We need to export anything otherwise typescript would complain that
// it can't find a module
export default null as any;
