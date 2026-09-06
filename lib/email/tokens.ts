import crypto from "crypto";

const SECRET =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.AUTH_SECRET ||
  "fozill_production_hmac_secret_key_2026";

/**
 * Generates an HMAC-SHA256 token for an email address to allow safe,
 * cryptographically signed 1-click unsubscriptions without user login.
 */
export function generateUnsubscribeToken(email: string): string {
  const normalized = email.trim().toLowerCase();
  return crypto
    .createHmac("sha256", SECRET)
    .update(`unsubscribe:${normalized}`)
    .digest("hex")
    .slice(0, 32);
}

/**
 * Verifies that the provided token matches the HMAC signature of the email.
 */
export function verifyUnsubscribeToken(email: string, token: string): boolean {
  if (!email || !token) return false;
  const expected = generateUnsubscribeToken(email);
  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(token));
  } catch {
    return false;
  }
}

/**
 * Creates an obfuscated SHA-256 hash of an email address for privacy-safe
 * telemetry logging (open tracking / click attribution).
 */
export function hashEmail(email: string): string {
  const normalized = email.trim().toLowerCase();
  return crypto.createHash("sha256").update(normalized).digest("hex").slice(0, 16);
}
