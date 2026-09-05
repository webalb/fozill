export interface DossierData {
  id: string;
  classification: string;
  date: string;
  sector: string;
  targetEntity: string;
  executiveSummary: string[];
  healthScore: {
    positive: number;
    neutral: number;
    negative: number;
  };
  keyShift: string;
  dominantNarrative: string;
  topGeographies: string[];
  driverAccountsSummary: string;
  recommendedAction: string;
  trend: {
    label: string;
    value: number;
  }[];
  regionalSentiment: {
    zone: string;
    score: number; // 0 - 100 positive index
    status: "positive" | "neutral" | "negative";
    narrative: string;
  }[];
  forecast: {
    label: string;
    value: number;
  }[];
  confidence: number; // 0 - 100
  outlook: string;
}

export interface GeopoliticalZoneData {
  id: string;
  name: string;
  shortCode: string;
  states: string[];
  dominantLanguageContext: string[];
  activeIndices: {
    consumerSentiment: number;
    priceSensitivity: number;
    politicalStability: number;
  };
  currentPrimaryNarrative: string;
  keyIssues: string[];
}

export interface PricingTier {
  id: string;
  name: string;
  layer: string;
  badge?: string;
  price: string;
  period: string;
  description: string;
  idealFor: string;
  features: string[];
  ctaText: string;
  highlighted?: boolean;
}

export interface IndexReport {
  id: string;
  slug: string;
  title: string;
  category: "Economic" | "Consumer" | "Political" | "Sector";
  date: string;
  currentValue: number;
  changeValue: string;
  changeDirection: "up" | "down" | "neutral";
  summary: string;
  keyTakeaways: string[];
  dataPoints: {
    label: string;
    value: number;
  }[];
}

export interface IntelligenceSignal {
  id: string;
  title: string;
  body: string;
  category: "business" | "political" | "economic" | "sector" | "crisis";
  location?: string | null;
  direction?: "up" | "down" | "neutral" | null;
  confidence?: number | null;
  source?: string | null;
  status: "draft" | "published" | "archived";
  premium: boolean;
  published_at?: string | null;
  created_at: string;
  updated_at?: string | null;
}

export interface PulseItem {
  id: string;
  pulse_id: string;
  title: string;
  body: string;
  signal?: string | null;
  implication?: string | null;
  recommendation?: string | null;
  premium: boolean;
  display_order?: number;
  created_at: string;
}

export interface IntelligencePulse {
  id: string;
  slug: string;
  title: string;
  summary: string;
  mood_index?: number | null;
  status: "draft" | "published" | "archived";
  published_at?: string | null;
  created_at: string;
  updated_at?: string | null;
  pulse_items?: PulseItem[];
}

