import { PuzzleId, PuzzleKey } from "models/puzzles/Puzzle";
import { RoomId } from "models/rooms/Room";

enum SelectedItemType {
  Puzzle = "puzzle",
  Room = "room",
}

type SelectedItemPuzzle = {
  id: PuzzleId;
  key: PuzzleKey;
  type: SelectedItemType.Puzzle;
};

type SelectedItemRoom = {
  id: RoomId;
  key: PuzzleKey;
  type: SelectedItemType.Room;
};

type SelectedItem = SelectedItemPuzzle | SelectedItemRoom;

export type { SelectedItem };
export { SelectedItemType };
