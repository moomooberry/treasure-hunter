"use client";

import { FC, PropsWithChildren, useEffect } from "react";
import ReactModal from "react-modal";

export interface ModalFullScreenContainerProps {
  isOpen: boolean;
  onClose: VoidFunction;
  backgroundColor?: string;
}

const ModalFullScreenContainer: FC<
  PropsWithChildren<ModalFullScreenContainerProps>
> = ({ isOpen, onClose, backgroundColor = "#fff", children }) => {
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
      portalClassName="portal_modal_full_screen"
      shouldCloseOnOverlayClick
      onRequestClose={onClose}
      ariaHideApp={false}
      style={{
        content: {
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          border: "none",
          padding: 0,
          backgroundColor,
        },
        overlay: {
          zIndex: 999,
        },
      }}
    >
      {children}
    </ReactModal>
  );
};

export default ModalFullScreenContainer;
