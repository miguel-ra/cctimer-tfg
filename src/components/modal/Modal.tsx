import { ReactNode, useEffect, useState } from "react";
import Portal from "components/portal/Portal";
import useStyles from "./Modal.styles";

type ModalProps = {
  containerId: string;
  closeModal: () => void;
  children?: ReactNode;
};

function Modal({ containerId, closeModal, children }: ModalProps) {
  const [modalElement, setModalElement] = useState<HTMLElement>();
  const classes = useStyles();

  useEffect(() => {
    if (!modalElement || !children) {
      return;
    }
    (document.activeElement as HTMLElement).blur();
    const modalElementCopy = modalElement;

    function handler(event: KeyboardEvent) {
      const focusableElements = modalElementCopy.querySelectorAll(
        'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="number"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
      );
      const firstFocusable = focusableElements[0] as HTMLElement;
      const lastFocusable = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (event.key === "Escape") {
        closeModal();
      }

      if (event.key !== "Tab") {
        return;
      }

      if (!modalElement?.contains(document.activeElement)) {
        event.preventDefault();
        firstFocusable?.focus();
        return;
      }

      if (event.shiftKey) {
        if (document.activeElement === firstFocusable) {
          // shift + tab
          lastFocusable.focus();
          event.preventDefault();
        }
      } else if (document.activeElement === lastFocusable) {
        // tab
        firstFocusable.focus();
        event.preventDefault();
      }
    }

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [children, closeModal, modalElement]);

  if (!children) {
    return null;
  }

  return (
    <Portal containerId={containerId}>
      <div
        data-testid="overlay"
        className={classes.overlay}
        onClick={() => closeModal()}
      />
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
