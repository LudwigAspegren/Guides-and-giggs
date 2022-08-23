import { createClient } from "@supabase/supabase-js";
import type { Database } from "src/databaseDefintions";
import { variables } from "./variables";

const supabaseUrl = variables.supabaseURI;
const supabaseAnonKey = variables.supabaseAnonKey;


const supabaseClientV2 = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: 'public',
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})
export { supabaseClientV2 };
