import { TreasureItem } from "@src/types/treasure";
import { User } from "@src/types/user";

export interface GetUserResponse extends User {
  seeking_count: number;
  hiding_count: number;
}
