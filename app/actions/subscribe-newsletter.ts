"use server";

import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { resend, isResendConfigured } from "@/lib/resend";

const NewsletterSchema = z.object({
  email: z.string().email(),
});

export type NewsletterState = {
  success?: boolean;
  message: string;
};

export async function subscribeNewsletter(
  _prevState: NewsletterState | null,
  formData: FormData
): Promise<NewsletterState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = NewsletterSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, message: "Please enter a valid corporate email address." };
  }

  const email = parsed.data.email.toLowerCase();

  try {
    const { error: dbError } = await supabaseAdmin.from("newsletter_subscribers").insert({
      email,
      created_at: new Date().toISOString(),
    });

    if (dbError) throw dbError;

    if (isResendConfigured) {
      await resend.emails.send({
        from: "Fozill Intelligence <hello@fozill.com>",
        to: [email],
        subject: "Welcome to the Global Intelligence Digest",
        html: `<p>Thank you for subscribing to the Global Intelligence Digest.</p><p>The next weekly briefing is on its way.</p>`,
      });
    }

    return { success: true, message: "Subscribed. Welcome to the Global Intelligence Digest." };
  } catch (error) {
    console.error("Newsletter subscription failed:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
}
