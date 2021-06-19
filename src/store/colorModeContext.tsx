import { createContext, ReactNode, useCallback, useContext, useEffect } from "react";
import useStorageState from "shared/hooks/useStorageState";

type ColorModeKey = "light" | "dark";

type ColorModeState = {
  colorMode: ColorModeKey;
  toggleColorMode: () => void;
};

type ColorModeProviderProps = {
  children: ReactNode;
};

const COLOR_MODES: { [key in ColorModeKey]: ColorModeKey } = {
  light: "light",
  dark: "dark",
};

const ColorModeContext = createContext<ColorModeState | null>(null);

function useColorMode() {
  const context = useContext(ColorModeContext);

  if (!context) {
    throw new Error("useColorMode must be used within the ColorModeContext");
  }
  return context;
}

function ColorModeProvider({ children }: ColorModeProviderProps) {
  const [colorMode, setColorMode] = useStorageState("colorMode", () =>
    window?.matchMedia("(prefers-color-scheme: dark)").matches ? COLOR_MODES.dark : COLOR_MODES.light
  );

  useEffect(() => {
    document.body.dataset.colorMode = colorMode;
  }, [colorMode]);

  useEffect(() => {
    const queryList = window.matchMedia("(prefers-color-scheme: dark)");
    function handler() {
      setColorMode(!!queryList.matches ? COLOR_MODES.dark : COLOR_MODES.light);
    }

    queryList.addEventListener("change", handler);

    return () => {
      queryList.removeEventListener("change", handler);
    };
  }, [setColorMode]);

  const toggleColorMode = useCallback(() => {
    setColorMode((prevColorMode: ColorModeKey) =>
      prevColorMode === COLOR_MODES.light ? COLOR_MODES.dark : COLOR_MODES.light
    );
  }, [setColorMode]);

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>{children}</ColorModeContext.Provider>
  );
}

export type { ColorModeKey };

export { useColorMode, ColorModeProvider };
