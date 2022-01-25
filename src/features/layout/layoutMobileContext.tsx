import { createContext, MutableRefObject, ReactNode, useContext, useRef, useState } from "react";

type LayoutMobileState = {
  openMenu: (() => void) | undefined;
  setOpenMenu: React.Dispatch<React.SetStateAction<(() => void) | undefined>>;
  isDragDisabledRef: MutableRefObject<boolean>;
};

type LayoutMobileProviderProps = {
  children: ReactNode;
};

const LayoutMobileContext = createContext<LayoutMobileState | null>(null);

function useLayoutMobile() {
  const context = useContext(LayoutMobileContext);

  if (!context) {
    throw new Error("useLayoutMobile must be used within the LayoutMobileContext");
  }
  return context;
}

function LayoutMobileProvider({ children }: LayoutMobileProviderProps) {
  const [openMenu, setOpenMenu] = useState<() => void>();
  const isDragDisabledRef = useRef(false);

  return (
    <LayoutMobileContext.Provider value={{ openMenu, setOpenMenu, isDragDisabledRef }}>
      {children}
    </LayoutMobileContext.Provider>
  );
}

export { LayoutMobileProvider, useLayoutMobile };
