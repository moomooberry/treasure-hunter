"use client";

import {
  FC,
  FormEvent,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Controller, SubmitHandler, useFormContext } from "react-hook-form";
import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { API_GET_TREASURE_KEY } from "@src/libs/fetch/key/treasure";
import getTreasure from "@src/api/treasure/getTreasure";
import { API_GET_USER_KEY } from "@src/libs/fetch/key/user";
import getUser from "@src/api/user/getUser";
import postTreasureComment from "@src/api/treasure/comment/postTreasureComment";
import postTreasureCommentReply from "@src/api/treasure/comment/postTreasureCommentReply";
import {
  API_GET_TREASURE_COMMENT_LIST_KEY,
  API_GET_TREASURE_COMMENT_REPLY_LIST_KEY,
} from "@src/libs/fetch/key/treasure/comment";
import Avatar from "@src/components/avatar/Avatar";
import useZustandDeviceStore from "@src/hooks/zustand/useZustandDeviceStore";

import type { TreasureDetailCommentFormFields } from "../comment";

import STYLE from "./treasure.detail.comment.module.scss";

const TreasureDetailCommentInput: FC = () => {
  const { register, handleSubmit, control, setValue, getValues } =
    useFormContext<TreasureDetailCommentFormFields>();

  const thresholdRef = useRef<HTMLDivElement>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { ref, ...rest } = register("text");

  useImperativeHandle(ref, () => textareaRef.current);

  const {
    device: { bottom: paddingBottom },
  } = useZustandDeviceStore();

  const [isOverThreshold, setIsOverThresHold] = useState(false);

  const [isKeyboardUp, setIsKeyboardUp] = useState<boolean>(false);

  const { treasure_id } = useParams();

  const { data: treasureData } = useQuery({
    queryKey: [API_GET_TREASURE_KEY, { treasure_id }],
    queryFn: () => getTreasure({ treasure_id: treasure_id as string }),
    enabled: typeof treasure_id === "string",
  });

  const { data: userData } = useQuery({
    queryKey: [API_GET_USER_KEY],
    queryFn: () => getUser(),
  });

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

  const { mutate: addCommentMutate } = useMutation({
    mutationFn: postTreasureComment,
    onSuccess: onMutateSuccess,
  });

  const { mutate: addCommentReplyMutate } = useMutation({
    mutationFn: postTreasureCommentReply,
    onSuccess: onMutateSuccess,
  });

  const onValid = useCallback<SubmitHandler<TreasureDetailCommentFormFields>>(
    ({ text, parentComment }) => {
      if (!treasureData || !textareaRef.current) return;

      setValue("text", "");

      textareaRef.current.style.height = "22px";
      textareaRef.current.style.marginTop = "5px";

      if (parentComment) {
        addCommentReplyMutate({
          text,
          treasure_id: String(treasureData.id),
          comment_id: String(parentComment.id),
        });

        return;
      }

      addCommentMutate({
        text,
        treasure_id: String(treasureData.id),
      });
    },
    [addCommentMutate, addCommentReplyMutate, setValue, treasureData]
  );

  const onInput = useCallback((event: FormEvent<HTMLTextAreaElement>) => {
    event.currentTarget.style.height = "22px";
    event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
    event.currentTarget.style.marginTop = "5px";

    const target = event.currentTarget.value;
    if (target.length > 300) {
      event.currentTarget.value = target.slice(0, 300);
    }
  }, []);

  const onFocus = useCallback(() => {
    setIsKeyboardUp(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsKeyboardUp(false);
  }, []);

  useEffect(() => {
    const threshold = thresholdRef.current;

    if (!threshold) return;

    const isOverThresholdWhenFirstLoad =
      window.scrollY >= threshold.offsetTop - window.innerHeight;

    if (isOverThresholdWhenFirstLoad) {
      setIsOverThresHold(true);
    }

    const scrollHandler = () => {
      const isOverThreshold =
        window.scrollY >= threshold.offsetTop - window.innerHeight;

      if (isOverThreshold) {
        setIsOverThresHold(true);
        return;
      }

      const text = getValues("text");

      if (!text) setIsOverThresHold(false);
    };

    window.addEventListener("scroll", scrollHandler);

    return () => window.removeEventListener("scroll", scrollHandler);
  }, [getValues]);

  return (
    userData &&
    treasureData && (
      <>
        <div ref={thresholdRef} />

        <AnimatePresence>
          {isOverThreshold && (
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: 80 }}
              className={STYLE.__comment_footer_input_box}
              style={{
                padding: `14px 12px calc(14px + 30px + ${
                  isKeyboardUp ? "0px" : paddingBottom
                }) 12px`,
                marginBottom: "-30px",
              }}
            >
              <div className={STYLE.__comment_footer_input_wrapper}>
                <Avatar
                  imageSrc={userData.profile_image}
                  width="32px"
                  height="32px"
                />

                <div className={STYLE.__comment_footer_textarea_wrapper}>
                  <Controller
                    control={control}
                    name="parentComment"
                    render={({ field: { value } }) => (
                      <>
                        {value && (
                          <motion.div
                            className={
                              STYLE.__comment_footer_textarea_parent_comment
                            }
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {value.user.username}님에게
                          </motion.div>
                        )}
                      </>
                    )}
                  />

                  <textarea
                    className={STYLE.__comment_footer_textarea}
                    ref={textareaRef}
                    {...rest}
                    placeholder="댓글 남기기 최대 300자"
                    maxLength={300}
                    onInput={onInput}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>

                <div className={STYLE.__comment_submit_wrapper}>
                  <Controller
                    control={control}
                    name="text"
                    render={({ field: { value } }) => (
                      <button
                        className={STYLE.__comment_submit_button}
                        onClick={handleSubmit(onValid)}
                        disabled={!value}
                      >
                        저장
                      </button>
                    )}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  );
};

export default TreasureDetailCommentInput;
