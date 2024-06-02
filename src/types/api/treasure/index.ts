import { TreasureItem } from "@src/types/treasure";
import { User } from "@src/types/user";

export interface GetTreasureListResponse extends Omit<TreasureItem, "user_id"> {
  user: Pick<User, "username">;
}

export interface GetTreasureDetailResponse
  extends Omit<TreasureItem, "user_id"> {
  user: Pick<User, "username" | "id">;
}
