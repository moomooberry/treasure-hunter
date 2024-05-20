import { Position } from "../position";

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
  userId: string; // foreign-key
}
