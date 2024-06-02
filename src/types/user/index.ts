export interface User {
  id: string;
  created_at: string;
  username: string;
  provider: string;
  email: string;
  profile_image: string | null;
}
