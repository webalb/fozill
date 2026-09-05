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

export const isServiceRoleConfigured = Boolean(
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY
);

if (!isServiceRoleConfigured && typeof window === "undefined" && process.env.NODE_ENV !== "production") {
  console.warn(
    "[SECURITY WARNING] SUPABASE_SERVICE_ROLE_KEY is not set. Administrative database queries requiring RLS bypass may fail. Set SUPABASE_SERVICE_ROLE_KEY in your environment (.env.local)."
  );
}

// Client for browser / public actions (public key == the modern anon key).
export const supabase = createClient(supabaseUrl, supabasePublicKey);

// Server-side admin client. Prefers the service role key to bypass RLS; falls
// back to the public key for backward-compatibility during initial scaffolding.
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
});

