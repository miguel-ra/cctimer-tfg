import { PuzzleId, PuzzleKey } from "models/puzzles/Puzzle";
import { RoomId } from "models/rooms/Room";

enum SelectedItemType {
  Puzzle = "puzzle",
  Room = "room",
}

type SelectedItem =
  | {
      id: PuzzleId;
      key: PuzzleKey;
      type: SelectedItemType.Puzzle;
    }
  | {
      id: RoomId;
      key: PuzzleKey;
      type: SelectedItemType.Room;
    }
  | undefined;

export type { SelectedItem };
export { SelectedItemType };
