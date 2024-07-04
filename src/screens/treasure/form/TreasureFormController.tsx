"use client";

import { FC, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { SwiperClass } from "swiper/react";
import { useQuery } from "@tanstack/react-query";
import { v4 } from "uuid";

import getTreasure from "@src/api/treasure/getTreasure";
import { API_GET_TREASURE_KEY } from "@src/libs/fetch/key/treasure";

import TreasureFormView, {
  TreasureFormFields,
  TreasureFormViewProps,
} from "./TreasureFormView";

interface TreasureFormControllerProps {
  treasure_id?: string;
}

const TreasureFormController: FC<TreasureFormControllerProps> = ({
  treasure_id,
}) => {
  const { back } = useRouter();

  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  const { data } = useQuery({
    queryKey: [API_GET_TREASURE_KEY, { treasure_id }],
    queryFn: () => getTreasure({ treasure_id: treasure_id as string }),
    enabled: !!treasure_id,
  });

  const formMethods = useForm<TreasureFormFields>({
    criteriaMode: "all",
    defaultValues: {
      slideIndex: 0,
      images: data ? data.images.map((src) => ({ id: v4(), src })) : [],
      title: data?.title,
      hint: data?.hint,
      position: data ? { lat: data.lat, lng: data.lng } : undefined,
      reward: data?.reward ? data.reward.toString() : undefined,
    },
  });

  const onSwiper = useCallback((value: SwiperClass) => {
    setSwiper(value);
  }, []);

  const onSlideChangeTransitionStart = useCallback(
    (value: SwiperClass) => {
      formMethods.setValue("slideIndex", value.activeIndex);
    },
    [formMethods]
  );

  const onBackClick = useCallback(() => {
    if (!swiper) {
      back();
      return;
    }

    if (swiper.isBeginning) {
      formMethods.setError("slideIndex", {
        types: {
          isEnd: "정말 나가시겠어요?",
        },
      });
      return;
    }

    swiper.slidePrev(230);
  }, [back, formMethods, swiper]);

  const viewProps: TreasureFormViewProps = {
    treasure_id,
    swiper,

    formMethods,

    onSwiper,
    onSlideChangeTransitionStart,
    onBackClick,
  };

  return <TreasureFormView {...viewProps} />;
};

export default TreasureFormController;
