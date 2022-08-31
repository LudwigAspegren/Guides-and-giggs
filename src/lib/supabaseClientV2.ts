import { createClient } from "@supabase/supabase-js";

import type { Database } from "src/databaseDefintions";
import { variables } from "./variables";

const supabaseUrl = variables.supabaseURI;
const supabaseAnonKey = variables.supabaseAnonKey;

// cookieOptions: { path: '/', name: 'meowncookie',  }, // Optional)


const supabaseClientV2 = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: 'public',
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: {
      'cache-control': 'public, max-age=3600'
    }
  }
})
export { supabaseClientV2 };
