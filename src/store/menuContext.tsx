import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext } from "react";
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
  checkSelectedItem: (itemToCheck: SelectedItem) => boolean;
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
  const [selectedItem, setSelectedItem, getStoredSelectedItem] = useStorageState<SelectedItem | null>(
    "selectedItem",
    null
  );

  const checkSelectedItem = useCallback(
    (itemToCheck: SelectedItem) => {
      const storedSelectedItem = getStoredSelectedItem();
      if (!storedSelectedItem || !selectedItem) {
        setSelectedItem(null);
        return false;
      }
      return selectedItem.id === itemToCheck.id;
    },
    [getStoredSelectedItem, selectedItem, setSelectedItem]
  );

  return (
    <MenuContext.Provider value={{ selectedItem, setSelectedItem, checkSelectedItem }}>
      {children}
    </MenuContext.Provider>
  );
}

export type { SelectedItem };

export { MenuProvider, useMenu };
