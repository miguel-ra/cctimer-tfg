export const loginPathname = "/login";
export const signUpPathname = "/signup";

export const puzzlePathname = "/puzzle/:puzzleId";

export const roomCreatePathname = "/room/create";
export const roomJoinPathname = "/room/join";
export const roomPathname = "/room/:roomId";

export const buildPuzzlePathnameh = (puzzleId: string) => puzzlePathname.replace(":puzzleId", puzzleId);
