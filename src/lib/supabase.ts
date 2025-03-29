import { createClient } from "@supabase/supabase-js";
import type { Database } from "./supabase.gen";

export const supabaseClient = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!,
);
