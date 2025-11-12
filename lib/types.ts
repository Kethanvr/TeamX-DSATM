export type EmissionRecord = {
  department: string;
  month: string;
  quantity: number;
  unit: string;
  emission_factor: number;
};

export type EmissionDataset = {
  company: string;
  period: string;
  departments: EmissionRecord[];
};

export type MonthlyEmissionPoint = {
  month: string;
  value: number;
};

export type EmissionMetrics = {
  totalsByDepartment: Record<string, number>;
  monthlySeries: MonthlyEmissionPoint[];
  totalEmission: number;
  ecoScore: number;
  departmentPercentages: Record<string, number>;
};

export type InsightsRequestPayload = {
  company: string;
  period: string;
  aggregated: Record<string, number>;
  monthlySeries: MonthlyEmissionPoint[];
};

export type InsightsResponse = {
  insightText: string;
  actions: string[];
  forecastSummary: string;
};

export type LeaderboardEntry = {
  rank: number;
  company: string;
  industry: string;
  ecoScore: number;
  quarterlyReduction: number;
  badge: "Trailblazer" | "Accelerator" | "Contender" | "Rising Star";
  highlights: string;
};
