"use server";

import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { resend, isResendConfigured } from "@/lib/resend";

const RequestSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  workEmail: z.string().email("Please enter a valid email address."),
  organization: z.string().min(2, "Please enter your organization."),
  phone: z.string().min(7, "Please enter a valid phone / WhatsApp number."),
  category: z.enum([
    "business_brand",
    "competitor_radar",
    "political_identity",
    "economic_sector",
    "crisis_emergency",
  ]),
  targetEntity: z.string().min(2, "Please describe your target entity or topic."),
  engagement: z.enum(["adhoc_report", "monthly_retainer", "custom_advisory"]),
  notes: z.string().optional(),
});

export type BriefRequestState = {
  success?: boolean;
  message: string;
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function submitBriefRequest(
  _prevState: BriefRequestState | null,
  formData: FormData
): Promise<BriefRequestState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = RequestSchema.safeParse(raw);

  if (!parsed.success) {
    const firstError = parsed.error.errors[0];
    return {
      success: false,
      message: firstError?.message ?? "Please complete the required fields.",
    };
  }

  const data = parsed.data;

  try {
    const { error: dbError } = await supabaseAdmin.from("brief_requests").insert({
      full_name: data.fullName,
      work_email: data.workEmail,
      organization: data.organization,
      phone: data.phone,
      category: data.category,
      target_entity: data.targetEntity,
      engagement_type: data.engagement,
      notes: data.notes || null,
      created_at: new Date().toISOString(),
    });
    if (dbError) throw dbError;

    if (isResendConfigured) {
      const sanitizedOrgHeader = data.organization.replace(/[\r\n]+/g, " ").slice(0, 60);

      await resend.emails.send({
        from: "Fozill Intelligence <hello@fozill.com>",
        to: [process.env.FOUNDER_NOTIFICATION_EMAIL ?? ""].filter(Boolean),
        subject: `[NEW BRIEF REQUEST] ${sanitizedOrgHeader} - ${data.category}`,
        html: `<p><strong>Client:</strong> ${escapeHtml(data.fullName)} (${escapeHtml(data.organization)})</p>
               <p><strong>Email:</strong> ${escapeHtml(data.workEmail)} | <strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
               <p><strong>Category:</strong> ${escapeHtml(data.category)}</p>
               <p><strong>Target:</strong> ${escapeHtml(data.targetEntity)}</p>
               <p><strong>Engagement:</strong> ${escapeHtml(data.engagement)}</p>
               <p><strong>Notes:</strong> ${escapeHtml(data.notes || "None")}</p>`,
      });

      await resend.emails.send({
        from: "Fozill Intelligence <hello@fozill.com>",
        to: [data.workEmail],
        subject: "Received: Your Strategic Intelligence Brief Request",
        html: `<p>Dear ${escapeHtml(data.fullName)},</p>
               <p>We have received your briefing request regarding <strong>${escapeHtml(data.targetEntity)}</strong>.</p>
               <p>An intelligence analyst is reviewing the scope and will reach out within 4 business hours.</p>`,
      });
    }


    return {
      success: true,
      message: "Brief request logged. An analyst will reach out within 4 business hours.",
    };
  } catch (error) {
    console.error("Brief request failed:", error);
    return { success: false, message: "Something went wrong. Please try again or email hello@fozill.com." };
  }
}