"use server";

import { createServerSupabase } from "@/lib/supabase-server";
import { ADMIN_EMAIL } from "@/lib/admin-email";

export interface AdminAuthState {
  ok?: boolean;
  error?: string;
  next?: string;
}

// Server-side check used by admin pages/actions (middleware does the first gate).
export async function requireAdmin(): Promise<{ email: string }> {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || (user.email || "").toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    throw new Error("Unauthorized");
  }
  return { email: user.email! };
}

export async function requestOtp(
  _prev: AdminAuthState | null,
  formData: FormData
): Promise<AdminAuthState> {
  const email = (formData.get("email")?.toString() || "").trim().toLowerCase();
  const rawNext = formData.get("next")?.toString() || "/admin";
  const next = rawNext.startsWith("/") && !rawNext.startsWith("//") && !rawNext.includes("\\")
    ? rawNext
    : "/admin";

  if (!email) return { error: "Enter your admin email." };

  // Security: Only trigger Supabase OTP dispatch for the configured administrator email.
  // This stops malicious actors from using Fozill as an unauthenticated email bombing / spam relay.
  const adminEmailNormalized = ADMIN_EMAIL.trim().toLowerCase();
  if (email !== adminEmailNormalized) {
    // Return generic success to prevent email enumeration while declining to dispatch outbound mail.
    return { ok: true, next };
  }

  // Production origin for OTP magic-link redirects. On Vercel set
  // NEXT_PUBLIC_SITE_URL=https://fozill.com; falls back to the production domain.
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://fozill.com";

  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`,
    },
  });

  if (error) {
    return { error: error.message || "Could not send the code. Check your auth settings." };
  }

  return { ok: true, next };
}

export async function verifyOtp(
  _prev: AdminAuthState | null,
  formData: FormData
): Promise<AdminAuthState> {
  const email = (formData.get("email")?.toString() || "").trim().toLowerCase();
  const token = (formData.get("otp")?.toString() || "").trim();
  const rawNext = formData.get("next")?.toString() || "/admin";
  const next = rawNext.startsWith("/") && !rawNext.startsWith("//") && !rawNext.includes("\\")
    ? rawNext
    : "/admin";

  if (!email || !token) return { error: "Email and code are required." };

  const adminEmailNormalized = ADMIN_EMAIL.trim().toLowerCase();
  if (email !== adminEmailNormalized) {
    return { error: "That code is invalid or expired. Try again." };
  }

  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.verifyOtp({ email, token, type: "email" });

  if (error) {
    return { error: "That code is invalid or expired. Try again." };
  }

  return { ok: true, next };
}


export async function logoutAdmin() {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();
  return { ok: true };
}
