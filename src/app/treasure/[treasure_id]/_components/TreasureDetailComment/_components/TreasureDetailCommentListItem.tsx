"use client";

import { FC, useCallback, useMemo } from "react";
import { useParams } from "next/navigation";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import HeartIcon from "@src/components/icons/HeartIcon";
import Avatar from "@src/components/avatar/Avatar";
import deleteTreasureCommentLikes from "@src/api/treasure/comment/likes/deleteTreasureCommentLikes";
import postTreasureCommentLikes from "@src/api/treasure/comment/likes/postTreasureCommentLikes";
import {
  API_GET_TREASURE_COMMENT_LIST_KEY,
  API_GET_TREASURE_COMMENT_REPLY_LIST_KEY,
} from "@src/libs/fetch/key/treasure/comment";
import type { GetTreasureCommentListResponse } from "@src/types/api/treasure/comment";

import type { TreasureDetailCommentFormFields } from "../../TreasureDetailComment";

import STYLE from "../treasure.detail.comment.module.scss";

function getElapsedTime(diff: number) {
  const day = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hour = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minute = Math.floor((diff / (1000 * 60)) % 60);
  const second = Math.floor((diff / 1000) % 60);

  if (day > 0) return `${day}일`;
  if (hour > 0) return `${hour}시간`;
  if (minute > 0) return `${minute}분`;
  if (second > 0) return `${second}초`;

  return "방금 전";
}

interface TreasureDetailCommentListItemProps {
  item: GetTreasureCommentListResponse;
  disabledViewMoreButton?: boolean;
  disabledLikeButton?: boolean;
}

const TreasureDetailCommentListItem: FC<TreasureDetailCommentListItemProps> = ({
  item,
  disabledViewMoreButton = false,
  disabledLikeButton = false,
}) => {
  const { setValue, getValues } =
    useFormContext<TreasureDetailCommentFormFields>();

  const { treasure_id } = useParams();

  const diff = useMemo(() => dayjs().diff(item.created_at), [item]);

  const queryClient = useQueryClient();

  const onMutateSuccess = useCallback(() => {
    const parentComment = getValues("parentComment");

    queryClient.invalidateQueries({
      queryKey: [API_GET_TREASURE_COMMENT_LIST_KEY, { treasure_id }],
    });

    if (parentComment) {
      queryClient.invalidateQueries({
        queryKey: [
          API_GET_TREASURE_COMMENT_REPLY_LIST_KEY,
          {
            treasure_id,
            comment_id: String(parentComment.id),
          },
        ],
      });
    }
  }, [getValues, queryClient, treasure_id]);

  const { mutate: addCommentLikes } = useMutation({
    mutationFn: postTreasureCommentLikes,
    onSuccess: onMutateSuccess,
  });

  const { mutate: deleteCommentLikes } = useMutation({
    mutationFn: deleteTreasureCommentLikes,
    onSuccess: onMutateSuccess,
  });

  const onReplyClick = useCallback(() => {
    setValue("parentComment", item);
  }, [item, setValue]);

  const onLikeClick = useCallback(
    (item: GetTreasureCommentListResponse) => {
      if (typeof treasure_id !== "string" || disabledLikeButton) return;

      const parentComment = getValues("parentComment");

      const parentCommentId = parentComment
        ? String(parentComment.id)
        : undefined;

      const handler = () => {
        if (item.likes) {
          deleteCommentLikes({
            comment_id: String(item.id),
            likes_id: String(item.likes.id),
            treasure_id,
            parentCommentId,
          });
          return;
        }

        addCommentLikes({
          comment_id: String(item.id),
          treasure_id,
          parentCommentId,
        });
      };

      return handler;
    },
    [
      addCommentLikes,
      deleteCommentLikes,
      disabledLikeButton,
      getValues,
      treasure_id,
    ]
  );

  return (
    <motion.li
      className={STYLE.__comment_list_item_ul}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className={STYLE.__comment_list_avatar_info_box}>
        <Avatar imageSrc={item.user.profile_image} width="26px" height="26px" />

        <div className={STYLE.__comment_list_info_box}>
          <div className={STYLE.__comment_list_meta_wrapper}>
            <div className={STYLE.__comment_list_meta_username}>
              {item.user.username}
            </div>
            <div className={STYLE.__comment_list_meta_created}>
              {getElapsedTime(diff)}
            </div>
          </div>

          <div className={STYLE.__comment_list_content}>{item.text}</div>

          {!disabledViewMoreButton && (
            <button
              className={STYLE.__comment_list_view_more_button}
              onClick={onReplyClick}
            >
              {item.child_count ? `${item.child_count}개의 답글` : "답글 달기"}
            </button>
          )}
        </div>
      </div>

      {!disabledLikeButton && (
        <div className={STYLE.__comment_list_like_button_wrapper}>
          <button
            className={STYLE.__comment_list_like_button}
            onClick={onLikeClick(item)}
          >
            <HeartIcon
              width="16px"
              height="16px"
              color={item.likes ? "#e17055" : "#b2bec3"}
            />
          </button>
          <span className={STYLE.__comment_list_like_count}>
            {item.likes_count > 999 ? "999+" : item.likes_count}
          </span>
        </div>
      )}
    </motion.li>
  );
};

export default TreasureDetailCommentListItem;
