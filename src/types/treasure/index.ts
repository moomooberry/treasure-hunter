import { Position } from "../position";
import { User } from "../user";

export interface TreasureItem {
  id: number;
  created_at: string;
  lat: Position["lat"];
  lng: Position["lng"];
  images: string[];
  title: string;
  hint: string;
  end_date: number;
  reward: number | null;

  user_id: User["id"]; // foreign-key
}
