import { Position } from "../position";
import { User } from "../user";

export interface TreasureItem {
  id: number;
  created_at: string;
  lat: Position["lat"];
  lng: Position["lng"];
  imgSrc: string[];
  title: string;
  hint: string;
  endDate: number;
  reward: number | null;
  userId: User["id"]; // foreign-key
}
