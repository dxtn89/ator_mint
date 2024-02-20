import { createPortal } from "react-dom";
import { ReactNode, useEffect } from "react";

type ModalProps = {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
};

const Modal = ({ id, isOpen, onClose, children }: ModalProps) => {
  // Manage the state
  useEffect(() => {
    // Get the dialog element
    const dialog = document.getElementById(id) as HTMLDialogElement;

    if (!isOpen) {
      dialog.close();
      document.body.style.overflow = "auto";
    }
    if (isOpen) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    }

    // Manage the native escape key
    // Update the internal state when the dialog is closed
    dialog.addEventListener("close", () => {
      onClose();
    });

    // Close when click outside of the dialog
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) {
        dialog.close();
      }
    });
  }, [id, isOpen, onClose]);

  const handleClose = () => {
    // Get the dialog element
    const dialog = document.getElementById(id) as HTMLDialogElement;
    // Close the dialog
    dialog.close();
  };

  return (
    <>
      {createPortal(
        <dialog
          id={id}
          aria-modal="true"
          className="sm:max-w-3xl w-full backdrop:bg-slate-800 backdrop:bg-opacity-50 backdrop:transition-all backdrop:backdrop-blur-sm bg-transparent overflow-hidden focus:outline-none p-0 sm:p-8"
        >
          {isOpen && children}
          {isOpen && (
            <button
              onClick={handleClose}
              className=" text-cyan-300 font-brand sm:hidden absolute right-4 top-4 text-sm"
            >
              [ close ]
            </button>
          )}
        </dialog>,
        document && (document.getElementById("root") as HTMLElement)
      )}
    </>
  );
};
export default Modal;
