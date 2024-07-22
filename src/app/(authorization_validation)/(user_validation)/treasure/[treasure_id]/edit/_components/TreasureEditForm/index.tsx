"use client";

import { FC, PropsWithChildren } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { v4 } from "uuid";

import getTreasure from "@src/api/treasure/getTreasure";
import { API_GET_TREASURE_KEY } from "@src/libs/fetch/key/treasure";
import type { ImageInputValue } from "@src/types/image";
import type { GetTreasureDetailResponse } from "@src/types/api/treasure";
import LayoutHeaderCommon from "@src/components/layout/header/LayoutHeaderCommon";
import LayoutBodyRegulatedMaxHeight from "@src/components/layout/body/LayoutBodyRegulatedMaxHeight";
import StatusLoadingTreasureFallback from "@src/components/status/loading/StatusLoadingTreasureFallback";
import LayoutFooterSmallButton from "@src/components/layout/footer/LayoutFooterSmallButton";

const TreasureEditFormContent = dynamic(
  () => import("./TreasureEditFormContent"),
  {
    ssr: false,
    loading: () => (
      <>
        <LayoutHeaderCommon backDisabled title="보물 수정" />

        <LayoutBodyRegulatedMaxHeight>
          <StatusLoadingTreasureFallback text="보물정보 불러오는 중" />
        </LayoutBodyRegulatedMaxHeight>

        <LayoutFooterSmallButton>다음</LayoutFooterSmallButton>
      </>
    ),
  }
);

const TreasureEditFormErrorModal = dynamic(
  () => import("./TreasureEditFormErrorModal")
);

export interface TreasureEditFormFields {
  currentSlide: "image" | "info";
  title: string;
  hint: string;
  reward: string;
  images: ImageInputValue[];
}

const TreasureEditFormProvider: FC<PropsWithChildren> = ({ children }) => {
  const { treasure_id } = useParams();

  const { data } = useQuery({
    queryKey: [API_GET_TREASURE_KEY, { treasure_id }],
    queryFn: () => getTreasure({ treasure_id: treasure_id as string }),
  });

  const formMethods = useForm<TreasureEditFormFields>({
    criteriaMode: "all",
    defaultValues: {
      currentSlide: "image",
      title: (data as GetTreasureDetailResponse).title,
      hint: (data as GetTreasureDetailResponse).hint,
      reward:
        (data as GetTreasureDetailResponse).reward?.toString() ?? "보상금 없음",
      images: (data as GetTreasureDetailResponse).images.map((src) => ({
        id: v4(),
        src,
      })),
    },
  });

  return <FormProvider {...formMethods}>{children}</FormProvider>;
};

const TreasureEditForm: FC = () => (
  <TreasureEditFormProvider>
    <TreasureEditFormContent />

    <TreasureEditFormErrorModal />
  </TreasureEditFormProvider>
);

export default TreasureEditForm;
