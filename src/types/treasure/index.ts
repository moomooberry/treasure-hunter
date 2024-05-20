import { Position } from "../position";

export interface TreasureItem {
  id: number;
  position: Position;
  imgSrc: string[];
  title: string;
  hint: string;
  endDate: number;
  reward: number | null;
}
