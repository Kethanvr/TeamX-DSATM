"use client";

import { Leaf } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

type EcoScoreCardProps = {
  ecoScore: number;
  totalEmission: number;
  topDepartment?: string;
};

function getScoreTheme(score: number) {
  if (score >= 70) {
    return {
      badge: "bg-emerald-100 text-emerald-700",
      progress: score,
      message: "Great trajectory. Maintain the momentum and monitor hotspots monthly.",
    };
  }

  if (score >= 40) {
    return {
      badge: "bg-amber-100 text-amber-700",
      progress: score,
      message: "Moderate performance. Act on the recommended levers to unlock double-digit gains.",
    };
  }

  return {
    badge: "bg-red-100 text-red-600",
    progress: score,
    message: "High opportunity for improvement. Prioritize transport and electricity optimization.",
  };
}

export function EcoScoreCard({
  ecoScore,
  totalEmission,
  topDepartment,
}: EcoScoreCardProps) {
  const theme = getScoreTheme(ecoScore);

  return (
    <Card className="h-full">
      <CardHeader>
        <Badge aria-label="Eco score status" className={`w-fit ${theme.badge}`}>
          EcoScore {ecoScore.toFixed(1)}
        </Badge>
        <CardTitle className="flex items-center gap-2 text-2xl font-semibold text-slate-900">
          <Leaf className="h-6 w-6 text-emerald-500" aria-hidden="true" />
          Sustainability snapshot
        </CardTitle>
        <CardDescription>
          A normalized score benchmarking total CO₂e against expected intensity for similar manufacturers.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm font-medium text-slate-600">
            <span aria-label="EcoScore label">Overall EcoScore</span>
            <span>{ecoScore.toFixed(1)} / 100</span>
          </div>
          <Progress value={theme.progress} />
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          <p className="font-semibold text-slate-700">
            Annualized emissions:{" "}
            <span className="text-slate-900">
              {totalEmission.toLocaleString()} kg CO₂e
            </span>
          </p>
          {topDepartment && (
            <p>
              Highest contributor:{" "}
              <span className="font-medium text-slate-800">{topDepartment}</span>
            </p>
          )}
        </div>

        <p className="text-sm text-slate-600">{theme.message}</p>

        <Button asChild aria-label="Jump to AI recommendations" className="w-full">
          <a href="#ai-insights">Generate AI recommendations</a>
        </Button>
      </CardContent>
    </Card>
  );
}

