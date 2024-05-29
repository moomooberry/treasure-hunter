"use client";

import { FC, MouseEventHandler, PropsWithChildren, ReactNode } from "react";
import { Variants, motion } from "framer-motion";
import Modal, { ModalProps } from ".";
import Button, { ButtonProps } from "../button";
import FormText from "../form/FormText";

import STYLE from "./modal.module.scss";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, transform: "translate(0,30px)" },
  show: { opacity: 1, transform: "translate(0,0)" },
};

interface ModalCheckProps extends PropsWithChildren<ModalProps> {
  title: string;
  noticeText?: string;
  buttons: {
    text: string;
    variant?: ButtonProps["variant"];
    onClick: MouseEventHandler<HTMLButtonElement>;
  }[];
}

const ModalCheck: FC<ModalCheckProps> = ({
  isOpen,
  onClose,
  backgroundColor = "#fff",

  title,
  noticeText,
  buttons,

  children,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} backgroundColor={backgroundColor}>
    <motion.div
      className={STYLE.__modal_check_container}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.h2
        className={STYLE.__modal_check_title}
        variants={itemVariants}
        dangerouslySetInnerHTML={{
          __html: title,
        }}
      />

      {children && <motion.div variants={itemVariants}>{children}</motion.div>}

      <motion.div
        className={STYLE.__modal_check_button_wrapper}
        variants={itemVariants}
      >
        {buttons.map(({ onClick, text, variant }, index) => (
          <Button key={index} variant={variant} onClick={onClick}>
            {text}
          </Button>
        ))}
      </motion.div>

      {noticeText && (
        <motion.div variants={itemVariants}>
          <FormText.Notice text={noticeText} m="-4px 0 0 0" />
        </motion.div>
      )}
    </motion.div>
  </Modal>
);

export default ModalCheck;
