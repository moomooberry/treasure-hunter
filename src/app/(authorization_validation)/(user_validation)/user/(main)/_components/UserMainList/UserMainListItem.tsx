"use client";

import { FC, MouseEventHandler } from "react";
import { motion, Variants } from "framer-motion";

import STYLE from "./user.main.list.module.scss";

interface UserMainListItemProps {
  text: string;
  onClick: MouseEventHandler<HTMLLIElement>;
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -15,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

const UserMainListItem: FC<UserMainListItemProps> = ({ text, onClick }) => (
  <motion.li
    variants={itemVariants}
    className={STYLE.__list_item}
    onClick={onClick}
  >
    {text}
  </motion.li>
);

export default UserMainListItem;
