# Implementation Plan: Pillar 1 – Dynamic Signal Feed & Public Sync

> **Sprint Goal:** Transform static mock signals and indices into a live, dynamically synchronized intelligence stream connected to Supabase, proving real-time analytical velocity to prospective enterprise clients.

---

## 1. Overview & Architecture

Pillar 1 bridges the administrative publishing workflow with the public-facing platform. When an intelligence analyst publishes a signal or market pulse in `/admin`, it will automatically propagate to:
1. **The Live Signal Ticker:** Dynamic banner across the homepage.
2. **The New Public Signal Radar (`/signals`):** Searchable, filterable repository of public intelligence signals with gated premium teasers.
3. **The Indices & Pulse Showcase (`/indices`):** Dynamic market indices and mood benchmarks powered by `intelligence_pulses`.
4. **Header Navigation:** Active signal counts and live market mood indicators.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PILLAR 1 DATA FLOW                              │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                         [Supabase Database]
              ┌─────────────────────┴─────────────────────┐
              │                                           │
  public.intelligence_signals                public.intelligence_pulses
  (status = 'published')                     (status = 'published')
              │                                           │
              ▼                                           ▼
   [lib/public-signals.ts]                    [lib/public-indices.ts]
   (ISR Revalidation: 120s)                   (ISR Revalidation: 300s)
              │                                           │
      ┌───────┴──────────────┐                            │
      ▼                      ▼                            ▼
[SignalTicker]      [/signals Radar Page]        [/indices Page]
(Homepage Hero)     (Filterable Feed + Teasers)  (Mood Index + Issues)
```

---

## 2. Proposed Changes & Technical Breakdown

### Component 1: Data Access Layer (`lib/public-signals.ts` & `lib/public-indices.ts`)
Create cached, resilient data fetchers that strictly query published records adhering to the Row Level Security (RLS) policies established in Phase 1.

* **`getLiveTickerSignals()`:**
  - Queries `public.intelligence_signals` where `status = 'published'` ordered by `published_at DESC` (limit 12).
  - Next.js fetch caching / ISR with `revalidate = 120` (2 minutes).
  - **Graceful Fallback:** If the database contains zero published signals or if network connectivity fails, falls back seamlessly to the curated seed signals (`EMERGING MKT SENTIMENT`, `LAGOS METRO`, etc.) so the homepage ticker never appears empty.
* **`getPublishedSignals(filters)`:**
  - Queries published signals supporting:
    - Category filter (`all`, `business`, `political`, `economic`, `sector`, `crisis`).
    - Full-text search on `title` and `body`.
    - Pagination (10 per page).
* **`getDynamicIndices()`:**
  - Queries `intelligence_pulses` where `status = 'published'`, joining published `pulse_items`.
  - Fallback to `PUBLIC_INDICES` if no pulses are published yet.
* **`getLatestMarketMood()`:**
  - Retrieves the single latest published pulse `mood_index` (0–100) and title for the global header badge.

---

### Component 2: Dynamic Live Signal Ticker (`components/hero/signal-ticker.tsx`)
Upgrade the ticker from a static component to a server-rendered or prop-driven dynamic marquee:

* **Visual Enhancements:**
  - Displays real-time category badge (`BUSINESS`, `POLITICAL`, `ECONOMIC`, `SECTOR`, `CRISIS`).
  - Shows location (`Lagos`, `Abuja`, `Kano`, `Global`).
  - Shows direction trend arrow (Emerald Up, Crimson Down, Gold Neutral).
  - Clickable ticker items that deep-link to `/signals#<id>` for immediate engagement.
* **Pause on Hover:** Allows busy executives to read fast-moving ticker items.

---

### Component 3: Dedicated Public Signal Radar (`app/signals/page.tsx`)
Create a flagship public feed page:

* **Hero & Filter Bar:**
  - Interactive category selector tabs: `All Signals`, `Business & Brand`, `Political Identity`, `Economic & Sector`, `Crisis Warnings`.
  - Search input with debounce for real-time client-side keyword filtering.
* **Signal Dossier Cards:**
  - Signal category pill, confidence rating badge (e.g. `85% Confidence`), geographic tag, and relative timestamp (`3 hours ago`).
  - Analytical headline and concise summary body.
  - **Commercial Lead Magnet Teaser:**
    ```
    ┌──────────────────────────────────────────────────────────────────┐
    │ 🔒 STRATEGIC IMPLICATION & RESPONSE PLAYBOOK                     │
    │ Full narrative attribution, bot cluster breakdown, and sub-      │
    │ national divergence data are reserved for Retainer clients.      │
    │ [Unlock Executive Briefing →]                                   │
    └──────────────────────────────────────────────────────────────────┘
    ```
* **Telemetric Tracking:**
  - Integrates `trackSignalView(signalId)` to log engagement in `newsletter_events`.

---

### Component 4: Dynamic Indices & Mood Index (`app/indices/page.tsx`)
Connect the `/indices` route to Supabase:

* **Header Market Sentiment Widget:**
  - Displays latest national `Mood Index` (e.g., `Mood: 58/100 · Cautious / Price Sensitive`) based on published pulses.
* **Dynamic Pulse Grid:**
  - Renders published issues with interactive sentiment charts, key takeaways, and direct CTA to commission bespoke deep-dive reports.

---

### Component 5: Navigation & Header Integration (`components/navigation/navbar.tsx`)
* Add **"Live Signals"** directly into the desktop and mobile navigation links with an active signal pulse indicator (`🟢 Live`).
* Add quick access to `/signals` in the footer and homepage CTAs.

---

## 3. Step-by-Step Implementation Roadmap

| Step | Scope | Target Files |
| :--- | :--- | :--- |
| **Step 1** | Build resilient public data fetchers with RLS query filters and curated fallbacks | `lib/public-signals.ts`, `lib/public-indices.ts` |
| **Step 2** | Upgrade homepage ticker to consume dynamic signals | `components/hero/signal-ticker.tsx`, `app/page.tsx` |
| **Step 3** | Create public Signal Radar feed page with search & category filters | `app/signals/page.tsx`, `components/signals/signal-card.tsx` |
| **Step 4** | Update `/indices` to dynamically render published Pulses with fallbacks | `app/indices/page.tsx` |
| **Step 5** | Add `/signals` route to desktop and mobile navigation menus | `components/navigation/navbar.tsx`, `components/navigation/footer.tsx` |
| **Step 6** | Build verification and end-to-end testing (`next build` & route check) | Terminal verification |

---

## 4. Verification & Testing Criteria

1. **Zero Downtime Fallback:** If the database contains 0 published signals, the ticker and indices must gracefully render seed data without throwing errors or blank screens.
2. **Security & RLS Verification:** Ensure queries use the public client and return *only* `status = 'published'` signals (draft signals must remain inaccessible).
3. **Build & Type Safety:** Run `npm run build` to ensure all static generation and TypeScript types pass without warning.
4. **Responsive Performance:** Ticker animation runs at 60fps on mobile without layout shift.
