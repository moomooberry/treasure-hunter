"use client";

import { useRouter } from "next/navigation";
import { FC, useCallback } from "react";
import { Variants, motion } from "framer-motion";

import UserMainListItem from "./UserMainListItem";

import STYLE from "../../user.main.module.scss";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const UserMainList: FC = () => {
  const { push } = useRouter();

  const onMoreAnnouncementClick = useCallback(() => {
    push("/more/announcement");
  }, [push]);

  const onMoreEventClick = useCallback(() => {
    push("/more/event");
  }, [push]);

  const onUserCardClick = useCallback(() => {
    push("/user/card");
  }, [push]);

  const onUserHidingClick = useCallback(() => {
    push("/user/treasure?type=hiding");
  }, [push]);

  const onUserSeekingClick = useCallback(() => {
    push("/user/treasure?type=seeking");
  }, [push]);

  const onUserCommentClick = useCallback(() => {
    push("/user/treasure/comment");
  }, [push]);

  const onUserEditClick = useCallback(() => {
    push("/user/edit");
  }, [push]);

  // TODO prefetch? this url?

  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={STYLE.__list_container}
    >
      <UserMainListItem text="내 프로필 수정하기" onClick={onUserEditClick} />
      <UserMainListItem text="내 카드 정보" onClick={onUserCardClick} />
      <UserMainListItem text="내가 숨긴 보물" onClick={onUserHidingClick} />
      <UserMainListItem text="내가 찾은 보물" onClick={onUserSeekingClick} />
      <UserMainListItem text="내가 쓴 댓글" onClick={onUserCommentClick} />
      <UserMainListItem text="공지사항" onClick={onMoreAnnouncementClick} />
      <UserMainListItem text="이벤트" onClick={onMoreEventClick} />
    </motion.ul>
  );
};

export default UserMainList;
