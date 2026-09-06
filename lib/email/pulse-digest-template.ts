import { generateUnsubscribeToken, hashEmail } from "./tokens";

export interface PulseDigestEmailProps {
  pulse: {
    id: string;
    slug: string;
    title: string;
    summary: string;
    mood_index?: number | null;
    published_at?: string | null;
    pulse_items?: {
      id: string;
      title: string;
      body: string;
      signal?: string | null;
      implication?: string | null;
      recommendation?: string | null;
      premium?: boolean;
    }[];
  };
  recipientEmail: string;
  isTest?: boolean;
}

export function renderPulseDigestHtml({
  pulse,
  recipientEmail,
  isTest = false,
}: PulseDigestEmailProps): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fozill.com";
  const token = generateUnsubscribeToken(recipientEmail);
  const emailHash = hashEmail(recipientEmail);
  const unsubscribeUrl = `${baseUrl}/unsubscribe?email=${encodeURIComponent(
    recipientEmail
  )}&token=${token}`;
  const portalUrl = `${baseUrl}/indices?utm_source=fozill_digest&utm_medium=email&utm_campaign=${encodeURIComponent(
    pulse.slug
  )}`;
  const openTrackingUrl = `${baseUrl}/api/newsletter/track/open?slug=${encodeURIComponent(
    pulse.slug
  )}&e=${emailHash}`;

  const moodScore = pulse.mood_index ?? 50;
  const moodLabel =
    moodScore < 40
      ? "HIGH VOLATILITY / BEARISH"
      : moodScore < 65
      ? "PRICE SENSITIVE / CAUTIOUS"
      : "EXPANSIONARY / BULLISH";

  const formattedDate = pulse.published_at
    ? new Date(pulse.published_at).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  const items = pulse.pulse_items || [];

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${escapeHtml(pulse.title)} · Fozill Intelligence Digest</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { margin: 0; padding: 0; width: 100% !important; background-color: #0c0e10; }
    a { color: #D8A83E; text-decoration: none; }
    @media screen and (max-width: 600px) {
      .email-container { width: 100% !important; margin: auto !important; }
      .fluid-padded { padding-left: 18px !important; padding-right: 18px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #0c0e10; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  
  ${isTest ? `
  <div style="background-color: #D8A83E; color: #0c0e10; text-align: center; padding: 10px; font-family: 'Courier New', monospace; font-size: 11px; font-weight: bold; letter-spacing: 2px;">
    [CONFIDENTIAL TEST DISPATCH · ANALYST PREVIEW MODE]
  </div>
  ` : ""}

  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0c0e10;">
    <tr>
      <td align="center" style="padding: 24px 12px 40px 12px;">
        <!-- Email Container Card -->
        <table border="0" cellpadding="0" cellspacing="0" width="600" class="email-container" style="max-width: 600px; width: 100%; background-color: #121518; border: 1px solid #23272e; border-radius: 12px; overflow: hidden;">
          
          <!-- Top Classification Header -->
          <tr>
            <td style="background-color: #0c0e10; padding: 16px 28px; border-bottom: 1px solid #23272e;" class="fluid-padded">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="left" style="font-family: 'Courier New', monospace; font-size: 10px; color: #D8A83E; letter-spacing: 2px; text-transform: uppercase; font-weight: bold;">
                    FOZILL STRATEGIC INTELLIGENCE
                  </td>
                  <td align="right" style="font-family: 'Courier New', monospace; font-size: 9px; color: #71717a; letter-spacing: 1.5px; text-transform: uppercase;">
                    CONFIDENTIAL MEMO
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Issue Banner & Title -->
          <tr>
            <td style="padding: 32px 28px 20px 28px;" class="fluid-padded">
              <!-- Issue metadata bar -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 16px;">
                <tr>
                  <td align="left" style="font-family: 'Courier New', monospace; font-size: 11px; color: #a1a1aa;">
                    ${escapeHtml(formattedDate)}
                  </td>
                  <td align="right">
                    <span style="display: inline-block; background-color: rgba(216,168,62,0.15); border: 1px solid rgba(216,168,62,0.4); color: #D8A83E; font-family: 'Courier New', monospace; font-size: 10px; font-weight: bold; padding: 3px 8px; border-radius: 4px; letter-spacing: 1px;">
                      MOOD: ${moodScore.toFixed(1)}/100 · ${moodLabel}
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Main Title -->
              <h1 style="margin: 0 0 16px 0; font-family: Georgia, 'Times New Roman', serif; font-size: 26px; line-height: 34px; color: #f4f4f5; font-weight: bold; letter-spacing: -0.5px;">
                ${escapeHtml(pulse.title)}
              </h1>

              <!-- Executive Summary Callout -->
              <div style="background-color: #171b20; border-left: 3px solid #D8A83E; padding: 16px 20px; border-radius: 0 8px 8px 0; margin-bottom: 28px;">
                <div style="font-family: 'Courier New', monospace; font-size: 10px; color: #D8A83E; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 6px; font-weight: bold;">
                  EXECUTIVE SUMMARY
                </div>
                <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; line-height: 22px; color: #d4d4d8;">
                  ${escapeHtml(pulse.summary)}
                </p>
              </div>

              <!-- Section Divider -->
              <div style="border-top: 1px solid #23272e; margin-bottom: 24px;"></div>

              <div style="font-family: 'Courier New', monospace; font-size: 11px; color: #71717a; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 16px;">
                KEY MACRO SIGNALS & PULSE ITEMS (${items.length})
              </div>

              <!-- Pulse Items List -->
              ${items.map((item, idx) => `
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px; background-color: #161a1e; border: 1px solid #22272e; border-radius: 8px; overflow: hidden;">
                  <tr>
                    <td style="padding: 16px 20px;">
                      <!-- Item Header -->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 8px;">
                        <tr>
                          <td align="left" style="font-family: Georgia, 'Times New Roman', serif; font-size: 16px; font-weight: bold; color: #f4f4f5;">
                            ${idx + 1}. ${escapeHtml(item.title)}
                          </td>
                          ${item.signal ? `
                          <td align="right" style="white-space: nowrap; padding-left: 8px;">
                            <span style="font-family: 'Courier New', monospace; font-size: 10px; color: #D8A83E; background-color: rgba(216,168,62,0.12); padding: 2px 6px; border-radius: 4px; font-weight: bold;">
                              ${escapeHtml(item.signal)}
                            </span>
                          </td>
                          ` : ""}
                        </tr>
                      </table>

                      <!-- Item Body -->
                      <p style="margin: 0 0 12px 0; font-size: 13px; line-height: 20px; color: #a1a1aa;">
                        ${escapeHtml(item.body)}
                      </p>

                      ${item.implication ? `
                      <div style="margin-bottom: 8px; font-size: 12px; line-height: 18px; color: #d4d4d8;">
                        <strong style="color: #a1a1aa; font-family: 'Courier New', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 1px;">Strategic Implication:</strong> ${escapeHtml(item.implication)}
                      </div>
                      ` : ""}

                      ${item.recommendation ? `
                      <div style="background-color: #1a1f24; border-radius: 6px; padding: 8px 12px; font-size: 12px; line-height: 18px; color: #D8A83E;">
                        <strong style="font-family: 'Courier New', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #f4cc68;">Prescription:</strong> ${escapeHtml(item.recommendation)}
                      </div>
                      ` : item.premium ? `
                      <div style="background-color: #1a1f24; border: 1px dashed rgba(216,168,62,0.3); border-radius: 6px; padding: 8px 12px; font-size: 11px; line-height: 16px; color: #a1a1aa;">
                        🔒 <em>Attribution models and counter-narrative checklists are reserved for Enterprise Retainers.</em>
                      </div>
                      ` : ""}
                    </td>
                  </tr>
                </table>
              `).join("")}

              <!-- Enterprise Advisory Callout Banner -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 24px; margin-bottom: 24px; background: linear-gradient(135deg, #181c20 0%, #201a12 100%); border: 1px solid rgba(216,168,62,0.3); border-radius: 8px;">
                <tr>
                  <td style="padding: 24px 20px; text-align: center;">
                    <div style="font-family: Georgia, 'Times New Roman', serif; font-size: 18px; font-weight: bold; color: #f4f4f5; margin-bottom: 8px;">
                      Commission Bespoke Strategic Intelligence
                    </div>
                    <p style="margin: 0 0 16px 0; font-size: 13px; line-height: 20px; color: #a1a1aa; max-width: 460px; margin-left: auto; margin-right: auto;">
                      Obtain custom SOCMINT monitoring, regional voter perception tracking, or consumer boycott early warnings for your executive committee.
                    </p>
                    <a href="${portalUrl}" target="_blank" style="display: inline-block; background-color: #D8A83E; color: #0c0e10; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; font-weight: bold; padding: 12px 28px; border-radius: 6px; text-transform: uppercase; letter-spacing: 1px;">
                      Access Intelligence Portal →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Compliance & Legal Footer -->
          <tr>
            <td style="background-color: #0c0e10; padding: 24px 28px; border-top: 1px solid #23272e; text-align: center;" class="fluid-padded">
              <p style="margin: 0 0 8px 0; font-family: 'Courier New', monospace; font-size: 10px; color: #71717a; text-transform: uppercase; letter-spacing: 1px;">
                Fozill Strategic Intelligence Ltd · Sovereign & Corporate Advisory Desks
              </p>
              <p style="margin: 0 0 12px 0; font-size: 11px; line-height: 16px; color: #52525b;">
                You are receiving this intelligence dispatch because this address (<span style="color: #a1a1aa;">${escapeHtml(recipientEmail)}</span>) subscribed to the Fozill Global Intelligence Digest.
              </p>
              <p style="margin: 0; font-size: 11px; color: #71717a;">
                <a href="${unsubscribeUrl}" target="_blank" style="color: #71717a; text-decoration: underline;">
                  One-Click Unsubscribe
                </a>
                &nbsp;·&nbsp;
                <a href="${baseUrl}/about" target="_blank" style="color: #71717a; text-decoration: underline;">
                  Intelligence Methodology
                </a>
                &nbsp;·&nbsp;
                <a href="${baseUrl}/contact" target="_blank" style="color: #71717a; text-decoration: underline;">
                  Contact Desk
                </a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

  <!-- Non-blocking open tracking pixel -->
  <img src="${openTrackingUrl}" width="1" height="1" border="0" alt="" style="display: block; width: 1px; height: 1px; border: 0; outline: none;" />

</body>
</html>`;
}

function escapeHtml(str: string): string {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
