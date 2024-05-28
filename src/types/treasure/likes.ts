export interface TreasureLikes {
  id: number;
  created_at: string;

  user_id: string; // foreign-key
  comment_id: number; // foreign-key
  treasure_id: number; // foreign-key
}
