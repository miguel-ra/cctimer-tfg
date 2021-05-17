import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
} from "react";
import { PuzzleId, PuzzleKey } from "models/puzzles/Puzzle";
import useStorageState from "shared/hooks/useStorageState";

type SelectedItem = {
  id: PuzzleId;
  key: PuzzleKey;
  type: "puzzle";
};

type MenuState = {
  selectedItem: SelectedItem | null;
  setSelectedItem: Dispatch<SetStateAction<SelectedItem | null>>;
};

type MenuProviderProps = {
  children: ReactNode;
};

const MenuContext = createContext<MenuState | null>(null);

function useMenu() {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error("useMenu must be used within the MenuContext");
  }
  return context;
}

function MenuProvider({ children }: MenuProviderProps) {
  const [selectedItem, setSelectedItem] = useStorageState<SelectedItem | null>(
    "selectedItem",
    null
  );

  return (
    <MenuContext.Provider value={{ selectedItem, setSelectedItem }}>
      {children}
    </MenuContext.Provider>
  );
}

export { MenuProvider, useMenu };
