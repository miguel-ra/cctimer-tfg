import {
  createContext,
  lazy,
  ReactNode,
  Suspense,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

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
    prevActiveElement.current = undefined;
    setContent(newContent);
  }, []);

  const closeModal = useCallback(() => {
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
      <Suspense fallback={null}>
        <Modal
          containerId={containerId}
          closeModal={closeModal}
          setPrevActiveElement={setPrevActiveElement}
        >
          {content}
        </Modal>
      </Suspense>
      {children}
    </ModalContext.Provider>
  );
}

export { ModalProvider, useModal };
