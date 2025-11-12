"use client";

import Link from "next/link";
import { AlertCircle, Factory } from "lucide-react";

import { useEmissionData } from "@/components/providers/EmissionDataProvider";
import { EmissionChart } from "@/components/EmissionChart";
import { AIInsightsCard } from "@/components/AIInsightsCard";
import { ForecastChart } from "@/components/ForecastChart";
import { EcoScoreCard } from "@/components/EcoScoreCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const { dataset, metrics } = useEmissionData();

  if (!dataset || !metrics) {
    return (
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <AlertCircle className="h-8 w-8" aria-hidden="true" />
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold text-slate-900">
            Load emissions to unlock the dashboard
          </h2>
          <p className="text-slate-600">
            Use the curated demo dataset or upload your CSV to visualize emissions, forecasts, and AI recommendations.
          </p>
        </div>
        <Link
          href="/"
          className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-600"
          aria-label="Return to the home page to load data"
        >
          Use Demo Dataset
        </Link>
      </div>
    );
  }

  const departmentEntries = Object.entries(metrics.totalsByDepartment);
  const topDepartment = departmentEntries.sort((a, b) => b[1] - a[1])[0]?.[0];
  const totalDepartments = dataset.departments.reduce<Record<string, true>>(
    (acc, record) => {
      acc[record.department] = true;
      return acc;
    },
    {},
  );

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <section className="space-y-2">
        <Badge aria-label="Dataset period badge" variant="secondary">
          {dataset.period}
        </Badge>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
              {dataset.company} emissions dashboard
            </h1>
            <p className="text-slate-600">
              Monitor department CO₂e, track trendlines, and align teams around the next wave of reduction initiatives.
            </p>
          </div>
          <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
            Total emissions: {metrics.totalEmission.toLocaleString()} kg CO₂e
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardContent className="flex h-full flex-col justify-between gap-4 p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Departments
              </span>
              <Factory className="h-5 w-5 text-slate-400" aria-hidden="true" />
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {Object.keys(totalDepartments).length}
            </p>
            <p className="text-sm text-slate-500">
              {topDepartment
                ? `${topDepartment} is currently the highest emitting function.`
                : "No single department dominates the emissions profile."}
            </p>
          </CardContent>
        </Card>
        <Card className="md:col-span-1">
          <CardContent className="flex h-full flex-col justify-between gap-4 p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Totals
              </span>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {metrics.totalEmission.toLocaleString()} kg
            </p>
            <p className="text-sm text-slate-500">
              Combined emissions measured across scope 1 & 2 activity data.
            </p>
          </CardContent>
        </Card>
        <Card className="md:col-span-1">
          <CardContent className="flex h-full flex-col justify-between gap-4 p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                EcoScore
              </span>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {metrics.ecoScore.toFixed(1)} / 100
            </p>
            <p className="text-sm text-slate-500">
              Benchmark built on expected emission intensity for peers.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <EmissionChart
            totalsByDepartment={metrics.totalsByDepartment}
            departmentPercentages={metrics.departmentPercentages}
            monthlySeries={metrics.monthlySeries}
          />
        </div>
        <div className="lg:col-span-1">
          <EcoScoreCard
            ecoScore={metrics.ecoScore}
            totalEmission={metrics.totalEmission}
            topDepartment={topDepartment}
          />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3" id="ai-insights">
        <div className="lg:col-span-2">
          <ForecastChart monthlySeries={metrics.monthlySeries} />
        </div>
        <div className="lg:col-span-1">
          <AIInsightsCard
            company={dataset.company}
            period={dataset.period}
            aggregated={metrics.totalsByDepartment}
            monthlySeries={metrics.monthlySeries}
          />
        </div>
      </section>
    </div>
  );
}

