"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import ModalFullScreenContainer from "@src/components/modal/_components/ModalFullScreenContainer";
import getTreasure from "@src/api/treasure/getTreasure";
import { API_GET_TREASURE_KEY } from "@src/libs/fetch/key/treasure";
import { TreasureMap } from "@src/libs/google-map";

import TreasureDetailMapModalFullScreenLayout from "./TreasureDetailMapModalFullScreenLayout";

import STYLE from "./treasure.detail.map.module.scss";

const TreasureDetailMap: FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [isModalMapOpen, setIsModalMapOpen] = useState(false);

  const { treasure_id } = useParams();

  const { data } = useQuery({
    queryKey: [API_GET_TREASURE_KEY, { treasure_id }],
    queryFn: () => getTreasure({ treasure_id: treasure_id as string }),
  });

  const onMapClick = useCallback(() => {
    setIsModalMapOpen(true);
  }, []);

  const closeModalMap = useCallback(() => {
    setIsModalMapOpen(false);
  }, []);

  const init = useCallback(async () => {
    if (!ref.current || !data) return;

    const map = new TreasureMap(ref.current);

    await map.init({
      position: { lat: data.lat, lng: data.lng },
      zoom: 18,
      gestureHandling: "none",
    });

    map.loadTreasureList({
      data: [data],
      color: "#ffeaa7",
    });
  }, [data]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <>
      <motion.div
        ref={ref}
        className={STYLE.__map}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onMapClick}
      />

      <ModalFullScreenContainer isOpen={isModalMapOpen} onClose={closeModalMap}>
        <TreasureDetailMapModalFullScreenLayout onBackClick={closeModalMap} />
      </ModalFullScreenContainer>
    </>
  );
};

export default TreasureDetailMap;
