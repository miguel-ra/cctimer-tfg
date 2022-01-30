export const loginPathname = "/login";
export const signUpPathname = "/signup";

export const puzzlePathname = "/puzzle/:puzzleId";

export const buildPuzzlePathnameh = (puzzleId: string) => puzzlePathname.replace(":puzzleId", puzzleId);
