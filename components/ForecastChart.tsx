"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { createForecastSeries } from "@/lib/calculateEmissions";
import type { MonthlyEmissionPoint } from "@/lib/types";
import { formatMonthLabel } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ForecastChartProps = {
  monthlySeries: MonthlyEmissionPoint[];
};

export function ForecastChart({ monthlySeries }: ForecastChartProps) {
  const forecast = createForecastSeries(monthlySeries);
  const reductionPercent = forecast[0]?.reductionPercent ?? 15;

  const lineData = forecast.map((point) => ({
    month: formatMonthLabel(point.month),
    Current: point.current,
    Optimized: point.optimized,
    reductionPercent: point.reductionPercent,
  }));

  return (
    <Card className="h-full">
      <CardHeader>
        <Badge aria-label="Forecast badge" variant="secondary">
          Forecast
        </Badge>
        <CardTitle className="text-2xl font-semibold text-slate-900">
          Emission forecast scenarios
        </CardTitle>
        <CardDescription>
          Compare projected emissions if you stay on the current trajectory versus applying AI recommendations.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
              <TrendingUp className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Current trajectory
              </p>
              <p className="text-sm text-slate-700">
                Continues modest growth driven by transport fuel and electricity demand.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <TrendingDown className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Optimized path
              </p>
              <p className="text-sm text-slate-700">
                Implements AI actions to target an estimated {reductionPercent}% reduction.
              </p>
            </div>
          </div>
        </div>

        {lineData.length === 0 ? (
          <p className="text-sm text-slate-500">
            Forecast requires at least one month of data. Load a dataset to preview the scenario.
          </p>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip
                  formatter={(value: number) => `${value.toLocaleString()} kg CO₂e`}
                  labelFormatter={(label) => `Forecast for ${label}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Current"
                  stroke="#f97316"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="Optimized"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

