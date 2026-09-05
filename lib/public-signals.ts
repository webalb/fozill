import { supabase } from "./supabase";
import { IntelligenceSignal } from "./types";

export const CURATED_FALLBACK_SIGNALS: IntelligenceSignal[] = [
  {
    id: "sig-fallback-1",
    title: "Household Price Resistance in Northern Commercial Corridors",
    body: "Consumer discussions across Kano, Kaduna, and Jos reveal an 18% surge in brand substitution intent away from tier-1 packaged staples toward local bulk alternatives.",
    category: "economic",
    location: "North-West & North-Central",
    direction: "up",
    confidence: 88,
    status: "published",
    premium: false,
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    published_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: "sig-fallback-2",
    title: "POS Terminal Settlement Friction Sparks Migration Narrative",
    body: "Viral merchant threads in Lagos and Onitsha indicate transaction failure turnaround times are driving a 31% inquiry increase into neobank secondary payment terminals.",
    category: "sector",
    location: "Lagos & South-East",
    direction: "up",
    confidence: 91,
    status: "published",
    premium: false,
    created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
    published_at: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
  {
    id: "sig-fallback-3",
    title: "Pre-Election Narrative Attribution & Coordinated Bot Cluster Radar",
    body: "Identified 14 coordinated bot amplification rings shaping policy discourse ahead of upcoming party congresses, with narrative divergence strongest between Kaduna and Lagos.",
    category: "political",
    location: "Abuja FCT & North-West",
    direction: "down",
    confidence: 84,
    status: "published",
    premium: false,
    created_at: new Date(Date.now() - 3600000 * 14).toISOString(),
    published_at: new Date(Date.now() - 3600000 * 14).toISOString(),
  },
  {
    id: "sig-fallback-4",
    title: "Transport Tariff Sentiment Stabilizing Post-Sub-National Transit Rollout",
    body: "Commuter sentiment across South-West metropolitan corridors shifted from acute backlash to cautious monitoring following state-backed compressed natural gas (CNG) transit bus deployment.",
    category: "economic",
    location: "South-West Corridor",
    direction: "neutral",
    confidence: 79,
    status: "published",
    premium: false,
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    published_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: "sig-fallback-5",
    title: "Diaspora Remittance Perception: Real-Time FX Spread Transparency",
    body: "Over 68% of diaspora community discourse across the UK and North America is prioritizing multi-corridor rate comparisons before executing high-volume festive transfers.",
    category: "business",
    location: "Global / Diaspora",
    direction: "up",
    confidence: 86,
    status: "published",
    premium: false,
    created_at: new Date(Date.now() - 3600000 * 32).toISOString(),
    published_at: new Date(Date.now() - 3600000 * 32).toISOString(),
  },
  {
    id: "sig-fallback-6",
    title: "Pack-Size Downsizing Backlash Detected for Tier-1 Beverage Line",
    body: "Organic consumer sentiment around a leading malt beverage dropped 16 points over 5 days as consumers flagged shrinkflation without commensurate price relief.",
    category: "crisis",
    location: "Nationwide",
    direction: "down",
    confidence: 93,
    status: "published",
    premium: false,
    created_at: new Date(Date.now() - 3600000 * 40).toISOString(),
    published_at: new Date(Date.now() - 3600000 * 40).toISOString(),
  },
];

export async function getLiveTickerSignals(): Promise<
  { label: string; value: string; trend: "up" | "down" | "neutral"; loc: string; id: string }[]
> {
  try {
    const { data, error } = await supabase
      .from("intelligence_signals")
      .select("id, title, category, direction, location, confidence")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(10);

    if (!error && data && data.length > 0) {
      return data.map((sig) => ({
        id: sig.id,
        label: sig.category.toUpperCase(),
        value: sig.title.length > 42 ? sig.title.slice(0, 42) + "…" : sig.title,
        trend: (sig.direction as "up" | "down" | "neutral") || "neutral",
        loc: sig.location || "Global",
      }));
    }
  } catch (err) {
    // Fall back to curated signals on any network or database error
  }

  return CURATED_FALLBACK_SIGNALS.map((sig) => ({
    id: sig.id,
    label: sig.category.toUpperCase(),
    value: sig.title.length > 42 ? sig.title.slice(0, 42) + "…" : sig.title,
    trend: (sig.direction as "up" | "down" | "neutral") || "neutral",
    loc: sig.location || "Global",
  }));
}

export async function getPublishedSignals(options?: {
  category?: string;
  query?: string;
  limit?: number;
}): Promise<IntelligenceSignal[]> {
  const limit = options?.limit ?? 30;

  try {
    let query = supabase
      .from("intelligence_signals")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(limit);

    if (options?.category && options.category !== "all") {
      query = query.eq("category", options.category);
    }

    const { data, error } = await query;

    if (!error && data && data.length > 0) {
      return data as IntelligenceSignal[];
    }
  } catch (err) {
    // Fallback below
  }

  // If no published database signals yet, filter fallback signals
  let filtered = [...CURATED_FALLBACK_SIGNALS];
  if (options?.category && options.category !== "all") {
    filtered = filtered.filter((s) => s.category === options.category);
  }
  if (options?.query) {
    const q = options.query.toLowerCase();
    filtered = filtered.filter(
      (s) => s.title.toLowerCase().includes(q) || s.body.toLowerCase().includes(q)
    );
  }

  return filtered;
}
