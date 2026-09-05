"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase";
import { requireAdmin } from "./admin-auth";

export type PublishState = { ok?: boolean; message?: string };

// ---------- Signals ----------
export async function upsertSignal(prev: PublishState | null, formData: FormData): Promise<PublishState> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, message: "Unauthorized." };
  }

  const id = formData.get("id")?.toString() || null;
  const record = {
    title: formData.get("title")?.toString() || "",
    body: formData.get("body")?.toString() || "",
    category: (formData.get("category")?.toString() || "business") as
      | "business"
      | "political"
      | "economic"
      | "sector"
      | "crisis",
    location: formData.get("location")?.toString() || null,
    direction: (formData.get("direction")?.toString() || "neutral") as "up" | "down" | "neutral",
    confidence: Number(formData.get("confidence")?.toString() || 0),
    premium: formData.get("premium") === "on",
    status: "draft",
  };

  if (!record.title || !record.body) {
    return { ok: false, message: "Title and body are required." };
  }

  if (id) {
    const { error } = await supabaseAdmin.from("intelligence_signals").update(record).eq("id", id);
    if (error) return { ok: false, message: error.message };
  } else {
    const { error } = await supabaseAdmin.from("intelligence_signals").insert(record);
    if (error) return { ok: false, message: error.message };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/signals");
  return { ok: true, message: "Signal saved as draft." };
}

export async function setSignalStatus(signalId: string, status: "published" | "draft" | "archived"): Promise<void> {
  try {
    await requireAdmin();
  } catch {
    return;
  }
  const { error } = await supabaseAdmin
    .from("intelligence_signals")
    .update({ status, published_at: status === "published" ? new Date().toISOString() : null })
    .eq("id", signalId);
  if (error) return;
  revalidatePath("/admin/signals");
}

// ---------- Pulses ----------
export async function createPulse(prev: PublishState | null, formData: FormData): Promise<PublishState> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, message: "Unauthorized." };
  }
  const title = formData.get("title")?.toString() || "";
  const summary = formData.get("summary")?.toString() || "";
  const mood = Number(formData.get("mood_index")?.toString() || 50);
  if (!title || !summary) return { ok: false, message: "Title and summary are required." };

  const slugBase = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
  const slug = `${slugBase}-${Date.now().toString(36)}`;

  const { error } = await supabaseAdmin
    .from("intelligence_pulses")
    .insert({ title, summary, mood_index: mood, slug, status: "draft" });
  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin/pulses");
  return { ok: true, message: "Pulse drafted. Add items, then publish." };
}

export async function setPulseStatus(pulseId: string, status: "published" | "draft" | "archived"): Promise<void> {
  try {
    await requireAdmin();
  } catch {
    return;
  }
  const { error } = await supabaseAdmin
    .from("intelligence_pulses")
    .update({ status, published_at: status === "published" ? new Date().toISOString() : null })
    .eq("id", pulseId);
  if (error) return;
  revalidatePath("/admin/pulses");
}

export async function addPulseItem(prev: PublishState | null, formData: FormData): Promise<PublishState> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, message: "Unauthorized." };
  }
  const pulseId = formData.get("pulse_id")?.toString() || "";
  const title = formData.get("title")?.toString() || "";
  const body = formData.get("body")?.toString() || "";
  const signal = formData.get("signal")?.toString() || null;
  const implication = formData.get("implication")?.toString() || null;
  const recommendation = formData.get("recommendation")?.toString() || null;
  const premium = formData.get("premium") === "on";
  if (!pulseId || !title || !body) return { ok: false, message: "Pulse, title and body are required." };

  const { error } = await supabaseAdmin.from("pulse_items").insert({
    pulse_id: pulseId,
    title,
    body,
    signal,
    implication,
    recommendation,
    premium,
  });
  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin/pulses");
  return { ok: true, message: "Pulse item added." };
}

export async function deleteSignal(signalId: string): Promise<PublishState> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, message: "Unauthorized." };
  }

  const { error } = await supabaseAdmin
    .from("intelligence_signals")
    .delete()
    .eq("id", signalId);

  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin");
  revalidatePath("/admin/signals");
  revalidatePath("/signals");
  revalidatePath("/");
  return { ok: true, message: "Signal deleted." };
}

export async function updatePulse(prev: PublishState | null, formData: FormData): Promise<PublishState> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, message: "Unauthorized." };
  }

  const pulseId = formData.get("pulse_id")?.toString() || "";
  const title = formData.get("title")?.toString() || "";
  const summary = formData.get("summary")?.toString() || "";
  const mood = Number(formData.get("mood_index")?.toString() || 50);

  if (!pulseId || !title || !summary) {
    return { ok: false, message: "Pulse ID, title, and summary are required." };
  }

  const { error } = await supabaseAdmin
    .from("intelligence_pulses")
    .update({ title, summary, mood_index: mood, updated_at: new Date().toISOString() })
    .eq("id", pulseId);

  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin/pulses");
  revalidatePath("/indices");
  return { ok: true, message: "Pulse updated." };
}

export async function deletePulse(pulseId: string): Promise<PublishState> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, message: "Unauthorized." };
  }

  const { error } = await supabaseAdmin
    .from("intelligence_pulses")
    .delete()
    .eq("id", pulseId);

  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin/pulses");
  revalidatePath("/indices");
  return { ok: true, message: "Pulse deleted." };
}

export async function updatePulseItem(prev: PublishState | null, formData: FormData): Promise<PublishState> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, message: "Unauthorized." };
  }

  const itemId = formData.get("item_id")?.toString() || "";
  const title = formData.get("title")?.toString() || "";
  const body = formData.get("body")?.toString() || "";
  const signal = formData.get("signal")?.toString() || null;
  const implication = formData.get("implication")?.toString() || null;
  const recommendation = formData.get("recommendation")?.toString() || null;
  const premium = formData.get("premium") === "on";

  if (!itemId || !title || !body) {
    return { ok: false, message: "Item ID, title, and body are required." };
  }

  const { error } = await supabaseAdmin
    .from("pulse_items")
    .update({
      title,
      body,
      signal,
      implication,
      recommendation,
      premium,
    })
    .eq("id", itemId);

  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin/pulses");
  revalidatePath("/indices");
  return { ok: true, message: "Pulse item updated." };
}

export async function deletePulseItem(itemId: string): Promise<PublishState> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, message: "Unauthorized." };
  }

  const { error } = await supabaseAdmin
    .from("pulse_items")
    .delete()
    .eq("id", itemId);

  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin/pulses");
  revalidatePath("/indices");
  return { ok: true, message: "Pulse item deleted." };
}

