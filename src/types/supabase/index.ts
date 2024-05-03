import { SupabaseClient } from "@supabase/supabase-js";

export interface SupabaseResponse<T> {
  code: number;
  message: string;
  data?: T;
}

export type SupabasePaginationParameter<T = {}> = {
  pageSize: number;
  pageNumber: number;
} & T;

export interface SupabasePaginationResponse<T> extends SupabaseResponse<T> {
  pagination: {
    totalElement: number;
  };
}

export type SupabaseUtils<P = unknown, R = unknown> = (
  supabase: SupabaseClient,
  {}: P
) => Promise<R>;
