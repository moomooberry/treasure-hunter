declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_ENVIRONMENT: "DEVELOP" | "LIVE";
    NEXT_PUBLIC_GOOGLE_MAP_API_KEY: string;
    NEXT_PUBLIC_GOOGLE_MAP_ID: string;
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
  }
}
