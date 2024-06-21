"use client";

import { FC, useCallback, useState } from "react";

import ModalFullScreenLayoutSwiperCommon from "@src/components/modal/full_screen/ModalFullScreenLayoutSwiperCommon";

import Swiper, { SwiperProps } from ".";

const SwiperCommonWithModal: FC<
  Omit<SwiperProps, "index" | "onIndexChange">
> = ({
  images,

  height = "300px",
  showImageCount = true,
  objectFit = "cover",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [index, setIndex] = useState<number>(0);

  const onIndexChange = useCallback((value: number) => {
    setIndex(value);
  }, []);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <div onClick={openModal}>
        <Swiper
          index={index}
          onIndexChange={onIndexChange}
          height={height}
          showImageCount={showImageCount}
          objectFit={objectFit}
          images={images}
        />
      </div>

      <ModalFullScreenLayoutSwiperCommon
        isOpen={isModalOpen}
        onClose={closeModal}
        backgroundColor="#000"
        index={index}
        onIndexChange={onIndexChange}
        images={images}
      />
    </>
  );
};

export default SwiperCommonWithModal;
