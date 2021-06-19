import {
  createContext,
  lazy,
  ReactNode,
  Suspense,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import Spinner from "components/spinner/Spinner";
import useStyles from "components/modal/Modal.styles";

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
  const classes = useStyles();

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

  const state = useMemo(() => ({ openModal, closeModal }), [closeModal, openModal]);

  return (
    <ModalContext.Provider value={state}>
      <Suspense
        fallback={
          <div className={classes.overlay}>
            <Spinner delay={0} />
          </div>
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
