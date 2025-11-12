"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

import type { MonthlyEmissionPoint } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatMonthLabel } from "@/lib/utils";

const COLORS = ["#0ea5e9", "#4ade80", "#f97316", "#6366f1", "#facc15", "#ef4444"];

type EmissionChartProps = {
  totalsByDepartment: Record<string, number>;
  departmentPercentages: Record<string, number>;
  monthlySeries: MonthlyEmissionPoint[];
};

export function EmissionChart({
  totalsByDepartment,
  departmentPercentages,
  monthlySeries,
}: EmissionChartProps) {
  const hasData = Object.keys(totalsByDepartment).length > 0;

  const barData = Object.entries(totalsByDepartment).map(([name, value]) => ({
    name,
    Emissions: Number(value.toFixed(2)),
  }));

  const pieData = Object.entries(departmentPercentages).map(([name, value]) => ({
    name,
    value: Number(value.toFixed(1)),
  }));

  const lineData = monthlySeries.map((point) => ({
    name: formatMonthLabel(point.month),
    Emissions: Number(point.value.toFixed(2)),
  }));

  return (
    <Card className="h-full">
      <CardHeader>
        <Badge aria-label="Emission visuals">Emission Breakdown</Badge>
        <CardTitle className="text-2xl font-semibold text-slate-900">
          Carbon footprint overview
        </CardTitle>
        <CardDescription>
          Explore total CO₂e emissions by department and monthly trends for the selected dataset.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {!hasData ? (
          <p className="text-sm text-slate-500">
            No emission data available yet. Load a dataset to see department and monthly charts.
          </p>
        ) : (
          <>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip formatter={(value: number) => `${value.toLocaleString()} kg CO₂e`} />
                    <Legend />
                    <Bar dataKey="Emissions" radius={[8, 8, 0, 0]} fill="#4ade80" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip formatter={(value: number) => `${value}% of total`} />
                    <Legend />
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={90}
                      paddingAngle={4}
                      label={({ name, value }) => `${name} (${value}%)`}
                    >
                      {pieData.map((_, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                          aria-label={`Pie slice for ${pieData[index]?.name}`}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip formatter={(value: number) => `${value.toLocaleString()} kg CO₂e`} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Emissions"
                    stroke="#0ea5e9"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

