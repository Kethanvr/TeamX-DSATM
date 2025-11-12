import {
  type EmissionDataset,
  type EmissionMetrics,
  type EmissionRecord,
  type MonthlyEmissionPoint,
} from "./types";

const EXPECTED_MAX_EMISSION = 20000;

type Accumulators = {
  totalsByDepartment: Record<string, number>;
  totalsByMonth: Record<string, number>;
  totalEmission: number;
};

function computeEmission(record: EmissionRecord) {
  const emission = record.quantity * record.emission_factor;
  return Number.isFinite(emission) ? emission : 0;
}

function sortMonthlySeries(
  series: Record<string, number>
): MonthlyEmissionPoint[] {
  return Object.entries(series)
    .sort(([monthA], [monthB]) => monthA.localeCompare(monthB))
    .map(([month, value]) => ({
      month,
      value: Number(value.toFixed(2)),
    }));
}

function deriveEcoScore(totalEmission: number) {
  const normalized = Math.min(totalEmission / EXPECTED_MAX_EMISSION, 1);
  const score = Math.max(0, 100 - normalized * 100);
  return Number(score.toFixed(1));
}

function derivePercentages(
  totalsByDepartment: Record<string, number>,
  totalEmission: number
) {
  if (totalEmission === 0) {
    return Object.fromEntries(
      Object.keys(totalsByDepartment).map((department) => [department, 0])
    );
  }

  return Object.fromEntries(
    Object.entries(totalsByDepartment).map(([department, value]) => [
      department,
      Number(((value / totalEmission) * 100).toFixed(1)),
    ])
  );
}

export function calculateEmissions(dataset: EmissionDataset): EmissionMetrics {
  const { totalsByDepartment, totalsByMonth, totalEmission } =
    dataset.departments.reduce<Accumulators>(
      (acc, record) => {
        const emission = computeEmission(record);

        acc.totalEmission += emission;
        acc.totalsByDepartment[record.department] =
          (acc.totalsByDepartment[record.department] ?? 0) + emission;
        acc.totalsByMonth[record.month] =
          (acc.totalsByMonth[record.month] ?? 0) + emission;

        return acc;
      },
      {
        totalsByDepartment: {},
        totalsByMonth: {},
        totalEmission: 0,
      }
    );

  const roundedTotals = Object.fromEntries(
    Object.entries(totalsByDepartment).map(([department, value]) => [
      department,
      Number(value.toFixed(2)),
    ])
  );

  const roundedTotalEmission = Number(totalEmission.toFixed(2));
  const monthlySeries = sortMonthlySeries(totalsByMonth);
  const ecoScore = deriveEcoScore(roundedTotalEmission);
  const departmentPercentages = derivePercentages(
    roundedTotals,
    roundedTotalEmission
  );

  return {
    totalsByDepartment: roundedTotals,
    monthlySeries,
    totalEmission: roundedTotalEmission,
    ecoScore,
    departmentPercentages,
  };
}

export function createForecastSeries(
  monthlySeries: MonthlyEmissionPoint[],
  reductionRatio = 0.15,
  growthRatio = 0.04
) {
  if (monthlySeries.length === 0) {
    return [];
  }

  const lastPoint = monthlySeries[monthlySeries.length - 1];
  const baseValue = lastPoint.value;
  const startDate = new Date(`${lastPoint.month}-01T00:00:00`);

  return Array.from({ length: 3 }).map((_, index) => {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + index + 1);

    const label = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
    const currentTrend =
      index === 0
        ? baseValue * (1 + growthRatio)
        : baseValue * (1 + growthRatio) * Math.pow(1 + growthRatio / 2, index);

    const optimizedTrend = currentTrend * (1 - reductionRatio);

    return {
      month: label,
      current: Number(currentTrend.toFixed(2)),
      optimized: Number(optimizedTrend.toFixed(2)),
      reductionPercent: Math.round(reductionRatio * 100),
    };
  });
}
