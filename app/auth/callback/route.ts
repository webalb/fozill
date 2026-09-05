import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";

function sanitizeNextPath(nextParam: string | null): string {
  if (!nextParam) return "/admin";
  // Must be a relative path starting with '/' and not a protocol-relative '//' or backslash
  if (nextParam.startsWith("/") && !nextParam.startsWith("//") && !nextParam.includes("\\")) {
    return nextParam;
  }
  return "/admin";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = sanitizeNextPath(searchParams.get("next"));

  if (code) {
    const supabase = await createServerSupabase();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(new URL(next, request.url));
    }

    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("error", "invalid_code");
    loginUrl.searchParams.set("next", next);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.redirect(new URL("/admin/login", request.url));
}

