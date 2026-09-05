"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase";
import { requireAdmin } from "./admin-auth";

export type AdminOpState = { ok?: boolean; message?: string };

// ---------- Brief / Lead Requests ----------
export async function updateBriefStatus(
  briefId: string,
  status: "new" | "contacted" | "quoted" | "won" | "lost",
  notes?: string
): Promise<AdminOpState> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, message: "Unauthorized." };
  }

  const updates: Record<string, any> = { status };
  if (notes !== undefined) {
    updates.notes = notes;
  }

  const { error } = await supabaseAdmin
    .from("brief_requests")
    .update(updates)
    .eq("id", briefId);

  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin/briefs");
  revalidatePath("/admin");
  return { ok: true, message: "Brief request updated." };
}

export async function deleteBrief(briefId: string): Promise<AdminOpState> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, message: "Unauthorized." };
  }

  const { error } = await supabaseAdmin
    .from("brief_requests")
    .delete()
    .eq("id", briefId);

  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin/briefs");
  revalidatePath("/admin");
  return { ok: true, message: "Brief request deleted." };
}

// ---------- Subscribers ----------
export async function updateSubscriberStatus(
  subscriberId: string,
  status: "active" | "unsubscribed" | "bounced"
): Promise<AdminOpState> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, message: "Unauthorized." };
  }

  const { error } = await supabaseAdmin
    .from("newsletter_subscribers")
    .update({ status })
    .eq("id", subscriberId);

  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin/subscribers");
  revalidatePath("/admin");
  return { ok: true, message: "Subscriber status updated." };
}

export async function deleteSubscriber(subscriberId: string): Promise<AdminOpState> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, message: "Unauthorized." };
  }

  const { error } = await supabaseAdmin
    .from("newsletter_subscribers")
    .delete()
    .eq("id", subscriberId);

  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin/subscribers");
  revalidatePath("/admin");
  return { ok: true, message: "Subscriber deleted." };
}
