"use client";

import { FC, PropsWithChildren, useEffect } from "react";
import ReactModal from "react-modal";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  backgroundColor?: string;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  isOpen,
  onClose,
  children,
  backgroundColor = "#fff",
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <ReactModal
      isOpen={isOpen}
      portalClassName="portal_modal"
      shouldCloseOnOverlayClick
      onRequestClose={onClose}
      ariaHideApp={false}
      style={{
        content: {
          top: "50%",
          left: "50%",
          transform: "translate(calc(-50% + 0.5px), calc(-50% + 0.5px))",
          width: "fit-content",
          height: "fit-content",
          border: "none",
          borderRadius: "20px",
          padding: 0,
          backgroundColor,
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 999,
        },
      }}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
