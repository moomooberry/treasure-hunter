"use client";

import { FC, useCallback, useState } from "react";
import dynamic from "next/dynamic";

const PhotoSwiperCommon = dynamic(
  () => import("@src/components/photo/swiper/PhotoSwiperCommon")
);

const ModalFullScreenPhotoSwiper = dynamic(
  () => import("@src/components/modal/ModalFullScreenPhotoSwiper")
);

interface TreasureDetailPhotoSwiperProps {
  images: string[];
}

const TreasureDetailPhotoSwiper: FC<TreasureDetailPhotoSwiperProps> = ({
  images,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [index, setIndex] = useState(0);

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
        <PhotoSwiperCommon
          index={index}
          onIndexChange={onIndexChange}
          images={images}
          height="300px"
        />
      </div>
      <ModalFullScreenPhotoSwiper
        isOpen={isModalOpen}
        onClose={closeModal}
        index={index}
        onIndexChange={onIndexChange}
        images={images}
        backgroundColor="#000"
      />
    </>
  );
};

export default TreasureDetailPhotoSwiper;
