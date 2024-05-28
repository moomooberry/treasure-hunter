import { TreasureItem } from ".";
import { User } from "../user";

export interface TreasureComment {
  id: number;
  created_at: string;
  is_answer: boolean;
  text: string;
  parent_comment_id: TreasureComment["id"] | null;
  child_count: number;
  likes_count: number;

  treasure_id: TreasureItem["id"]; // foreign-key
  user_id: User["id"]; // foreign-key
}
