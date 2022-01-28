import { Scramble as ScrambleBase } from "cctimer-scrambles";

import { PuzzleKey } from "models/puzzles/Puzzle";

type Scramble = ScrambleBase & { puzzleKey?: PuzzleKey };

export type { Scramble };
