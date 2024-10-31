import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vgckreprjrdfeopqvuqz.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnY2tyZXByanJkZmVvcHF2dXF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyNTI1MzMsImV4cCI6MjA0NTgyODUzM30.cCMVCO8py1oti09QfcK6otEJhnxoeY-OC7COyUyjyFY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
