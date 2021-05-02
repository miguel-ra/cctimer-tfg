import {
  createContext,
  lazy,
  ReactNode,
  Suspense,
  useCallback,
  useContext,
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

  const openModal = useCallback((newContent) => {
    setContent(newContent);
  }, []);

  const closeModal = useCallback(() => {
    setContent(null);
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      <Suspense fallback={null}>
        <Modal containerId={containerId} closeModal={closeModal}>
          {content}
        </Modal>
      </Suspense>
      {children}
    </ModalContext.Provider>
  );
}

export { ModalProvider, useModal };
