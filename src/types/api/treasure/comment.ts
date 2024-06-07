import { TreasureComment } from "@src/types/treasure/comment";
import { TreasureLikes } from "@src/types/treasure/likes";
import { User } from "@src/types/user";

export interface GetTreasureCommentListResponse
  extends Pick<
    TreasureComment,
    "id" | "text" | "created_at" | "child_count" | "likes_count"
  > {
  user: Pick<User, "id" | "username" | "profile_image">;
  likes: Pick<TreasureLikes, "id"> | null;
}

export interface GetTreasureCommentReplyListResponse
  extends Pick<
    TreasureComment,
    "id" | "text" | "created_at" | "child_count" | "likes_count"
  > {
  user: Pick<User, "id" | "username" | "profile_image">;
  likes: Pick<TreasureLikes, "id"> | null;
}
