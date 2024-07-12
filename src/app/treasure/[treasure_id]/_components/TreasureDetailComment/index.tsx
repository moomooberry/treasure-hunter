"use client";

import dynamic from "next/dynamic";

import type { GetTreasureCommentListResponse } from "@src/types/api/treasure/comment";

const TreasureDetailCommentInput = dynamic(
  () => import("./TreasureDetailCommentInput")
);

const TreasureDetailCommentListMain = dynamic(
  () => import("./TreasureDetailCommentListMain")
);

const TreasureDetailCommentListDrawer = dynamic(
  () => import("./TreasureDetailCommentListDrawer")
);

const TreasureDetailCommentFormProvider = dynamic(
  () => import("./_components/TreasureDetailCommentFormProvider")
);

export interface TreasureDetailCommentFormFields {
  parentComment: GetTreasureCommentListResponse | null;
  text: string;
}

const TreasureDetailComment = () => (
  <TreasureDetailCommentFormProvider>
    <TreasureDetailCommentInput />
    <TreasureDetailCommentListMain />
    <TreasureDetailCommentListDrawer />
  </TreasureDetailCommentFormProvider>
);

export default TreasureDetailComment;
