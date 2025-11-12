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

export type GeminiRequestPayload = {
  company: string;
  period: string;
  aggregated: Record<string, number>;
  monthlySeries: MonthlyEmissionPoint[];
};

export type GeminiResponse = {
  insightText: string;
  actions: string[];
  forecastSummary: string;
};

