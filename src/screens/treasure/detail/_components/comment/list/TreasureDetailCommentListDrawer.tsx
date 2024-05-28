"use client";

import getTreasureCommentReplyList from "@src/api/treasure/comment/getTreasureCommentReplyList";
import useReduxSelector from "@src/hooks/redux/useReduxSelector";
import { API_GET_TREASURE_COMMENT_REPLY_LIST_KEY } from "@src/libs/fetch/key/treasure/comment";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { FC, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { Sheet } from "react-modal-sheet";
import { TreasureDetailCommentFormFields } from "..";
import TreasureDetailCommentListItem from "./item";
import Observer from "@src/components/observer";
import Lottie from "@src/components/lottie";
import loadingLottieSrc from "@src/assets/lottie/loading.json";
import { motion } from "framer-motion";
import ControllerContent from "@src/components/controller/ControllerContent";

import STYLE from "./treasure.detail.comment.list.module.scss";

const TreasureDetailCommentListDrawer: FC = () => {
  const { watch, setValue } = useFormContext<TreasureDetailCommentFormFields>();

  const parentComment = watch("parentComment");

  const paddingBottom = useReduxSelector(
    (state) => state.reduxDevice.device.bottom
  );

  const { treasure_id } = useParams();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [
        API_GET_TREASURE_COMMENT_REPLY_LIST_KEY,
        {
          treasure_id,
          comment_id: parentComment ? String(parentComment.id) : null,
        },
      ],
      queryFn: ({ pageParam }) =>
        getTreasureCommentReplyList({
          comment_id: String(parentComment?.id),
          treasure_id: treasure_id as string,
          pageNumber: pageParam,
          pageSize: 10,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPage) =>
        lastPage.pagination.totalElement <= allPage.length * 10
          ? null
          : lastPage.pagination.pageNumber + 1,
      enabled: !!parentComment && typeof treasure_id === "string",
    });

  const onObserve = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const onClose = useCallback(() => {
    setValue("parentComment", null);
  }, [setValue]);

  return (
    <Sheet
      isOpen={!!parentComment}
      onClose={onClose}
      detent="content-height"
      style={{
        zIndex: 1,
      }}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          {parentComment && (
            <div
              className={STYLE.__comment_list_drawer_container}
              style={{
                paddingBottom: `calc(14px + 14px + 32px + 13px + ${paddingBottom})`,
              }}
            >
              <ul className={STYLE.__comment_list_drawer_top_ul}>
                <TreasureDetailCommentListItem
                  item={parentComment}
                  disabledViewMoreButton
                />
              </ul>

              <div className={STYLE.__comment_list_drawer_reply_box}>
                {!data && (
                  <div className={STYLE.__comment_list_drawer_reply_content}>
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
                        <TreasureDetailCommentListItem
                          key={item.id}
                          item={item}
                          disabledViewMoreButton
                        />
                      ))
                    )}
                  </ul>
                )}

                {data && data.pages[0].data.length === 0 && (
                  <div className={STYLE.__comment_list_drawer_reply_content}>
                    <ControllerContent.Empty
                      text={`${parentComment.user.username}님에게<br/>첫 대댓글을 남겨보세요!`}
                    />
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
              </div>
            </div>
          )}
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={onClose} />
    </Sheet>
  );
};

export default TreasureDetailCommentListDrawer;
