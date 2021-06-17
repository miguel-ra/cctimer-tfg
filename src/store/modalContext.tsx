import { createContext, lazy, ReactNode, Suspense, useCallback, useContext, useRef, useState } from "react";
import Box from "components/flexboxgrid/Box";
import Spinner from "components/spinner/Spinner";

type ModalState = {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
};

type ModalProviderProps = {
  children: ReactNode;
};

const containerId = "root-modal";
const Modal = lazy(() => import("components/modal/Modal"));

const ModalContext = createContext<ModalState | null>(null);

function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within the ModalContext");
  }
  return context;
}

function ModalProvider({ children }: ModalProviderProps) {
  const [content, setContent] = useState<ReactNode | null>(null);
  const prevActiveElement = useRef<HTMLElement>();

  const openModal = useCallback((newContent) => {
    if (window.location.hash !== "#modal") {
      const pathWithHash = `${window.location.href.split("#")[0]}#modal`;
      window.history.pushState(null, "", pathWithHash);
    }
    prevActiveElement.current = undefined;
    setContent(newContent);
  }, []);

  const closeModal = useCallback(() => {
    if (window.location.hash === "#modal") {
      window.history.back();
    }
    setContent(null);
    if (prevActiveElement.current) {
      if (!document.body.classList.contains("mousedown")) {
        prevActiveElement.current?.focus();
      }
      prevActiveElement.current = undefined;
    }
  }, []);

  const setPrevActiveElement = useCallback((element: HTMLElement) => {
    if (!prevActiveElement.current) {
      prevActiveElement.current = element;
    }
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      <Suspense
        fallback={
          <Box display="flex" placeContent="center" width="100%" height="100%">
            <Spinner delay={0} />
          </Box>
        }
      >
        <Modal containerId={containerId} closeModal={closeModal} setPrevActiveElement={setPrevActiveElement}>
          {content}
        </Modal>
      </Suspense>
      {children}
    </ModalContext.Provider>
  );
}

export { ModalProvider, useModal };
