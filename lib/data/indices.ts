import { IndexReport } from "../types";

export const PUBLIC_INDICES: IndexReport[] = [
  {
    id: "nigeria-consumer-pressure-index",
    slug: "consumer-pressure-index",
    title: "Nigeria Consumer Pressure Index (NCPI)",
    category: "Consumer",
    date: "August 2026",
    currentValue: 74.2,
    changeValue: "+3.8 pts",
    changeDirection: "up",
    summary: "A synthetic benchmark tracking Nigerian household price sensitivity, pack-size complaints, and brand substitution intent across 36 states.",
    keyTakeaways: [
      "Northern markets (North-West & North-East) registered highest price sensitivity (81.4 pts), with sachet downsizing sparking the largest complaint volume.",
      "Lagos and South-West consumers are increasingly trading down from premium beverage brands to value-tier local alternatives.",
      "Discussions on bulk household purchasing cooperatives rose +52% on community forums and WhatsApp commerce groups."
    ],
    dataPoints: [
      { label: "Mar '26", value: 68.4 },
      { label: "Apr '26", value: 69.1 },
      { label: "May '26", value: 71.0 },
      { label: "Jun '26", value: 70.8 },
      { label: "Jul '26", value: 72.4 },
      { label: "Aug '26", value: 74.2 },
    ],
  },
  {
    id: "nigeria-fintech-reliability-score",
    slug: "fintech-reliability-index",
    title: "Nigeria Digital Banking Reliability Index",
    category: "Sector",
    date: "August 2026",
    currentValue: 68.6,
    changeValue: "-2.4 pts",
    changeDirection: "down",
    summary: "Tracks sentiment around transaction failure rates, POS uptime, dispute resolution velocity, and user trust across top Nigerian banks and neobanks.",
    keyTakeaways: [
      "Weekend interbank settlement friction drove 64% of viral customer dissatisfaction threads.",
      "POS merchant dispute turnaround remains the single largest driver of terminal migration between competing acquirers.",
      "Voice-guided vernacular customer support emerged as a high-satisfaction differentiator for agent networks in Kano and Onitsha."
    ],
    dataPoints: [
      { label: "Mar '26", value: 72.1 },
      { label: "Apr '26", value: 71.5 },
      { label: "May '26", value: 73.0 },
      { label: "Jun '26", value: 70.2 },
      { label: "Jul '26", value: 71.0 },
      { label: "Aug '26", value: 68.6 },
    ],
  },
  {
    id: "regional-policy-sentiment-tracker",
    slug: "regional-policy-tracker",
    title: "Geopolitical Policy Reception Index",
    category: "Political",
    date: "August 2026",
    currentValue: 53.4,
    changeValue: "+1.2 pts",
    changeDirection: "up",
    summary: "Measures public reception, organic narrative clustering, and regional buy-in for major fiscal and infrastructure announcements across Nigeria's 6 geopolitical zones.",
    keyTakeaways: [
      "Institutional policy announcements receive 3x more critical scrutiny on local radio phone-in broadcasts than on English digital press.",
      "South-West and North-Central show strongest support for energy modernization initiatives.",
      "Clarity of direct grassroots exemptions is the single highest predictor of positive sub-national reception."
    ],
    dataPoints: [
      { label: "Mar '26", value: 49.0 },
      { label: "Apr '26", value: 50.8 },
      { label: "May '26", value: 52.1 },
      { label: "Jun '26", value: 51.5 },
      { label: "Jul '26", value: 52.2 },
      { label: "Aug '26", value: 53.4 },
    ],
  },
];
