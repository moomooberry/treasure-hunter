"use client";

import { FC, PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";

import type { GetTreasureCommentListResponse } from "@src/types/api/treasure/comment";

export interface TreasureDetailCommentFormFields {
  parentComment: GetTreasureCommentListResponse | null;
  text: string;
}

const TreasureDetailCommentFormProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const formMethods = useForm<TreasureDetailCommentFormFields>({
    defaultValues: {
      parentComment: null,
      text: "",
    },
  });

  return <FormProvider {...formMethods}>{children}</FormProvider>;
};

export default TreasureDetailCommentFormProvider;
