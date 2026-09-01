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
  regionalSentiment: {
    zone: string;
    score: number; // 0 - 100 positive index
    status: "positive" | "neutral" | "negative";
    narrative: string;
  }[];
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
