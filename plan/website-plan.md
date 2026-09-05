# Strategic Intelligence Platform: Website Master Plan & Architecture

> **Positioning:** *"We turn Nigeria's fragmented public information into strategic, high-stakes intelligence for business, political, and economic leaders."*

---

## 1. Executive Strategy & Website Vision

### 1.1 Core Objectives
1. **Establish Institutional Trust & Authority:** Move away from "social media monitoring tool" or "scraping agency" framing. The website must project the gravitas of a tier-1 intelligence & advisory firm (combining the data density of Bloomberg/Stratfor with the sleek modernity of Palantir).
2. **Lean Commercial Beachhead:** Capture the first 5–10 paying enterprise/political retainer clients (₦250k–₦1.5m+/month) and ad-hoc intelligence brief projects (₦500k–₦2m+) before investing in heavy automated scraping infrastructure.
3. **High-Converting Lead Magnet Engine:** Collect qualified enterprise and executive emails via weekly free intelligence indices (e.g., *Nigeria Consumer Pressure Index*, *Bi-weekly Political Sentiment Brief*).
4. **Interactive Sample Intelligence Showcase:** Show—don't just tell—what an executive intelligence brief looks like (Executive Summary, Geopolitical Perception, Narrative Drivers, Influencer Impact, Strategic Recommendation).
5. **Zero-Cost Infrastructure on Vercel Free Tier:** Leverage Next.js App Router, Static Site Generation (SSG), Incremental Static Regeneration (ISR), React Server Components (RSC), and free-tier ecosystem services (Supabase, Resend, Vercel OG).

---

## 2. Brand Identity & Visual Design System

### 2.1 Preserved Color Palette & Design Tokens
The design system combines deep institutional darks with warm, tactile editorial lights and a distinctive secondary gold accent to convey executive authority, prestige, and rigorous analytical depth:

* **Dark Canvas / Background:** `#111315` (Deep Charcoal Obsidian)
  * *Elevated Surfaces / Cards:* `#181B1E` / `#202428`
  * *Borders & Dividers:* `#2C3138`
* **Light Canvas / Background:** `#F5F5F2` (Warm Alabaster / Editorial Paper)
  * *Light Surface / Card Elements:* `#FFFFFF`
  * *Light Borders / Hairlines:* `#E4E4DC`
* **Secondary Accent (Intelligence Gold):** `#D8A83E` (Prestigious Gold for brand emblems, active badges, highlights, primary CTAs, signal markers)
  * *Gold Tint / Muted Hover:* `#F3CB6C`
  * *Subtle Gold Backdrop Glow:* `rgba(216, 168, 62, 0.12)`
* **Semantic Status Accents:**
  * Positive Sentiment / Stable: `#10B981` (Emerald)
  * Neutral / Ambiguous: `#8E95A2` (Slate Gray)
  * Negative / Risk Backlash: `#EF4444` (Crimson Alert)

### 2.2 Typography System

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             TYPOGRAPHY SYSTEM                               │
├────────────────────────┬───────────────────┬────────────────────────────────┤
│ Role                   │ Font Family       │ Usage Scope                    │
├────────────────────────┼───────────────────┼────────────────────────────────┤
│ Headings & Titles      │ Manrope           │ Hero titles, H1-H4, section    │
│ & Brand Elements       │ (Google Font)     │ headers, nav links, badges     │
├────────────────────────┼───────────────────┼────────────────────────────────┤
│ Body Text & Editorial  │ Source Serif 4    │ Long-form intelligence copy,   │
│ Copy                   │ (Google Font)     │ dossiers, executive briefs     │
├────────────────────────┼───────────────────┼────────────────────────────────┤
│ Data Tickers, Metrics  │ JetBrains Mono    │ Sentiment scores, percentages, │
│ & Coordinates          │ (or Geist Mono)   │ timestamps, geo-coordinates    │
└────────────────────────┴───────────────────┴────────────────────────────────┘
```

#### Next.js Font Configuration Setup (`app/layout.tsx`)
```tsx
import { Manrope, Source_Serif_4, JetBrains_Mono } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} dark`}>
      <body className="bg-[#111315] text-[#F5F5F2] font-body antialiased selection:bg-[#D8A83E] selection:text-[#111315]">
        {children}
      </body>
    </html>
  );
}
```

### 2.3 Core UI Micro-Components
* **Live Intelligence Ticker:** Sub-header marquee showing real-time indexed data points (e.g., *`[FMCG Index: Price Sensitivity ↑ 14%] • [Lagos Sentiment: 64% Pos] • [Northern Corridor: Hausa-language discourse 71% Eco-focused]`* in `font-mono` with `#D8A83E` gold accent tags).
* **Intelligence Brief Preview Cards:** Card layout styled like redacted intelligence dossiers with structured sections (Health, Emerging Narratives, Influencer Share, Strategic Next Step).
* **Nigeria Geopolitical Zone Breakdown:** Visual interactive component comparing sentiments across 6 geopolitical zones (North-West, North-East, North-Central, South-West, South-East, South-South).

---

## 3. Site Map & Information Architecture

```
fozill.com (or platform domain)
│
├── / (Homepage: Hero, Live Signal Ticker, 3 Pillars, Sample Dossier, Customer Ladder, Lead Magnet)
│
├── /solutions
│   ├── /business-marketing    (Brand Health, Competitor Radar, Customer Complaint Intelligence)
│   ├── /political-identity    (Perception Mapping, Narrative Tracking, 2027 Election Window)
│   └── /economic-intelligence (Consumer Pressure Index, Sector Reports, Policy Impact Analysis)
│
├── /briefs (Sample Interactive Intelligence Briefs & Case Studies)
│   ├── /briefs/sample-fmcg-pricing-crisis
│   ├── /briefs/sample-geopolitical-policy-reaction
│   └── /briefs/sample-banking-fintech-migration
│
├── /indices (Public Free Intelligence & Data Snapshots - Lead Magnet Engine)
│   ├── /indices/consumer-pressure-index
│   └── /indices/weekly-nigeria-brief
│
├── /pricing (4-Tier Revenue Model: Ad-Hoc Reports, Monthly Retainers, Enterprise Platform, Strategic Advisory)
│
├── /about (Methodology: SOCMINT + Localized NLP + Human Analysis Moat)
│
├── /contact (Multi-step Executive Intelligence Request Form)
│
└── /portal/demo (Interactive Read-Only Intelligence Workspace Preview)
```

---

## 4. Detailed Page-by-Page Blueprints

### 4.1 Homepage (`/`)
* **Hero Section:**
  * **Headline (`font-heading font-bold text-[#F5F5F2]`):** *"Turn Nigeria's Public Signals Into Strategic Decisions."*
  * **Subheadline (`font-body text-[#F5F5F2]/80 text-lg`):** *"We monitor public discourse, digital media, regional sentiment, and institutional data across Nigeria to tell CEOs, CMOs, and political leaders what is happening, why, and what to do next."*
  * **CTAs:** `[Request an Intelligence Brief]` (Primary `#D8A83E` gold button with `#111315` text) + `[View Sample Intelligence Dossier]` (Secondary ghost button with subtle `#2C3138` border and `#F5F5F2` text).
  * **Hero Visual:** An interactive SVG/Canvas Mockup of the **Nigeria Intelligence Graph** with glowing `#D8A83E` gold nodes connecting *Entities → Narratives → Geographies → Sentiment*.
* **Live Signal Ticker:** Real-time data banner summarizing latest weekly indexed insights.
* **The 3 Strategic Intelligence Pillars (Interactive Tabs):**
  1. **Business & Marketing Intelligence:** Brand health, competitor surveillance, influencer authenticity.
  2. **Political & Public Identity Intelligence:** Multi-lingual narrative tracking (Hausa, Yoruba, Igbo, Pidgin, English) across Nigeria's 36 states + FCT.
  3. **Economic & Market Intelligence:** Sector-by-sector consumer pressure & market entry intelligence.
* **Interactive Sample Intelligence Brief Component:**
  * Embedded executive brief showing:
    * Brand Health Score (`61% Positive | 23% Neutral | 16% Negative`)
    * Shift Velocity (`Customer complaints about pricing ↑ 31% over 7 days`)
    * Dominant Narrative (`"Alternative brand offers better value per gram"`)
    * Geopolitical Distribution (`Lagos: Mild Concern | Kano: High Backlash`)
    * Recommended Strategic Response.
* **The Moat / Methodology Section:**
  * Why generic Western tools fail in Nigeria: Nuance in Nigerian Pidgin, Hausa/Yoruba/Igbo cultural discourse, contextual slang ("*This thing don cost*"), and dark social distribution.
* **Engagement Ladder & Pricing Snapshot:**
  * Ad-hoc Reports vs Monthly Retainers vs Custom Advisory.
* **Executive Newsletter Lead Magnet (Footer CTA):**
  * *"Subscribe to the Weekly Nigeria Intelligence Digest — Read by leaders in Banking, FMCG, and Governance."*

---

### 4.2 Solution Pages (`/solutions/*`)

#### A. Business & Marketing Intelligence (`/solutions/business-marketing`)
* **Target Audience:** CMOs, Brand Directors, FMCG/Fintech Product Leaders.
* **Key Use Cases:**
  * *Competitor Momentum Radar:* Know when a rival product is gaining organic traction before it shows up in Nielsen/quarterly sales.
  * *Brand Crisis Early Warning:* Detect customer dissatisfaction on TikTok, X, Facebook, and forums before mainstream media pickup.
  * *Influencer ROI & Network Impact:* Distinguish paid superficial engagement from real community sentiment drivers.
* **Deliverables Displayed:** Daily Executive Briefs, Competitor Battlecards, Monthly Brand Health Audits.

#### B. Political & Brand Identity Intelligence (`/solutions/political-identity`)
* **Target Audience:** Political Strategists, Public Figures, Institutional Affairs Directors, State Governors' Communications Teams.
* **Key Positioning:** Not a "social media boosting agency" — this is strategic perception intelligence.
* **Key Capabilities:**
  * Regional & Geopolitical sentiment comparison (e.g. Kano vs Kaduna vs Lagos vs Port Harcourt).
  * Narrative attribution: Who initiated a smear campaign or organic rumor? Which 5 accounts amplified it?
  * Counter-narrative effectiveness testing.
* **2027 Election Cycle Beachhead Callout:** Data-driven voter sentiment and grassroots issue tracking.

#### C. Economic & Sector Intelligence (`/solutions/economic-intelligence`)
* **Target Audience:** Private Equity, Venture Capital, Corporate Strategy Heads, Foreign Investors entering Nigeria.
* **Key Capabilities:**
  * Macro sentiment on FX, subsidy reforms, inflation, and purchasing power shifts.
  * Sector Deep Dives (Affordable Housing, FMCG, Digital Lending, Renewable Energy).
  * Consumer Price Sensitivity Tracking.

---

### 4.3 Interactive Sample Dossiers (`/briefs/*`)
* **Concept:** Prospective enterprise clients don't buy abstract promises—they buy tangible executive reports.
* **Format:**
  * Top Meta: Classification Level (e.g., `CONFIDENTIAL / FOR EXECUTIVE ACTION`), Date, Sector, Target Entity.
  * Section 1: Executive Summary (`font-body text-[#F5F5F2]` in editorial 3-bullet layout).
  * Section 2: Sentiment Breakdown & Velocity Charts (using Tremor / Recharts styled with `#D8A83E` and semantic tones).
  * Section 3: Geopolitical Distribution Map.
  * Section 4: Narrative Clustering & Influencer Nodes.
  * Section 5: Strategic Advisory (Prescriptive recommendations).
  * Action Bar: `[Download Sample PDF]` & `[Commission a Brief for Your Organization]`.

---

### 4.4 Public Intelligence Index & Thought Leadership (`/indices` & `/briefs`)
* **SEO & Authority Engine:**
  * MDX-based publishing system (`app/indices/[slug]/page.tsx`).
  * Free bi-weekly index reports published with interactive charts.
  * High-intent SEO keywords: *"Nigeria FMCG consumer sentiment 2026"*, *"Brand perception report Nigeria"*, *"Nigeria political sentiment analysis"*.
  * Automatic OpenGraph Image generation (`@vercel/og`) showing the title, index score, and `#D8A83E` gold accent branding on Twitter/LinkedIn shares.

---

### 4.5 Transparent Engagement & Pricing Model (`/pricing`)
Based on the 4-Layer Revenue Model:

| Tier | Format | Pricing Hypothesis | Target Client | Key Deliverables |
| :--- | :--- | :--- | :--- | :--- |
| **Layer 1: Ad-Hoc Brief** | Single Project | ₦500k – ₦2.0m | Mid-Market / Event-Driven | Single comprehensive intelligence dossier (Brand, Competitor, Crisis, or Market Entry). |
| **Layer 2: Executive Retainer** | Monthly Recurring | ₦250k (Starter)<br>₦750k (Pro)<br>₦1.5m+ (Enterprise) | Brands, Fintechs, Political Offices | Daily/Weekly Morning Briefs, continuous alert monitoring, monthly strategic review call. |
| **Layer 3: Enterprise Platform** | SaaS Access (Waitlist) | Custom / Annual Contract | Tier-1 Conglomerates, Telecoms | Multi-seat workspace, custom scraping feeds, API access, historical sentiment database. |
| **Layer 4: Strategic Advisory** | Bespoke Advisory | Retainer + Success / Project Fee | Boardrooms & Campaign Committees | C-Suite decision advisory, crisis counter-strategy, boardroom intelligence presentations. |

*Includes interactive ROI Calculator and "Book a Confidential Discovery Call" modal.*

---

### 4.6 Lead Capture & Multi-Step Discovery Form (`/contact`)
* **Form Steps:**
  1. *Intelligence Focus:* [ ] Business & Brand [ ] Competitor Surveillance [ ] Political / Public Figure [ ] Economic / Sector Research [ ] Crisis Response
  2. *Target Entities:* Input brand name, competitors, or topics of interest.
  3. *Geographic Scope:* [ ] Nationwide Nigeria [ ] Specific Geopolitical Zones / States [ ] Diaspora / Regional West Africa
  4. *Urgency & Frequency:* [ ] Emergency Ad-Hoc Report (Within 48h) [ ] Weekly Retainer [ ] Monthly Strategy Briefing
  5. *Contact Details:* Name, Corporate/Official Email, Organization, WhatsApp/Phone.
* **Backend:** Next.js Server Action submitting to Resend (immediate email alert to founders) + Supabase (stored lead database) + auto-confirmation email with attached Sample Intelligence Brief PDF.

---

## 5. Technical Architecture (Optimized for Next.js & Vercel Free Tier)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          VERCEL HOBBY (FREE TIER)                           │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                        NEXT.JS 15 (APP ROUTER)                      │   │
│   │                                                                     │   │
│   │   Static Generation (SSG) & ISR        React Server Components      │   │
│   │   - Homepage, Solutions, Pricing       - Fast zero-bundle data UI   │   │
│   │   - MDX Briefs & Indices               - Dynamic OpenGraph cards    │   │
│   │                                                                     │   │
│   │   Client Islands (Interactive)         Server Actions               │   │
│   │   - Tremor/Recharts charts             - Lead submission handling   │   │
│   │   - Multi-step inquiry form            - Newsletter subscription    │   │
│   └──────────────────┬─────────────────────────────────┬────────────────┘   │
└──────────────────────┼─────────────────────────────────┼────────────────────┘
                       │                                 │
                       ▼                                 ▼
        ┌─────────────────────────────┐   ┌─────────────────────────────┐
        │    SUPABASE (FREE TIER)     │   │      RESEND (FREE TIER)     │
        │ - PostgreSQL Lead Storage   │   │ - Instant Founder Alert     │
        │ - Newsletter Subscribers    │   │ - Client Auto-Responder     │
        │ - Read-Only Demo Brief Data │   │   with Sample PDF Link      │
        └─────────────────────────────┘   └─────────────────────────────┘
```

### 5.1 Tailwind CSS Configuration (`tailwind.config.ts`)
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          dark: "#111315",
          light: "#F5F5F2",
        },
        surface: {
          dark: "#181B1E",
          elevated: "#202428",
        },
        border: {
          dark: "#2C3138",
          light: "#E4E4DC",
        },
        gold: {
          DEFAULT: "#D8A83E",
          hover: "#F3CB6C",
          muted: "rgba(216, 168, 62, 0.15)",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Manrope", "sans-serif"],
        body: ["var(--font-body)", "Source Serif 4", "serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
```

### 5.2 Vercel Free Tier Strategy & Zero-Cost Optimization
| Consideration | Free Tier Constraint | Architecture Solution |
| :--- | :--- | :--- |
| **Serverless Execution** | 100 GB-hours / 10s max timeout | Use **Static Generation (SSG)** and **ISR** for all content pages. Server Actions handle lightweight JSON submissions (< 500ms). |
| **Bandwidth** | 100 GB / month | Optimized `next/image` with WebP/AVIF formats; static asset compression; self-hosted SVGs. |
| **Edge Middleware** | Free usage limits | Minimal lightweight middleware for headers and security; avoid unnecessary Edge computation. |
| **Database** | Vercel Postgres has limits | Use **Supabase Free Tier** (500MB DB, 50k monthly active users) for lead storage and client metadata. |
| **Email Dispatch** | N/A (External service) | Use **Resend Free Tier** (3,000 emails/mo, 100/day) via `resend` SDK and `@react-email/components`. |
| **CMS for Intelligence Briefs** | N/A | **Local MDX** with Frontmatter. No expensive headless CMS subscription required. Edit markdown files and git push to redeploy. |
| **Dynamic OG Images** | Fast compute | Next.js `@vercel/og` (`ImageResponse`) to generate dynamic branded share images on the fly. |

---

## 6. Proposed Project Directory Structure (Next.js App Router)

```
fozill-web/
├── app/
│   ├── layout.tsx                     # Root layout: Manrope, Source Serif 4, JetBrains Mono, Theme Provider
│   ├── page.tsx                       # High-converting Homepage
│   ├── globals.css                    # Tailwind CSS tokens & color variables (#111315, #F5F5F2, #D8A83E)
│   │
│   ├── solutions/
│   │   ├── business-marketing/page.tsx
│   │   ├── political-identity/page.tsx
│   │   └── economic-intelligence/page.tsx
│   │
│   ├── briefs/
│   │   ├── page.tsx                   # Archive of sample briefs & case studies
│   │   └── [slug]/page.tsx            # MDX Rendered Intelligence Dossier
│   │
│   ├── indices/
│   │   ├── page.tsx                   # Public Intelligence Index Hub
│   │   └── [slug]/page.tsx            # Dynamic Index Analysis Page
│   │
│   ├── pricing/page.tsx               # 4-Layer Retainer & Ad-hoc Pricing Table
│   ├── about/page.tsx                 # Methodology, Moat, and Leadership
│   ├── contact/page.tsx               # Discovery Request & Brief Order Flow
│   ├── portal/demo/page.tsx           # Read-Only Interactive Intelligence Dashboard Demo
│   │
│   ├── api/
│   │   ├── og/route.tsx               # Dynamic OpenGraph Card Generator with #D8A83E Branding
│   │   └── subscribe/route.ts         # Newsletter subscription endpoint
│   │
│   └── actions/
│       ├── submit-brief-request.ts    # Server Action: Validates lead & triggers Resend email
│       └── subscribe-newsletter.ts    # Server Action: Inserts email into Supabase
│
├── components/
│   ├── ui/                            # shadcn/ui primitives (Button, Card, Input, Dialog, Badge, Tabs)
│   ├── navigation/
│   │   ├── navbar.tsx                 # Sleek sticky header with active signal status & #D8A83E accents
│   │   └── footer.tsx                 # Comprehensive institutional footer
│   ├── hero/
│   │   ├── hero-section.tsx
│   │   ├── signal-ticker.tsx          # Real-time intelligence marquee with font-mono
│   │   └── intelligence-graph-mock.tsx# Dynamic graph node visualization with gold connection nodes
│   ├── intelligence/
│   │   ├── dossier-card.tsx           # Redacted intelligence dossier preview
│   │   ├── geopolitical-map.tsx       # 6 Geopolitical zones sentiment comparison
│   │   ├── narrative-cluster.tsx      # Top emerging narratives & momentum indicators
│   │   └── sentiment-gauge.tsx        # Visual sentiment meter (Pos / Neu / Neg)
│   ├── forms/
│   │   ├── discovery-form.tsx         # Multi-step inquiry wizard
│   │   └── newsletter-box.tsx         # Sleek single-input lead capture
│   └── portal/
│       ├── demo-charts.tsx            # Tremor / Recharts interactive widgets
│       └── alert-feed.tsx             # Simulated real-time intelligence feed
│
├── content/                           # MDX files for intelligence briefs and indices
│   ├── briefs/
│   │   ├── fmcg-pricing-crisis-q1.mdx
│   │   ├── fintech-retention-sentiment.mdx
│   │   └── regional-policy-perception.mdx
│   └── indices/
│       ├── consumer-pressure-index-aug-2026.mdx
│       └── business-sentiment-tracker.mdx
│
├── lib/
│   ├── supabase.ts                    # Supabase client singleton
│   ├── resend.ts                      # Resend email client
│   ├── mdx.ts                         # Helper functions to read & parse local MDX
│   └── utils.ts                       # Tailwind merge & helper utilities
│
├── public/
│   ├── samples/
│   │   └── sample-nigeria-intelligence-brief.pdf # High-value downloadable asset
│   ├── icons/
│   └── images/
│
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

---

## 7. Key Implementation Code Blueprints

### 7.1 Server Action: Discovery & Intelligence Brief Request (`app/actions/submit-brief-request.ts`)
```typescript
"use server";

import { z } from "zod";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const RequestSchema = z.object({
  fullName: z.string().min(2),
  workEmail: z.string().email(),
  organization: z.string().min(2),
  phoneOrWhatsApp: z.string().min(8),
  intelligenceCategory: z.enum([
    "business_brand",
    "competitor_radar",
    "political_identity",
    "economic_sector",
    "crisis_emergency"
  ]),
  targetEntityOrKeywords: z.string().min(2),
  engagementType: z.enum(["adhoc_report", "monthly_retainer", "custom_advisory"]),
  notes: z.string().optional()
});

export async function submitBriefRequest(formData: unknown) {
  try {
    const parsed = RequestSchema.parse(formData);

    // 1. Store in Supabase Lead CRM
    const { error: dbError } = await supabase
      .from("brief_requests")
      .insert([
        {
          full_name: parsed.fullName,
          work_email: parsed.workEmail,
          organization: parsed.organization,
          phone: parsed.phoneOrWhatsApp,
          category: parsed.intelligenceCategory,
          target_entity: parsed.targetEntityOrKeywords,
          engagement_type: parsed.engagementType,
          notes: parsed.notes,
          created_at: new Date().toISOString()
        }
      ]);

    if (dbError) throw new Error(dbError.message);

    // 2. Dispatch High-Priority Alert to Founders
    await resend.emails.send({
      from: "Intelligence System <alerts@fozill.com>",
      to: [process.env.FOUNDER_NOTIFICATION_EMAIL!],
      subject: `🚨 [NEW BRIEF REQUEST] ${parsed.organization} - ${parsed.intelligenceCategory}`,
      html: `
        <h2>New Intelligence Brief Inquiry</h2>
        <p><strong>Client:</strong> ${parsed.fullName} (${parsed.organization})</p>
        <p><strong>Email:</strong> ${parsed.workEmail} | <strong>Phone:</strong> ${parsed.phoneOrWhatsApp}</p>
        <p><strong>Category:</strong> ${parsed.intelligenceCategory}</p>
        <p><strong>Target Entity:</strong> ${parsed.targetEntityOrKeywords}</p>
        <p><strong>Engagement:</strong> ${parsed.engagementType}</p>
        <p><strong>Notes:</strong> ${parsed.notes || "None provided"}</p>
      `
    });

    // 3. Dispatch Client Confirmation with Sample Dossier Link
    await resend.emails.send({
      from: "Fozill Intelligence <briefs@fozill.com>",
      to: [parsed.workEmail],
      subject: "Received: Your Strategic Intelligence Brief Request",
      html: `
        <p>Dear ${parsed.fullName},</p>
        <p>We have received your briefing request regarding <strong>${parsed.targetEntityOrKeywords}</strong>.</p>
        <p>An intelligence analyst is reviewing the scope and will reach out within 4 business hours to confirm parameters.</p>
        <p>In the interim, you may review our methodology and a sample executive dossier below:</p>
        <p><a href="https://fozill.com/samples/sample-nigeria-intelligence-brief.pdf">Download Sample Nigeria Intelligence Dossier (PDF)</a></p>
      `
    });

    return { success: true, message: "Brief request logged successfully." };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to process request" };
  }
}
```

---

### 7.2 Interactive Intelligence Dossier Card Component (`components/intelligence/dossier-card.tsx`)
```tsx
import React from "react";
import { TrendingUp, Users, Compass, ShieldCheck } from "lucide-react";

interface DossierProps {
  classification?: string;
  targetEntity: string;
  healthScore: { positive: number; neutral: number; negative: number };
  keyShift: string;
  dominantNarrative: string;
  topGeographies: string[];
  recommendedAction: string;
}

export function DossierCard({
  classification = "CONFIDENTIAL // FOR ACTION",
  targetEntity,
  healthScore,
  keyShift,
  dominantNarrative,
  topGeographies,
  recommendedAction
}: DossierProps) {
  return (
    <div className="relative rounded-xl border border-[#2C3138] bg-[#181B1E]/90 p-6 shadow-2xl backdrop-blur-md">
      {/* Dossier Header */}
      <div className="flex items-center justify-between border-b border-[#2C3138] pb-3.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#D8A83E] animate-pulse" />
          <span className="font-mono text-xs font-semibold tracking-wider text-[#D8A83E] uppercase">
            {classification}
          </span>
        </div>
        <span className="font-mono text-xs text-[#F5F5F2]/50">TARGET: {targetEntity}</span>
      </div>

      {/* Health Score Bar */}
      <div className="mt-5">
        <div className="flex justify-between text-xs font-mono text-[#F5F5F2]/60 mb-2">
          <span className="font-heading uppercase tracking-wide">Brand & Perception Health</span>
          <span className="text-[#F5F5F2]">
            {healthScore.positive}% POS / {healthScore.neutral}% NEU / {healthScore.negative}% NEG
          </span>
        </div>
        <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-[#202428] border border-[#2C3138]">
          <div style={{ width: `${healthScore.positive}%` }} className="bg-[#10B981]" />
          <div style={{ width: `${healthScore.neutral}%` }} className="bg-[#8E95A2]" />
          <div style={{ width: `${healthScore.negative}%` }} className="bg-[#EF4444]" />
        </div>
      </div>

      {/* Critical Findings Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg bg-[#202428]/80 p-4 border border-[#2C3138]">
          <div className="flex items-center gap-2 text-xs font-heading font-semibold text-[#D8A83E] mb-1.5 uppercase tracking-wide">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Velocity & Shift</span>
          </div>
          <p className="font-body text-sm text-[#F5F5F2]/90 leading-relaxed">{keyShift}</p>
        </div>

        <div className="rounded-lg bg-[#202428]/80 p-4 border border-[#2C3138]">
          <div className="flex items-center gap-2 text-xs font-heading font-semibold text-[#D8A83E] mb-1.5 uppercase tracking-wide">
            <Users className="h-3.5 w-3.5" />
            <span>Dominant Narrative</span>
          </div>
          <p className="font-body text-sm text-[#F5F5F2]/90 leading-relaxed">{dominantNarrative}</p>
        </div>
      </div>

      {/* Geographies & Strategic Prescription */}
      <div className="mt-4 rounded-lg bg-[#202428]/80 p-4 border border-[#2C3138]">
        <div className="flex items-center justify-between text-xs font-mono text-[#F5F5F2]/60 mb-2.5">
          <span className="flex items-center gap-1.5 font-heading text-[#D8A83E] font-medium">
            <Compass className="h-3.5 w-3.5" /> Geographies:
          </span>
          <span className="text-[#F5F5F2]/80">{topGeographies.join(" • ")}</span>
        </div>
        <div className="mt-3 border-t border-[#2C3138] pt-3">
          <span className="text-xs font-heading font-bold text-[#D8A83E] uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5" /> Prescribed Strategic Action:
          </span>
          <p className="font-body text-sm text-[#F5F5F2] mt-1.5 leading-relaxed">{recommendedAction}</p>
        </div>
      </div>
    </div>
  );
}
```

---

## 8. Launch Strategy & Commercial Roadmap

### Phase 1: MVP Landing Page & Lead Capture (Week 1–2)
* Deploy Next.js website to Vercel (Hobby Free Tier).
* Set up Resend + Supabase free tiers for instant alert routing and lead storage.
* Apply the visual design system (`#111315` Dark, `#F5F5F2` Light, `#D8A83E` Gold, `Manrope` Headings, `Source Serif 4` Body).
* Publish 3 interactive sample dossiers (FMCG pricing backlash, Political narrative tracking in Northern vs Southern corridors, Fintech customer retention).
* Create downloadable Sample Executive Intelligence PDF as the main lead magnet.

### Phase 2: Beachhead Outreach & The First 5 Retainers (Week 3–6)
* Founder outreach targeting CMOs, Corporate Affairs heads, and political consultants using the website as the central conversion tool.
* Offer a **"7-Day Brand Intelligence Baseline Report"** at an introductory rate (₦350k–₦500k) to convert leads into monthly retainers (₦750k/mo).
* Manually generate executive reports using open-source tools, Python ingestion scripts, and LLM-assisted analysis.

### Phase 3: Public Index Launch & Scaling (Week 7+)
* Launch the bi-weekly *Nigeria Consumer Pressure Index* on `/indices` for ongoing executive newsletter signups.
* Build out the interactive client demo portal (`/portal/demo`) to lay the groundwork for Layer 3 (Enterprise SaaS platform).

---

## 9. Summary of Free Tier Stack & Cost Projection

| Component | Service | Monthly Cost | Free Tier Capacity |
| :--- | :--- | :--- | :--- |
| **Web Hosting & Edge CDN** | Vercel (Hobby) | $0.00 | 100 GB Bandwidth, Unlimited Deployments |
| **Database & Lead CRM** | Supabase | $0.00 | 500 MB Postgres, 50,000 MAUs |
| **Transactional & Alert Email**| Resend | $0.00 | 3,000 emails / month |
| **Dynamic OpenGraph Images** | `@vercel/og` | $0.00 | Included in Vercel Serverless |
| **Intelligence Content (CMS)** | Local MDX files | $0.00 | Zero hosting overhead |
| **Analytics** | Vercel Analytics / PostHog | $0.00 | Generous free tier |
| **Total Monthly Infrastructure Cost** | | **$0.00** | Supports initial $10k–$50k ARR |
