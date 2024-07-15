"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

import { TreasureMap } from "@src/libs/google-map";
import { API_GET_TREASURE_LIST_KEY } from "@src/libs/fetch/key/treasure";
import getTreasureList from "@src/api/treasure/getTreasureList";
import { GetTreasureListResponse } from "@src/types/api/treasure";
import { API_GET_USER_KEY } from "@src/libs/fetch/key/user";
import getUser from "@src/api/user/getUser";
import ResetIcon from "@src/components/icons/ResetIcon";
import CrosshairIcon from "@src/components/icons/CrosshairIcon";
import ThunderIcon from "@src/components/icons/ThunderIcon";
import emptyBoxJson from "@src/assets/lottie/empty_box.json";
import useZustandPositionStore from "@src/hooks/zustand/useZustandPositionStore";
import Lottie from "@src/components/lottie/Lottie";
import ModalCheck from "@src/components/modal/ModalCheck";

import MapMainMapSelectedTreasure from "./MapMainMapBodySelectedTreasure";

import STYLE from "./map.main.map.body.module.scss";

const MapMainMapBody: FC = () => {
  const { push } = useRouter();

  const ref = useRef<HTMLDivElement>(null);

  const fastTreasureIndex = useRef<{ pageIndex: number; dataIndex: number }>({
    pageIndex: 0,
    dataIndex: 0,
  });

  const { position } = useZustandPositionStore();

  const [treasureMap, setTreasureMap] = useState<TreasureMap>();

  const [selectedTreasure, setSelectedTreasure] =
    useState<GetTreasureListResponse | null>(null);

  const [isNoMoreModalOpen, setIsNoMoreModalOpen] = useState(false);

  const { data: userData } = useQuery({
    queryKey: [API_GET_USER_KEY],
    queryFn: () => getUser(),
  });

  // TODO data 거리순 정렬 필요
  const { data, hasNextPage, fetchNextPage, isFetchedAfterMount } =
    useInfiniteQuery({
      queryKey: [API_GET_TREASURE_LIST_KEY],
      queryFn: ({ pageParam }) =>
        getTreasureList({
          distance: 3000,
          position: { lat: 36, lng: 127 },
          pageNumber: pageParam,
          pageSize: 10,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPage) =>
        lastPage.pagination.totalElement <= allPage.length * 10
          ? null
          : lastPage.pagination.pageNumber + 1,
    });

  const onSelect = useCallback((value: GetTreasureListResponse | null) => {
    setSelectedTreasure(value);
  }, []);

  const onMyPositionClick = useCallback(() => {
    if (!treasureMap) return;
    treasureMap.moveMap({ position });
  }, [position, treasureMap]);

  const onFastTreasureClick = useCallback(() => {
    if (!treasureMap || !data) return;

    if (data.pages[0].data.length === 0) {
      setIsNoMoreModalOpen(true);
      return;
    }

    const { pageIndex, dataIndex } = fastTreasureIndex.current;

    let newPageIndex = pageIndex;
    let newDataIndex = dataIndex;

    let target = data.pages[newPageIndex].data[newDataIndex] || null;

    if (!target) {
      newDataIndex = 0;
      newPageIndex++;
      if (newPageIndex >= data.pages.length) {
        newPageIndex = 0;
      }
      target = data.pages[newPageIndex].data[newDataIndex];
    }

    setSelectedTreasure(target);
    treasureMap.moveMap({ position: { lat: target.lat, lng: target.lng } });

    /* update fastTreasureIndex & fetch TreasureList */
    newDataIndex++;

    if (newDataIndex >= data.pages[newPageIndex].data.length) {
      newDataIndex = 0;
      newPageIndex++;
      if (newPageIndex >= data.pages.length) {
        if (hasNextPage) {
          fetchNextPage();
        } else {
          newPageIndex = 0;
        }
      }
    }

    fastTreasureIndex.current = {
      pageIndex: newPageIndex,
      dataIndex: newDataIndex,
    };
  }, [data, fetchNextPage, hasNextPage, treasureMap]);

  const onLoadMoreTreasureClick = useCallback(() => {
    if (!hasNextPage) {
      setIsNoMoreModalOpen(true);
      return;
    }

    fetchNextPage();
    return;
  }, [fetchNextPage, hasNextPage]);

  const closeNoMoreModal = useCallback(() => {
    setIsNoMoreModalOpen(false);
  }, []);

  const routeTreasureAdd = useCallback(() => {
    push("/treasure/add");
  }, [push]);

  const init = useCallback(async () => {
    if (!ref.current || !data || !userData) return;

    const map = new TreasureMap(ref.current);

    await map.init({
      position,
      minZoom: 13,
      zoom: 15,
    });

    map.loadUser({
      position,
      image: userData.profile_image,
    });

    map.loadBuffer({
      position,
      bufferRadius: 3000,
    });

    data.pages.forEach((_, index) => {
      map.loadTreasureList({
        color: "#ffeaa7",
        onSelect,
        data: data.pages[index].data,
      });
    });

    setTreasureMap(map);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* init map when initial rendering this component */
  useEffect(() => {
    init();
  }, [init]);

  /* auto move userPin & buffer when changing position  */
  useEffect(() => {
    if (!treasureMap) return;

    treasureMap.moveUser({ position });
    treasureMap.moveUserBuffer({ position });
  }, [position, treasureMap]);

  /* auto load MapTreasureList when data fetching after mount */
  useEffect(() => {
    if (!treasureMap || !data || !isFetchedAfterMount) return;

    treasureMap.loadTreasureList({
      data: data.pages[data.pages.length - 1].data,
      color: "#ffeaa7",
      onSelect,
    });
  }, [data, isFetchedAfterMount, onSelect, treasureMap]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={STYLE.__map_container}
    >
      <div ref={ref} className={STYLE.__map} />

      {selectedTreasure && (
        <MapMainMapSelectedTreasure data={selectedTreasure} />
      )}

      <div className={STYLE.__map_option_button_wrapper}>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={STYLE.__map_option_button}
          onClick={onMyPositionClick}
        >
          <CrosshairIcon width="18px" height="18px" />내 위치로 가기
        </motion.button>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={STYLE.__map_option_button}
          onClick={onLoadMoreTreasureClick}
        >
          <ResetIcon width="14px" height="14px" color="#000" />
          보물 불러오기
        </motion.button>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={STYLE.__map_option_button}
          onClick={onFastTreasureClick}
        >
          <ThunderIcon width="16px" height="16px" color="#f1c40f" />
          빠른 보물 찾기
        </motion.button>
      </div>

      <ModalCheck
        isOpen={isNoMoreModalOpen}
        onClose={closeNoMoreModal}
        title="더 불러올 보물이 없어요.<br/>보물을 숨겨보시겠어요?"
        buttons={[
          { text: "닫기", variant: "cancel", onClick: closeNoMoreModal },
          { text: "숨기기", variant: "common", onClick: routeTreasureAdd },
        ]}
      >
        <div className={STYLE.__map_lottie_wrapper}>
          <Lottie animationData={emptyBoxJson} width="160px" height="160px" />
        </div>
      </ModalCheck>
    </motion.div>
  );
};

export default MapMainMapBody;
