import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// 1x1 transparent GIF bytes
const TRANSPARENT_GIF = Buffer.from(
  "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
  "base64"
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") || "unknown";
  const emailHash = searchParams.get("e") || "anonymous";

  // Non-blocking telemetry insertion
  (async () => {
    try {
      await supabaseAdmin.from("newsletter_events").insert({
        event_type: "open",
        digest_slug: slug,
        email: emailHash,
        metadata: {
          timestamp: new Date().toISOString(),
          user_agent: request.headers.get("user-agent") || "unknown",
        },
      });
    } catch (err) {
      // Telemetry failures must never disrupt image delivery
      console.error("Open tracking error:", err);
    }
  })();

  return new NextResponse(TRANSPARENT_GIF, {
    status: 200,
    headers: {
      "Content-Type": "image/gif",
      "Content-Length": TRANSPARENT_GIF.length.toString(),
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
      "Pragma": "no-cache",
      "Expires": "0",
    },
  });
}
