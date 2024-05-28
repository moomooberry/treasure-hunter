"use client";

import { FormProvider, useForm } from "react-hook-form";
import { GetTreasureCommentListResponse } from "@src/types/api/treasure/comment";
import TreasureDetailCommentInput from "./input";
import TreasureDetailCommentListMain from "./list/TreasureDetailCommentListMain";
import TreasureDetailCommentListDrawer from "./list/TreasureDetailCommentListDrawer";

export interface TreasureDetailCommentFormFields {
  parentComment: GetTreasureCommentListResponse | null;
  text: string;
}

const TreasureDetailComment = () => {
  const formMethods = useForm<TreasureDetailCommentFormFields>({
    defaultValues: {
      parentComment: null,
      text: "",
    },
  });

  return (
    <FormProvider {...formMethods}>
      <TreasureDetailCommentInput />
      <TreasureDetailCommentListMain />
      <TreasureDetailCommentListDrawer />
    </FormProvider>
  );
};

export default TreasureDetailComment;
