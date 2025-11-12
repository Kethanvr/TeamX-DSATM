"use client";

import { useState } from "react";
import { BrainCircuit, Loader2, AlertTriangle } from "lucide-react";

import type { InsightsResponse, MonthlyEmissionPoint } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type AIInsightsCardProps = {
  company?: string;
  period?: string;
  aggregated: Record<string, number>;
  monthlySeries: MonthlyEmissionPoint[];
};

export function AIInsightsCard({
  company = "Your organization",
  period = "Current period",
  aggregated,
  monthlySeries,
}: AIInsightsCardProps) {
  const [insights, setInsights] = useState<InsightsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await fetch("/api/insights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company,
          period,
          aggregated,
          monthlySeries,
        }),
      });

      if (!response.ok) {
        throw new Error("Insight service returned an error");
      }

      const data = (await response.json()) as InsightsResponse | { error: string };
      if ("error" in data) {
        throw new Error(data.error);
      }

      setInsights(data);
    } catch (error) {
      console.error("Failed to generate AI insights", error);
      setErrorMessage(
        "We could not generate fresh insights right now. Showing a curated recommendation set so the demo can continue.",
      );
      setInsights({
        insightText:
          "Transport and electricity usage dominate the carbon footprint this quarter. Efficiency improvements will have the largest impact.",
        actions: [
          "Switch a portion of fleet routes to electric or hybrid vehicles to trim fuel emissions.",
          "Negotiate a renewable energy agreement covering at least 30% of grid consumption.",
          "Roll out a travel policy prioritizing trains and virtual meetings for short-haul trips.",
        ],
        forecastSummary:
          "If these steps are adopted, overall emissions may fall by 12–15% next quarter with lower scope 2 intensity.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <Badge aria-label="AI insights badge" variant="secondary">
          Insight Engine
        </Badge>
        <CardTitle className="flex items-center gap-2 text-2xl font-semibold text-slate-900">
          <BrainCircuit className="h-6 w-6 text-blue-500" aria-hidden="true" />
          AI Recommendations
        </CardTitle>
        <CardDescription>
          Transform aggregated emissions into briefing-ready insights and prioritized actions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights ? (
          <div className="space-y-4">
            <p className="text-base font-medium text-slate-800">
              {insights.insightText}
            </p>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                Top Actions
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                {insights.actions.map((action, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 rounded-lg border border-emerald-100 bg-emerald-50/60 p-3"
                  >
                    <span className="mt-1 inline-flex h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-blue-100 bg-blue-50 p-3 text-sm text-blue-700">
              <strong className="block text-xs uppercase tracking-wide text-blue-500">
                Forecast
              </strong>
              {insights.forecastSummary}
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            Generate narrative-ready insights, recommended actions, and a scenario forecast in one click.
          </p>
        )}

        {errorMessage && (
          <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
            <AlertTriangle className="mt-0.5 h-4 w-4" aria-hidden="true" />
            <span>{errorMessage}</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleGenerate}
          aria-label="Generate AI sustainability insights"
          disabled={isLoading || Object.keys(aggregated).length === 0}
          className="w-full gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Generating…
            </>
          ) : (
            "Generate Insights"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

