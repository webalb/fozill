import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";

// Supabase renames the anon key to "publishable key"; support both names.
const supabasePublicKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "placeholder-public-key";

const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SECRET_KEY ||
  supabasePublicKey;

// Client for browser / public actions (publi key == the modern anon key).
export const supabase = createClient(supabaseUrl, supabasePublicKey);

// Server-side admin client. Prefers the service role key to bypass RLS; falls
// back to the public key (works when RLS is disabled / public policies grant access).
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
});
