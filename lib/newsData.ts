export type NewsInsight = {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  category: "current" | "past";
  action: string;
};

export const newsInsights: NewsInsight[] = [
  {
    id: "n1",
    title: "European suppliers push recycled aluminum surge",
    summary:
      "Makers of recycled billet are reporting a 24% capacity increase, cutting embodied carbon by up to 70% compared with virgin aluminum.",
    source: "Sustainable Manufacturing Daily",
    publishedAt: "Mar 12, 2026",
    category: "current",
    action: "Review aluminum sourcing strategy and request new EPDs from top suppliers.",
  },
  {
    id: "n2",
    title: "Cities fast-track electric refuse trucks",
    summary:
      "Eight North American cities have announced joint procurement for electric refuse trucks, unlocking shared maintenance hubs and discounted charging.",
    source: "Climate Infrastructure Wire",
    publishedAt: "Mar 11, 2026",
    category: "current",
    action: "Coordinate with municipal customers to align fleet pilot timelines.",
  },
  {
    id: "n3",
    title: "Scope 3 disclosure mandates advance in APAC",
    summary:
      "Regulators in Singapore and South Korea published draft rules requiring companies to report high-priority Scope 3 categories starting FY2027.",
    source: "ESG Policy Brief",
    publishedAt: "Mar 9, 2026",
    category: "current",
    action: "Update emissions roadmap and assess supplier readiness for Scope 3 reporting.",
  },
  {
    id: "n4",
    title: "Heat pump retrofits deliver 18% energy savings",
    summary:
      "Case studies from the 2025 Efficient Building Challenge show large campuses reaching sub 1.8 kWh/ft² after pairing heat pumps with digital twins.",
    source: "Energy Innovation Digest",
    publishedAt: "Feb 2, 2025",
    category: "past",
    action: "Reuse digital twin lessons to refine next season’s forecasting scenarios.",
  },
  {
    id: "n5",
    title: "Circular packaging consortium hits one billion units",
    summary:
      "Members of the Loop Consortium reported one billion reusable packaging uses, preventing 90,000 tons of plastic waste from landfills.",
    source: "Circular Economy Journal",
    publishedAt: "Nov 15, 2024",
    category: "past",
    action: "Apply consortium metrics to validate your packaging sprint success criteria.",
  },
  {
    id: "n6",
    title: "Renewable PPA prices stabilize after 2023 spike",
    summary:
      "Long-term power purchase agreement pricing has fallen 12% year-over-year thanks to new storage capacity, easing budget pressure for corporates.",
    source: "Clean Energy Ledger",
    publishedAt: "Sep 7, 2024",
    category: "past",
    action: "Revisit renewable procurement pipeline and lock favorable terms by Q3.",
  },
];

