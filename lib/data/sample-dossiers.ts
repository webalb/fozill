import { DossierData } from "../types";

export const SAMPLE_DOSSIERS: Record<string, DossierData> = {
  fmcg: {
    id: "fmcg-pricing-crisis",
    classification: "EXECUTIVE BRIEF // FOR IMMEDIATE ACTION",
    date: "14 August 2026",
    sector: "FMCG / Packaged Consumer Goods",
    targetEntity: "Tier-1 Dairy & Beverage Brand (Conglomerate A)",
    executiveSummary: [
      "Consumer discussions around recent 22% shrinkflation & price adjustments surged 310% over the last 10 days.",
      "73% of complaints in Northern urban corridors (Kano, Kaduna) express substitution intent toward local unbranded alternatives.",
      "5 key consumer advocacy and comedy creators generated 42% of organic social reach discussing pack-size dissatisfaction."
    ],
    healthScore: {
      positive: 24,
      neutral: 28,
      negative: 48,
    },
    keyShift: "Customer complaints regarding pack size vs. price velocity accelerated +31% week-over-week.",
    dominantNarrative: "“The price went up but the sachet volume was cut in half — no longer value for money.”",
    topGeographies: ["Kano Metro", "Kaduna Central", "Lagos (Mainland)", "Onitsha Market Hub"],
    driverAccountsSummary: "5 high-resonance accounts drove 42% of the viral Pidgin & Hausa reaction threads.",
    recommendedAction: "Pause planned Q3 price revision in Northern trade channels; launch 'Family Value Pack' messaging highlighting nutrient density before competitor B captures value-tier shelf space.",
    regionalSentiment: [
      { zone: "North-West", score: 28, status: "negative", narrative: "High sensitivity to sachet volume cuts; migration to local dairy blends." },
      { zone: "North-East", score: 32, status: "negative", narrative: "Sachet affordability discussions dominate FMCG grocery channels." },
      { zone: "North-Central", score: 45, status: "neutral", narrative: "Mixed reaction; corporate workers absorb cost, students voice outrage." },
      { zone: "South-West", score: 52, status: "neutral", narrative: "Discussion focused on breakfast alternatives and rising household food budgets." },
      { zone: "South-East", score: 39, status: "negative", narrative: "Wholesalers reporting pushback on minimum order thresholds." },
      { zone: "South-South", score: 48, status: "neutral", narrative: "Retail inventory moving slower in Port Harcourt and Warri." },
    ],
  },
  political: {
    id: "political-narrative-tracking",
    classification: "STRATEGIC MEMO // CONFIDENTIAL",
    date: "28 August 2026",
    sector: "Governance & Institutional Affairs",
    targetEntity: "Federal Infrastructure & Tax Harmonization Policy",
    executiveSummary: [
      "Public discourse across 6 geopolitical zones shows marked divergence between Hausa-language media (economic hardship frame) vs. English-language commentary (policy merit frame).",
      "Smear and inorganic coordinated astroturfing detected across 14 bot clusters originating on microblogging platforms.",
      "Grassroots sentiment in South-West urban zones remains cautiously optimistic, provided sub-national transport subsidies take effect."
    ],
    healthScore: {
      positive: 41,
      neutral: 23,
      negative: 36,
    },
    keyShift: "Hausa-language broadcast and radio call-in commentary shifted -18% sentiment following municipal levy announcement.",
    dominantNarrative: "“Reforms are sound in principle but implementation timeline creates unmanageable working-class pressure.”",
    topGeographies: ["Abuja FCT", "Kano", "Lagos", "Port Harcourt", "Ibadan"],
    driverAccountsSummary: "12 coordinated narrative nodes identified pushing misleading infographics regarding tolling tariffs.",
    recommendedAction: "Deploy targeted vernacular town-hall briefings across North-West and South-East corridors; proactively clarify exemption thresholds for micro-enterprises before union mobilization.",
    regionalSentiment: [
      { zone: "North-West", score: 31, status: "negative", narrative: "Concerns over inter-state agricultural transit levies." },
      { zone: "North-East", score: 35, status: "negative", narrative: "Demand for explicit security and grain transport exemptions." },
      { zone: "North-Central", score: 54, status: "positive", narrative: "Support for infrastructure modernisation in the capital corridor." },
      { zone: "South-West", score: 58, status: "positive", narrative: "Favorable outlook on port efficiency and road concessioning." },
      { zone: "South-East", score: 38, status: "negative", narrative: "Skepticism around enforcement integrity at state border checkpoints." },
      { zone: "South-South", score: 46, status: "neutral", narrative: "Energy and littoral transport connectivity questions lead debate." },
    ],
  },
  fintech: {
    id: "fintech-migration-radar",
    classification: "COMPETITIVE INTEL // SUBSCRIBER EXCLUSIVE",
    date: "01 September 2026",
    sector: "Banking & Financial Technology",
    targetEntity: "Tier-1 Neobank & Digital Lending Ecosystem",
    executiveSummary: [
      "Recurring weekend transaction failure alerts prompted a 44% spike in organic user complaints on social forums.",
      "Competitor C captured 28% of dissatisfied merchant churn by highlighting 99.8% POS terminal uptime in Lagos and Ibadan.",
      "Customer trust in automated dispute resolution dropped 19 points following unresolved holiday chargebacks."
    ],
    healthScore: {
      positive: 58,
      neutral: 17,
      negative: 25,
    },
    keyShift: "Unprompted merchant discussions about terminal switching increased +44% following Sunday gateway outage.",
    dominantNarrative: "“Support ticket turnaround is slow; competitor settlement is instant for POS terminals.”",
    topGeographies: ["Lagos (Ikeja, Lekki)", "Ibadan Central", "Abuja Business District", "Benin City"],
    driverAccountsSummary: "Top 8 SME community organizers and retail shop owners drove the migration discussion.",
    recommendedAction: "Institute auto-refund triggers for interbank transfers stalled >30 mins; run transparent network health status page to curb viral outrage cycles.",
    regionalSentiment: [
      { zone: "South-West", score: 62, status: "positive", narrative: "App UI highly rated, but POS downtime during peak hours causes merchant friction." },
      { zone: "North-Central", score: 60, status: "positive", narrative: "Strong adoption among young civil servants and tech agency workers." },
      { zone: "North-West", score: 51, status: "neutral", narrative: "Agent banking network growing; demand for voice-guided Hausa prompts." },
      { zone: "South-East", score: 56, status: "neutral", narrative: "High transaction volume, high intolerance for reversal delays." },
      { zone: "South-South", score: 59, status: "positive", narrative: "Stable peer-to-peer usage in Port Harcourt and Asaba." },
      { zone: "North-East", score: 48, status: "neutral", narrative: "Cash-to-digital migration steady despite sporadic network coverage." },
    ],
  },
};
