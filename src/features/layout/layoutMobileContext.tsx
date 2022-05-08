import { createContext, MutableRefObject, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

type LayoutMobileState = {
  openMenu: (() => void) | undefined;
  setOpenMenu: React.Dispatch<React.SetStateAction<(() => void) | undefined>>;
  closeMenu: (() => void) | undefined;
  setCloseMenu: React.Dispatch<React.SetStateAction<(() => void) | undefined>>;
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
  const [closeMenu, setCloseMenu] = useState<() => void>();
  const isDragDisabledRef = useRef(false);
  const location = useLocation();

  useEffect(() => {
    closeMenu?.();
  }, [closeMenu, location]);

  return (
    <LayoutMobileContext.Provider
      value={{ openMenu, setOpenMenu, closeMenu, setCloseMenu, isDragDisabledRef }}
    >
      {children}
    </LayoutMobileContext.Provider>
  );
}

export { LayoutMobileProvider, useLayoutMobile };
