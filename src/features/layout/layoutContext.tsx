import { createContext, ReactNode, useContext } from "react";

type LayoutValue = "mobile" | "desktop";

type LayoutState = {
  layout: LayoutValue;
};

type LayoutProviderProps = {
  layout: LayoutValue;
  children: ReactNode;
};

const LayoutContext = createContext<LayoutState | null>(null);

function useLayout() {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error("useLayout must be used within the LayoutContext");
  }
  return context;
}

function LayoutProvider({ layout, children }: LayoutProviderProps) {
  return <LayoutContext.Provider value={{ layout }}>{children}</LayoutContext.Provider>;
}

export type { LayoutValue };

export { LayoutProvider, useLayout };
