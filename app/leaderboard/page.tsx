import { Trophy, TrendingDown, Sparkles } from "lucide-react";

import { leaderboardEntries } from "@/lib/leaderboardData";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const badgeColorMap = {
  Trailblazer: "bg-emerald-500 text-white",
  Accelerator: "bg-sky-500 text-white",
  Contender: "bg-amber-500 text-white",
  "Rising Star": "bg-purple-500 text-white",
} as const;

export default function LeaderboardPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 py-12">
      <header className="space-y-3">
        <Badge variant="secondary" aria-label="Leaderboard badge">
          Gamified Progress
        </Badge>
        <h1 className="text-4xl font-bold text-slate-900">EcoMeter Leaderboard</h1>
        <p className="text-slate-600">
          Celebrate teams delivering measurable climate wins. EcoScore, quarterly reduction, and
          badge tiers drive friendly competition across industries.
        </p>
        <div className="flex flex-wrap gap-3 text-xs uppercase tracking-wide text-slate-500">
          <span className="flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1 text-emerald-700">
            <Trophy className="h-4 w-4" aria-hidden="true" /> EcoScore ranking
          </span>
          <span className="flex items-center gap-2 rounded-full bg-sky-100 px-4 py-1 text-sky-700">
            <TrendingDown className="h-4 w-4" aria-hidden="true" /> Quarterly reduction impact
          </span>
          <span className="flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1 text-amber-700">
            <Sparkles className="h-4 w-4" aria-hidden="true" /> Badge tiers
          </span>
        </div>
      </header>

      <section className="space-y-4">
        {leaderboardEntries.map((entry) => (
          <Card
            key={entry.rank}
            className={`relative overflow-hidden border border-slate-200 bg-white transition-shadow hover:shadow-lg ${
              entry.rank <= 3 ? "ring-1 ring-emerald-200" : ""
            }`}
          >
            {entry.rank <= 3 ? (
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-primary" aria-hidden="true" />
            ) : null}
            <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-slate-900">#{entry.rank}</span>
                  <div>
                    <CardTitle className="text-2xl font-semibold text-slate-900">
                      {entry.company}
                    </CardTitle>
                    <CardDescription>{entry.industry}</CardDescription>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-slate-100 px-4 py-1 text-sm font-medium text-slate-700">
                  EcoScore {entry.ecoScore}
                </span>
                <span className="rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-700">
                  −{entry.quarterlyReduction}% quarter
                </span>
                <span
                  className={`rounded-full px-4 py-1 text-sm font-medium ${
                    badgeColorMap[entry.badge]
                  }`}
                >
                  {entry.badge}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">{entry.highlights}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}

