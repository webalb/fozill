import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY || "re_placeholder_key";

export const resend = new Resend(resendApiKey);

export const isResendConfigured = Boolean(
  process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_placeholder_key"
);
