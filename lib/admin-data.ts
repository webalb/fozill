import { supabaseAdmin } from "./supabase";
import { requireAdmin } from "@/app/actions/admin-auth";

async function guard() {
  await requireAdmin();
}

// ---------- Overview counts ----------
export interface OverviewCounts {
  subscribers: number;
  activeSubscribers: number;
  briefRequests: number;
  newBriefRequests: number;
  signals: number;
  publishedSignals: number;
  pulses: number;
  visits: number;
}

export async function getOverviewCounts(): Promise<OverviewCounts> {
  await guard();
  const tbl = {
    subscribers: supabaseAdmin.from("newsletter_subscribers").select("id", { count: "exact", head: true }),
    activeSubscribers: supabaseAdmin
      .from("newsletter_subscribers")
      .select("id", { count: "exact", head: true })
      .eq("status", "active"),
    briefRequests: supabaseAdmin.from("brief_requests").select("id", { count: "exact", head: true }),
    newBriefRequests: supabaseAdmin
      .from("brief_requests")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),
    signals: supabaseAdmin.from("intelligence_signals").select("id", { count: "exact", head: true }),
    publishedSignals: supabaseAdmin
      .from("intelligence_signals")
      .select("id", { count: "exact", head: true })
      .eq("status", "published"),
    pulses: supabaseAdmin.from("intelligence_pulses").select("id", { count: "exact", head: true }),
    visits: supabaseAdmin.from("page_visits").select("id", { count: "exact", head: true }),
  };

  const zeroes = () => ({
    subscribers: 0,
    activeSubscribers: 0,
    briefRequests: 0,
    newBriefRequests: 0,
    signals: 0,
    publishedSignals: 0,
    pulses: 0,
    visits: 0,
  });

  let results: any[];
  try {
    results = await Promise.all(Object.values(tbl));
  } catch {
    return zeroes();
  }

  const count = (r: { count: number | null } | null) => r?.count ?? 0;
  return {
    subscribers: count(results[0]),
    activeSubscribers: count(results[1]),
    briefRequests: count(results[2]),
    newBriefRequests: count(results[3]),
    signals: count(results[4]),
    publishedSignals: count(results[5]),
    pulses: count(results[6]),
    visits: count(results[7]),
  };
}

// ---------- Subscribers ----------
export async function getSubscribers() {
  await guard();
  const { data, error } = await supabaseAdmin
    .from("newsletter_subscribers")
    .select("*")
    .order("subscribed_at", { ascending: false });
  if (error) return [];
  return data ?? [];
}

// ---------- Brief requests ----------
export async function getBriefRequests() {
  await guard();
  const { data, error } = await supabaseAdmin
    .from("brief_requests")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return [];
  return data ?? [];
}

// ---------- Page visit analytics ----------
export interface VisitTotals {
  total: number;
  byPath: { path: string; count: number }[];
  last7: { day: string; count: number }[];
}

export async function getVisitAnalytics(): Promise<VisitTotals> {
  await guard();
  const { data, error } = await supabaseAdmin
    .from("page_visits")
    .select("path, visited_at")
    .order("visited_at", { ascending: false })
    .limit(5000);
  if (error) {
    return { total: 0, byPath: [], last7: emptyWeek() };
  }

  const rows = (data ?? []) as { path: string; visited_at: string }[];
  const byPath: Record<string, number> = {};
  const byDay: Record<string, number> = {};
  const now = new Date();

  for (const row of rows) {
    byPath[row.path] = (byPath[row.path] ?? 0) + 1;
    const d = new Date(row.visited_at);
    const dayKey = d.toISOString().slice(0, 10);
    const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000);
    if (diffDays >= 0 && diffDays < 7) byDay[dayKey] = (byDay[dayKey] ?? 0) + 1;
  }

  const last7: { day: string; count: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 86400000);
    const key = d.toISOString().slice(0, 10);
    last7.push({ day: key.slice(5), count: byDay[key] ?? 0 });
  }

  return {
    total: rows.length,
    byPath: Object.entries(byPath)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 12),
    last7,
  };
}

function emptyWeek(): { day: string; count: number }[] {
  const out: { day: string; count: number }[] = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 86400000);
    out.push({ day: d.toISOString().slice(5, 10), count: 0 });
  }
  return out;
}

// ---------- Signals ----------
export async function getSignals() {
  await guard();
  const { data, error } = await supabaseAdmin
    .from("intelligence_signals")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return [];
  return data ?? [];
}

// ---------- Pulses ----------
export async function getPulses() {
  await guard();
  const { data, error } = await supabaseAdmin
    .from("intelligence_pulses")
    .select("*, pulse_items(*)")
    .order("created_at", { ascending: false });
  if (error) return [];
  return data ?? [];
}
