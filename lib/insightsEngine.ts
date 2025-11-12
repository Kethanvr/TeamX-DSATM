import { type InsightsRequestPayload, type InsightsResponse } from "./types";

const ACTION_TEMPLATES: Record<string, string> = {
  Transport:
    "Introduce route optimization and driver coaching to trim fuel consumption by 10–15% this quarter.",
  Electricity:
    "Negotiate renewable energy contracts or retrofit LED lighting to cut facility electricity demand.",
  Travel:
    "Shift short-haul trips to virtual meetings and rail options to eliminate discretionary travel miles.",
  Manufacturing:
    "Tune line schedules and maintenance windows to shrink idle loads and material rework waste.",
  "Waste Management":
    "Expand recycling and install compactors to reduce landfill tonnage and methane exposure.",
  "Research & Development":
    "Consolidate lab equipment runtimes and share instrumentation to remove redundant energy demand.",
  "Long Haul Fleet":
    "Pilot low-rolling-resistance tires and telematics coaching across the long-haul fleet.",
  "Air Freight":
    "Bundle lighter shipments and negotiate sustainable aviation fuel credits with carriers.",
  "Last Mile Vans":
    "Stage micro-warehouses to shorten routes and trial electric vans on dense urban loops.",
  Warehousing:
    "Tune HVAC zones and deploy occupancy sensors to cap warehouse energy waste.",
  "Cold Storage":
    "Improve door seals and defrost schedules to protect cold chain efficiency.",
  "Solar Arrays":
    "Schedule panel cleaning and tracker calibration to keep generation at peak productivity.",
  "Battery Storage":
    "Optimize charge windows and depth-of-discharge targets to limit conversion losses.",
  "Backup Diesel":
    "Replace backup runtime drills with load-bank testing and phase in hybrid generators.",
  "Maintenance Travel":
    "Group field visits geographically and deploy remote diagnostics to reduce truck rolls.",
  "Data Center":
    "Raise supply air temperatures and expand free cooling windows to lower PUE.",
};

function formatKg(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)} t`;
  }
  return `${value.toFixed(0)} kg`;
}

function buildSummary(topDepartments: [string, number][], total: number) {
  if (topDepartments.length === 0 || total === 0) {
    return "Emissions are evenly distributed across departments with no dominant source.";
  }

  const [lead, runnerUp] = topDepartments;
  const leadShare = Math.round((lead[1] / total) * 100);

  if (!runnerUp) {
    return `${lead[0]} drives ${leadShare}% of total emissions (${formatKg(
      lead[1],
    )}), making it the best place to start efficiency work.`;
  }

  const runnerShare = Math.round((runnerUp[1] / total) * 100);
  return `${lead[0]} leads with ${formatKg(lead[1])} (${leadShare}% of total), followed by ${runnerUp[0]} at ${formatKg(
    runnerUp[1],
  )} (${runnerShare}%). Tackling these two areas unlocks the quickest wins.`;
}

function buildActions(topDepartments: [string, number][]) {
  if (topDepartments.length === 0) {
    return [
      "Establish a full emissions inventory to identify hotspots and set baselines.",
      "Pick one department to pilot reduction tactics and measure quick wins.",
      "Implement a recurring review cadence to track emissions and share progress.",
    ];
  }

  return topDepartments.slice(0, 3).map(([department]) => {
    return (
      ACTION_TEMPLATES[department] ??
      `Launch a cross-functional task force to uncover efficiency opportunities within ${department}.`
    );
  });
}

function buildForecastSummary(monthlySeries: InsightsRequestPayload["monthlySeries"]) {
  if (monthlySeries.length < 2) {
    return "Apply the recommended actions now to maintain a flat trajectory and create headroom for future growth.";
  }

  const first = monthlySeries[0]?.value ?? 0;
  const last = monthlySeries[monthlySeries.length - 1]?.value ?? 0;
  const trend = first === 0 ? 0 : (last - first) / first;
  const projectedReduction = Math.max(0.08, Math.min(0.22, Math.abs(trend) + 0.12));
  const direction = trend >= 0 ? "rise" : "decline";

  return `Without intervention emissions would continue to ${direction} ~${Math.abs(trend * 100).toFixed(
    1,
  )}%. If we execute the actions above, we can bend the curve by roughly ${(projectedReduction * 100).toFixed(
    0,
  )}% over the next quarter.`;
}

export async function generateInsights(
  payload: InsightsRequestPayload,
): Promise<InsightsResponse> {
  const sortedDepartments = Object.entries(payload.aggregated).sort((a, b) => b[1] - a[1]);
  const totalEmission = sortedDepartments.reduce((sum, [, value]) => sum + value, 0);

  return {
    insightText: buildSummary(sortedDepartments, totalEmission),
    actions: buildActions(sortedDepartments),
    forecastSummary: buildForecastSummary(payload.monthlySeries),
  };
}

