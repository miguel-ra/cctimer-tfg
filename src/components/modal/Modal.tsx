import { ReactNode, useEffect, useState } from "react";
import Portal from "components/portal/Portal";
import useStyles from "./Modal.styles";

type ModalProps = {
  containerId: string;
  closeModal: () => void;
  children?: ReactNode;
  setPrevActiveElement: (element: HTMLElement) => void;
};

function Modal({ containerId, closeModal, children, setPrevActiveElement }: ModalProps) {
  const [modalElement, setModalElement] = useState<HTMLElement>();
  const classes = useStyles();

  useEffect(() => {
    if (!children) {
      return;
    }
    function handler() {
      closeModal();
    }
    window.addEventListener("popstate", handler);
    return () => {
      window.removeEventListener("popstate", handler);
    };
  }, [children, closeModal]);

  useEffect(() => {
    if (!modalElement || !children) {
      return;
    }
    setPrevActiveElement(document.activeElement as HTMLElement);
    (document.activeElement as HTMLElement).blur();
    const modalElementCopy = modalElement;

    function handler(event: KeyboardEvent | null) {
      const focusableElements = modalElementCopy.querySelectorAll(
        'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="number"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
      );
      const firstFocusable = focusableElements[0] as HTMLElement;
      const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event?.key === "Escape") {
        event.stopPropagation();
        closeModal();
      }

      if (!modalElement?.contains(document.activeElement)) {
        event?.preventDefault();
        if (!document.body.classList.contains("mousedown")) {
          firstFocusable?.focus();
        }
        return;
      }

      if (event?.key !== "Tab") {
        return;
      }

      if (event?.shiftKey) {
        if (document.activeElement === firstFocusable) {
          // shift + tab
          lastFocusable.focus();
          event.preventDefault();
        }
      } else if (document.activeElement === lastFocusable) {
        // tab
        firstFocusable.focus();
        event?.preventDefault();
      }
    }

    handler(null);

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [children, closeModal, modalElement, setPrevActiveElement]);

  if (!children) {
    return null;
  }

  return (
    <Portal containerId={containerId}>
      <div data-testid="overlay" className={classes.overlay} onClick={() => closeModal()} />
      <div
        ref={(element) => {
          if (element) {
            setModalElement(element);
          }
        }}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={classes.modal}
      >
        {children}
      </div>
    </Portal>
  );
}

export default Modal;
