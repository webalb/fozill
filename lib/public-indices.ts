import { supabase } from "./supabase";
import { IntelligencePulse } from "./types";
import { PUBLIC_INDICES } from "./data/indices";

export async function getDynamicPulses(): Promise<IntelligencePulse[]> {
  try {
    const { data, error } = await supabase
      .from("intelligence_pulses")
      .select("*, pulse_items(*)")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(10);

    if (!error && data && data.length > 0) {
      return data as IntelligencePulse[];
    }
  } catch (err) {
    // Graceful fallback
  }

  // Synthesize fallback pulses from PUBLIC_INDICES
  return PUBLIC_INDICES.map((idx, i) => ({
    id: idx.id,
    slug: idx.slug,
    title: idx.title,
    summary: idx.summary,
    mood_index: idx.currentValue,
    status: "published",
    published_at: new Date(Date.now() - 86400000 * (i * 3 + 1)).toISOString(),
    created_at: new Date(Date.now() - 86400000 * (i * 3 + 1)).toISOString(),
    pulse_items: idx.keyTakeaways.map((takeaway, ti) => ({
      id: `${idx.id}-item-${ti}`,
      pulse_id: idx.id,
      title: `Takeaway ${ti + 1}: ${idx.category} Shift`,
      body: takeaway,
      signal: idx.changeValue,
      implication: "Sub-national consumer and merchant reallocation underway.",
      recommendation: "Review regional distribution channel pricing and inventory reserves.",
      premium: ti > 0,
      display_order: ti,
      created_at: new Date().toISOString(),
    })),
  }));
}

export async function getLatestMarketMood(): Promise<{
  mood: number;
  label: string;
  status: "positive" | "neutral" | "negative";
}> {
  try {
    const { data, error } = await supabase
      .from("intelligence_pulses")
      .select("mood_index, title")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(1);

    if (!error && data && data.length > 0 && data[0].mood_index != null) {
      const mood = Number(data[0].mood_index);
      return {
        mood,
        label: mood >= 65 ? "Expansion / Bullish" : mood <= 45 ? "High Price Pressure" : "Moderate Pressure",
        status: mood >= 65 ? "positive" : mood <= 45 ? "negative" : "neutral",
      };
    }
  } catch {
    // Fallback
  }

  return {
    mood: 58,
    label: "Moderate Price Sensitivity",
    status: "neutral",
  };
}
