"use client";

import Link from "next/link";

import { useEmissionData } from "@/components/providers/EmissionDataProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPage() {
  const { dataset } = useEmissionData();

  if (!dataset) {
    return (
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 py-16 text-center">
        <h2 className="text-3xl font-semibold text-slate-900">
          Load data before visiting the admin view
        </h2>
        <p className="max-w-xl text-slate-600">
          This quick admin table surfaces raw activity records for audit and reconciliation.
          Return to the home page to load the demo or upload CSV first.
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
          Review uploaded activity data, perfect for validating source system exports before running analytics.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            {dataset.departments.length} activity records
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th scope="col" className="px-4 py-3">Department</th>
                <th scope="col" className="px-4 py-3">Month</th>
                <th scope="col" className="px-4 py-3">Quantity</th>
                <th scope="col" className="px-4 py-3">Unit</th>
                <th scope="col" className="px-4 py-3">Emission Factor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dataset.departments.map((record, index) => (
                <tr key={`${record.department}-${record.month}-${index}`} className="odd:bg-white even:bg-slate-50/80">
                  <td className="px-4 py-3 font-medium text-slate-800">{record.department}</td>
                  <td className="px-4 py-3 text-slate-600">{record.month}</td>
                  <td className="px-4 py-3 text-slate-600">{record.quantity.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-600">{record.unit}</td>
                  <td className="px-4 py-3 text-slate-600">{record.emission_factor.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

