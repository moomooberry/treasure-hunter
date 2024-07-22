"use client";

import { FC, PropsWithChildren } from "react";
import dynamic from "next/dynamic";
import { FormProvider, useForm } from "react-hook-form";

import type { Position } from "@src/types/position";
import type { ImageInputValue } from "@src/types/image";

const TreasureAddFormContent = dynamic(
  () => import("./TreasureAddFormContent")
);

const TreasureAddFormErrorModal = dynamic(
  () => import("./TreasureAddFormErrorModal")
);

export interface TreasureAddFormFields {
  currentSlide: "position" | "image" | "info" | "payment";
  position: Position;
  images: ImageInputValue[];
  title: string;
  hint: string;
  reward?: string;
}

const TreasureAddFormProvider: FC<PropsWithChildren> = ({ children }) => {
  const formMethods = useForm<TreasureAddFormFields>({
    criteriaMode: "all",
    defaultValues: {
      currentSlide: "position",
      images: [],
    },
  });

  return <FormProvider {...formMethods}>{children}</FormProvider>;
};

const TreasureAddForm = () => (
  <TreasureAddFormProvider>
    <TreasureAddFormContent />

    <TreasureAddFormErrorModal />
  </TreasureAddFormProvider>
);

export default TreasureAddForm;
