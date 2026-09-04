"use server";

import { headers } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase";

export async function trackPageVisit(path: string) {
  try {
    const h = await headers();
    const userAgent = h.get("user-agent") || "";
    const referrer = h.get("referer") || "";
    const { error } = await supabaseAdmin.from("page_visits").insert({
      path,
      referrer,
      user_agent: userAgent.slice(0, 300),
    });
    if (error) {
      // Table may not exist yet (schema not applied) — fail silently.
      if (error.code === "PGRST205" || error.code === "42P01") return { ok: false as const };
      return { ok: false as const };
    }
    return { ok: true as const };
  } catch {
    return { ok: false as const };
  }
}

export async function trackSignalView(signalId: string) {
  try {
    const { error } = await supabaseAdmin.from("newsletter_events").insert({
      email: null,
      event_type: "open",
      metadata: { kind: "signal_preview", signal_id: signalId },
    });
    return { ok: !error };
  } catch {
    return { ok: false };
  }
}
