"use client";

import { FC, useCallback } from "react";
import getTreasureCommentList from "@src/api/treasure/comment/getTreasureCommentList";
import { API_GET_TREASURE_COMMENT_LIST_KEY } from "@src/libs/fetch/key/treasure/comment";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import ControllerContent from "@src/components/controller/ControllerContent";
import TreasureDetailCommentListItem from "./item";
import Observer from "@src/components/observer";
import { motion } from "framer-motion";
import loadingLottieSrc from "@src/assets/lottie/loading.json";
import Lottie from "@src/components/lottie";

import STYLE from "./treasure.detail.comment.list.module.scss";

const TreasureDetailCommentListMain: FC = () => {
  const { treasure_id } = useParams();

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
      enabled: typeof treasure_id === "string",
    });

  const onObserve = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  return (
    data && (
      <>
        <h3 className={STYLE.__comment_list_main_label}>
          댓글{" "}
          {data.pages[0].pagination.totalElement > 999
            ? "999+"
            : data.pages[0].pagination.totalElement}
        </h3>

        {data.pages[0].data.length !== 0 && (
          <ul className={STYLE.__comment_list_item_list}>
            {data.pages.map((page) =>
              page.data.map((item) => (
                <TreasureDetailCommentListItem key={item.id} item={item} />
              ))
            )}
          </ul>
        )}

        {data.pages[0].data.length === 0 && (
          <div className={STYLE.__comment_list_main_content}>
            <ControllerContent.Empty text="댓글이 없어요<br/>첫 댓글을 달아보세요!" />
          </div>
        )}

        {hasNextPage && (
          <>
            <Observer minHeight="46px" threshold={0.1} onObserve={onObserve} />
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
    )
  );
};

export default TreasureDetailCommentListMain;
