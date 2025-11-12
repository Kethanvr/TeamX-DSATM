"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Download } from "lucide-react";

import { useEmissionData } from "@/components/providers/EmissionDataProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TableMode = "records" | "grouped";

export default function AdminPage() {
  const { dataset } = useEmissionData();

  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [tableMode, setTableMode] = useState<TableMode>("records");

  const enrichedRecords = useMemo(() => {
    if (!dataset) return [];
    return dataset.departments.map((record) => ({
      ...record,
      emission: record.quantity * record.emission_factor,
    }));
  }, [dataset]);

  const uniqueDepartments = useMemo(() => {
    return Array.from(new Set(enrichedRecords.map((record) => record.department))).sort();
  }, [enrichedRecords]);

  const filteredRecords = useMemo(() => {
    if (selectedDepartment === "all") {
      return enrichedRecords;
    }
    return enrichedRecords.filter((record) => record.department === selectedDepartment);
  }, [enrichedRecords, selectedDepartment]);

  const groupedTotals = useMemo(() => {
    const totals = filteredRecords.reduce<Record<string, number>>((acc, record) => {
      acc[record.department] = (acc[record.department] ?? 0) + record.emission;
      return acc;
    }, {});
    return Object.entries(totals)
      .sort((a, b) => b[1] - a[1])
      .map(([department, emission]) => ({ department, emission }));
  }, [filteredRecords]);

  const totalEmission = useMemo(
    () => filteredRecords.reduce((sum, record) => sum + record.emission, 0),
    [filteredRecords],
  );

  const monthRange = useMemo(() => {
    const months = Array.from(new Set(filteredRecords.map((record) => record.month))).sort();
    if (months.length === 0) return "n/a";
    return months.length === 1 ? months[0] : `${months[0]} → ${months[months.length - 1]}`;
  }, [filteredRecords]);

  const downloadCurrentView = () => {
    const headers =
      tableMode === "records"
        ? ["department", "month", "quantity", "unit", "emission_factor", "emission"]
        : ["department", "emission"];

    const rows =
      tableMode === "records"
        ? filteredRecords.map((record) => [
            record.department,
            record.month,
            record.quantity,
            record.unit,
            record.emission_factor,
            record.emission.toFixed(2),
          ])
        : groupedTotals.map((group) => [group.department, group.emission.toFixed(2)]);

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = tableMode === "records" ? "activity_records.csv" : "grouped_totals.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  if (!dataset) {
    return (
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 py-16 text-center">
        <h2 className="text-3xl font-semibold text-slate-900">
          Load data before visiting the admin view
        </h2>
        <p className="max-w-xl text-slate-600">
          This quick admin table surfaces raw activity records for audit and reconciliation. Return
          to the home page to load the demo or upload CSV first.
        </p>
        <Link
          href="/"
          className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-600"
        >
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Admin overview</h1>
        <p className="text-slate-600">
          Review, filter, and export the raw activity records that power your dashboards.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex flex-col gap-2 p-5">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Total emissions (filtered)
            </span>
            <span className="text-2xl font-bold text-slate-900">
              {totalEmission.toLocaleString(undefined, { maximumFractionDigits: 0 })} kg
            </span>
            <span className="text-xs text-slate-500">Across {filteredRecords.length} records</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-2 p-5">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Departments in view
            </span>
            <span className="text-2xl font-bold text-slate-900">
              {selectedDepartment === "all" ? uniqueDepartments.length : 1}
            </span>
            <span className="text-xs text-slate-500">
              {selectedDepartment === "all" ? "All sources" : selectedDepartment}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-2 p-5">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Month coverage
            </span>
            <span className="text-2xl font-bold text-slate-900">{monthRange}</span>
            <span className="text-xs text-slate-500">Data window represented in this view</span>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">
              {dataset.departments.length} activity records
            </CardTitle>
            <p className="text-sm text-slate-500">
              Filter by department or switch to grouped totals to validate aggregates.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="flex items-center gap-2">
              <label htmlFor="department-filter" className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Department
              </label>
              <select
                id="department-filter"
                value={selectedDepartment}
                onChange={(event) => setSelectedDepartment(event.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <option value="all">All</option>
                {uniqueDepartments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={tableMode === "records" ? "default" : "secondary"}
                onClick={() => setTableMode("records")}
                aria-label="Show individual records"
              >
                Records
              </Button>
              <Button
                variant={tableMode === "grouped" ? "default" : "secondary"}
                onClick={() => setTableMode("grouped")}
                aria-label="Show grouped totals"
              >
                Grouped totals
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={downloadCurrentView}
              aria-label="Download current view as CSV"
              className="gap-2"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {tableMode === "records" ? (
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Department
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Month
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Unit
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Emission factor
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Emission (kg)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRecords.map((record, index) => (
                  <tr
                    key={`${record.department}-${record.month}-${index}`}
                    className="odd:bg-white even:bg-slate-50/80"
                  >
                    <td className="px-4 py-3 font-medium text-slate-800">{record.department}</td>
                    <td className="px-4 py-3 text-slate-600">{record.month}</td>
                    <td className="px-4 py-3 text-slate-600">{record.quantity.toLocaleString()}</td>
                    <td className="px-4 py-3 text-slate-600">{record.unit}</td>
                    <td className="px-4 py-3 text-slate-600">{record.emission_factor.toFixed(2)}</td>
                    <td className="px-4 py-3 text-slate-700">
                      {record.emission.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Department
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Total emission (kg)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {groupedTotals.map((group) => (
                  <tr key={group.department} className="odd:bg-white even:bg-slate-50/80">
                    <td className="px-4 py-3 font-medium text-slate-800">{group.department}</td>
                    <td className="px-4 py-3 text-slate-700">
                      {group.emission.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

