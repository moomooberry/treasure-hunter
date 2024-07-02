import { Position } from "../position";
import { User } from "../user";

export interface TreasureItem {
  id: string;
  created_at: string;
  lat: Position["lat"];
  lng: Position["lng"];
  images: string[];
  title: string;
  hint: string;
  end_date: number;
  reward: number | null;
  is_found: boolean;

  user_id: User["id"]; // foreign-key
  answer_user_id: User["id"]; // foreign-key
  answer_comment_id: number | null; // foreign-key
}
