"use client";

import { FC, useCallback, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import getTreasureCommentList from "@src/api/treasure/comment/getTreasureCommentList";
import { API_GET_TREASURE_COMMENT_LIST_KEY } from "@src/libs/fetch/key/treasure/comment";
import Observer from "@src/components/observer/Observer";
import loadingLottieSrc from "@src/assets/lottie/loading.json";
import Lottie from "@src/components/lottie/Lottie";
import { API_GET_USER_KEY } from "@src/libs/fetch/key/user";
import getUser from "@src/api/user/getUser";
import unlockLottieSrc from "@src/assets/lottie/unlock.json";
import StatusEmptyContent from "@src/components/status/empty/StatusEmptyContent";

import TreasureDetailCommentListItem from "./_components/TreasureDetailCommentListItem";

import STYLE from "./treasure.detail.comment.module.scss";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
  },
};

const fakeData: string[] = [
  "로그인을 하시면 더욱 다양한 컨텐츠를 즐길 수 있어요.",
  "이 댓글을 확인한 당신! 재능이 있군요!",
  "진짜 보물은 당신이랍니다.",
  "행복한 하루 되세요 :)",
];

function getCommentCount(value: number) {
  return value > 999 ? "999+" : value.toString();
}

const TreasureDetailCommentListMain: FC = () => {
  const [isUnlock, setIsUnlock] = useState(false);

  const { push } = useRouter();

  const { treasure_id } = useParams();

  const { data: userData } = useQuery({
    queryKey: [API_GET_USER_KEY],
    queryFn: () => getUser(),
  });

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [API_GET_TREASURE_COMMENT_LIST_KEY, { treasure_id }],
      queryFn: ({ pageParam }) =>
        getTreasureCommentList({
          treasure_id: treasure_id as string,
          pageNumber: pageParam,
          pageSize: 10,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPage) =>
        lastPage.pagination.totalElement <= allPage.length * 10
          ? null
          : lastPage.pagination.pageNumber + 1,
      enabled: typeof treasure_id === "string" && !!userData,
    });

  const onObserve = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const onUnlockClick = useCallback(() => {
    setIsUnlock(true);
    setTimeout(() => {
      push("/auth/login");
    }, 800);
  }, [push]);

  return (
    <>
      {userData && (
        <>
          <h3 className={STYLE.__comment_list_main_label}>
            댓글{" "}
            {data && getCommentCount(data.pages[0].pagination.totalElement)}
          </h3>

          {!data && (
            <div className={STYLE.__comment_list_main_loading_box}>
              <Lottie
                animationData={loadingLottieSrc}
                width="40px"
                height="40px"
              />
            </div>
          )}

          {data && data.pages[0].data.length !== 0 && (
            <ul className={STYLE.__comment_list_item_list}>
              {data.pages.map((page) =>
                page.data.map((item) => (
                  <TreasureDetailCommentListItem key={item.id} item={item} />
                ))
              )}
            </ul>
          )}

          {data && data.pages[0].data.length === 0 && (
            <div className={STYLE.__comment_list_main_content}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <StatusEmptyContent text="댓글이 없어요<br/>첫 댓글을 달아보세요!" />
              </motion.div>
            </div>
          )}

          {data && hasNextPage && (
            <>
              <Observer
                minHeight="46px"
                threshold={0.1}
                onObserve={onObserve}
              />
              {isFetchingNextPage && (
                <motion.div
                  className={STYLE.__comment_list_drawer_next_loading}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Lottie
                    animationData={loadingLottieSrc}
                    width="20px"
                    height="20px"
                  />
                </motion.div>
              )}
            </>
          )}
        </>
      )}

      {!userData && (
        <div className={STYLE.__comment_list_main_unlock_container}>
          <div className={STYLE.__comment_list_main_unlock_box}>
            <motion.div
              className={STYLE.__comment_list_main_unlock_wrapper}
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              onClick={onUnlockClick}
            >
              <motion.div
                className={STYLE.__comment_list_main_unlock_lottie_wrapper}
                variants={itemVariants}
              >
                <Lottie
                  animationData={unlockLottieSrc}
                  autoplay={isUnlock}
                  loop={0}
                  width="200px"
                  height="200px"
                />
              </motion.div>

              <AnimatePresence>
                {!isUnlock && (
                  <>
                    <motion.span
                      variants={itemVariants}
                      exit={{
                        opacity: 0,
                        y: 20,
                      }}
                    >
                      댓글을 보거나 현상금을 얻으려면
                    </motion.span>
                    <motion.span
                      variants={itemVariants}
                      exit={{
                        opacity: 0,
                        y: 20,
                        transition: { delay: 0.05 },
                      }}
                    >
                      로그인을 해야 가능해요.
                    </motion.span>
                    <motion.span
                      className={STYLE.__comment_list_main_unlock_underline}
                      variants={itemVariants}
                      exit={{
                        opacity: 0,
                        y: 20,
                        transition: { delay: 0.1 },
                      }}
                    >
                      로그인하기
                    </motion.span>
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <div className={STYLE.__comment_list_main_blur_box}>
            <h3 className={STYLE.__comment_list_main_label}>
              댓글 {fakeData.length}
            </h3>

            <ul className={STYLE.__comment_list_item_list}>
              {fakeData.map((text, index) => (
                <TreasureDetailCommentListItem
                  key={index}
                  disabledViewMoreButton
                  disabledLikeButton
                  item={{
                    id: 123,
                    user: {
                      id: "hi",
                      username: `트레저헌터 ${index + 1}`,
                      profile_image: null,
                    },
                    text: text,
                    likes: null,
                    likes_count: 0,
                    child_count: 0,
                    created_at: "방금 전",
                  }}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default TreasureDetailCommentListMain;
