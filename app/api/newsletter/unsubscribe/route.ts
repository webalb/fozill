import { NextResponse } from "next/server";
import { verifyUnsubscribeToken } from "@/lib/email/tokens";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const email = (searchParams.get("email") || "").trim().toLowerCase();
  const token = searchParams.get("token") || "";

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || origin;

  if (!email || !token || !verifyUnsubscribeToken(email, token)) {
    return NextResponse.redirect(`${baseUrl}/unsubscribe?error=invalid_token`);
  }

  try {
    // 1. Update subscriber status in database
    await supabaseAdmin
      .from("newsletter_subscribers")
      .update({ status: "unsubscribed" })
      .eq("email", email);

    // 2. Log event telemetry into newsletter_events
    await supabaseAdmin.from("newsletter_events").insert({
      email,
      event_type: "unsubscribe",
      metadata: {
        timestamp: new Date().toISOString(),
        user_agent: request.headers.get("user-agent") || "unknown",
      },
    });

    return NextResponse.redirect(`${baseUrl}/unsubscribe?success=1&email=${encodeURIComponent(email)}`);
  } catch (err) {
    console.error("Unsubscribe error:", err);
    return NextResponse.redirect(`${baseUrl}/unsubscribe?error=server_error`);
  }
}
