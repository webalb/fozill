"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase";
import { resend, isResendConfigured } from "@/lib/resend";
import { requireAdmin } from "./admin-auth";
import { renderPulseDigestHtml } from "@/lib/email/pulse-digest-template";
import { generateUnsubscribeToken } from "@/lib/email/tokens";

const EmailSchema = z.string().email("Invalid email address.");

export interface AudienceSummary {
  total: number;
  active: number;
  unsubscribed: number;
  bounced: number;
}

export interface BroadcastHistoryItem {
  id: string;
  digest_slug: string;
  occurred_at: string;
  recipient_count: number;
  pulse_title?: string;
  is_simulated?: boolean;
  opens_count: number;
}

/**
 * Returns audience metrics for the broadcast modal.
 */
export async function getBroadcastAudienceSummary(): Promise<AudienceSummary> {
  await requireAdmin();

  const [totalRes, activeRes, unsubRes, bounceRes] = await Promise.all([
    supabaseAdmin.from("newsletter_subscribers").select("id", { count: "exact", head: true }),
    supabaseAdmin
      .from("newsletter_subscribers")
      .select("id", { count: "exact", head: true })
      .eq("status", "active"),
    supabaseAdmin
      .from("newsletter_subscribers")
      .select("id", { count: "exact", head: true })
      .eq("status", "unsubscribed"),
    supabaseAdmin
      .from("newsletter_subscribers")
      .select("id", { count: "exact", head: true })
      .eq("status", "bounced"),
  ]);

  return {
    total: totalRes.count ?? 0,
    active: activeRes.count ?? 0,
    unsubscribed: unsubRes.count ?? 0,
    bounced: bounceRes.count ?? 0,
  };
}

/**
 * Fetches pulse details with its items and renders preview HTML.
 */
export async function getPulseBroadcastPreview(pulseId: string) {
  await requireAdmin();

  const { data: pulse, error } = await supabaseAdmin
    .from("intelligence_pulses")
    .select("*, pulse_items(*)")
    .eq("id", pulseId)
    .single();

  if (error || !pulse) {
    throw new Error("Pulse not found.");
  }

  const sampleEmail = "analyst@fozill.com";
  const previewHtml = renderPulseDigestHtml({
    pulse,
    recipientEmail: sampleEmail,
    isTest: false,
  });

  return { pulse, previewHtml };
}

/**
 * Sends a single test email preview to the specified address.
 */
export async function sendTestBroadcast(pulseId: string, testEmail: string) {
  const { email: adminEmail } = await requireAdmin();

  const parsed = EmailSchema.safeParse(testEmail.trim().toLowerCase());
  if (!parsed.success) {
    return { success: false, message: parsed.error.errors[0]?.message || "Invalid email address." };
  }
  const recipient = parsed.data;

  const { data: pulse, error } = await supabaseAdmin
    .from("intelligence_pulses")
    .select("*, pulse_items(*)")
    .eq("id", pulseId)
    .single();

  if (error || !pulse) {
    return { success: false, message: "Pulse issue could not be found." };
  }

  const html = renderPulseDigestHtml({
    pulse,
    recipientEmail: recipient,
    isTest: true,
  });

  if (isResendConfigured) {
    try {
      await resend.emails.send({
        from: "Fozill Strategic Intelligence <digest@fozill.com>",
        to: [recipient],
        subject: `[TEST PREVIEW] ${pulse.title} · Fozill Intelligence Digest`,
        html,
      });
      return {
        success: true,
        message: `Test email preview successfully dispatched to ${recipient}.`,
      };
    } catch (err: any) {
      console.error("Resend test send error:", err);
      return {
        success: false,
        message: `Resend dispatch failed: ${err.message || "Unknown error"}`,
      };
    }
  } else {
    // Simulated delivery when API key is not configured in local development
    return {
      success: true,
      message: `[Simulated Dispatch] Resend API key is in development mode. Formatted preview generated for ${recipient}.`,
    };
  }
}

/**
 * Broadcasts a published Pulse issue to all active newsletter subscribers.
 */
export async function broadcastPulseToSubscribers(pulseId: string) {
  const { email: adminEmail } = await requireAdmin();

  // 1. Fetch Pulse and items
  const { data: pulse, error: pulseErr } = await supabaseAdmin
    .from("intelligence_pulses")
    .select("*, pulse_items(*)")
    .eq("id", pulseId)
    .single();

  if (pulseErr || !pulse) {
    return { success: false, message: "Pulse issue not found." };
  }

  if (pulse.status !== "published") {
    return {
      success: false,
      message: "Only published pulses can be broadcast to subscribers. Please publish this pulse first.",
    };
  }

  // 2. Query all active subscribers
  const { data: subscribers, error: subErr } = await supabaseAdmin
    .from("newsletter_subscribers")
    .select("id, email")
    .eq("status", "active");

  if (subErr || !subscribers || subscribers.length === 0) {
    return {
      success: false,
      message: "No active subscribers found in the registry to receive this broadcast.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fozill.com";
  const BATCH_SIZE = 50; // Resend batch limit is 100; use 50 for safety
  const batches = [];
  for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
    batches.push(subscribers.slice(i, i + BATCH_SIZE));
  }

  let sentCount = 0;

  for (const batch of batches) {
    const emailPayloads = batch.map((sub) => {
      const token = generateUnsubscribeToken(sub.email);
      const unsubUrl = `${baseUrl}/unsubscribe?email=${encodeURIComponent(sub.email)}&token=${token}`;
      return {
        from: "Fozill Strategic Intelligence <digest@fozill.com>",
        to: [sub.email],
        subject: `${pulse.title} · Fozill Intelligence Digest`,
        html: renderPulseDigestHtml({
          pulse,
          recipientEmail: sub.email,
          isTest: false,
        }),
        headers: {
          "List-Unsubscribe": `<${unsubUrl}>`,
        },
      };
    });

    if (isResendConfigured) {
      try {
        await resend.batch.send(emailPayloads);
      } catch (batchErr) {
        console.error("Resend batch dispatch failure:", batchErr);
      }
    }

    sentCount += batch.length;
  }

  // 3. Record outbound broadcast event in newsletter_events
  await supabaseAdmin.from("newsletter_events").insert({
    event_type: "send",
    digest_slug: pulse.slug,
    metadata: {
      pulse_id: pulse.id,
      pulse_title: pulse.title,
      total_recipients: sentCount,
      admin_email: adminEmail,
      is_simulated: !isResendConfigured,
      timestamp: new Date().toISOString(),
    },
  });

  revalidatePath("/admin/pulses");
  revalidatePath("/admin/subscribers");
  revalidatePath("/admin/analytics");

  return {
    success: true,
    recipientCount: sentCount,
    isSimulated: !isResendConfigured,
    message: isResendConfigured
      ? `Intelligence digest successfully broadcast to ${sentCount} active subscriber(s).`
      : `[Simulated Mode] Broadcast executed for ${sentCount} active subscriber(s). Outbound event logged to telemetry.`,
  };
}

/**
 * Returns historical broadcast events from newsletter_events.
 */
export async function getBroadcastHistory(): Promise<BroadcastHistoryItem[]> {
  await requireAdmin();

  const { data: events, error } = await supabaseAdmin
    .from("newsletter_events")
    .select("*")
    .eq("event_type", "send")
    .order("occurred_at", { ascending: false })
    .limit(20);

  if (error || !events) return [];

  // Query open counts per digest slug
  const slugs = Array.from(new Set(events.map((e) => e.digest_slug).filter(Boolean)));
  const opensPerSlug: Record<string, number> = {};

  if (slugs.length > 0) {
    const { data: openEvents } = await supabaseAdmin
      .from("newsletter_events")
      .select("digest_slug")
      .eq("event_type", "open")
      .in("digest_slug", slugs);

    (openEvents || []).forEach((oe) => {
      if (oe.digest_slug) {
        opensPerSlug[oe.digest_slug] = (opensPerSlug[oe.digest_slug] || 0) + 1;
      }
    });
  }

  return events.map((e) => {
    const meta = (e.metadata || {}) as any;
    return {
      id: e.id,
      digest_slug: e.digest_slug,
      occurred_at: e.occurred_at,
      recipient_count: meta.total_recipients ?? 0,
      pulse_title: meta.pulse_title || e.digest_slug,
      is_simulated: Boolean(meta.is_simulated),
      opens_count: opensPerSlug[e.digest_slug] ?? 0,
    };
  });
}
