import { CalendarDays, Newspaper, RefreshCcw } from "lucide-react";

import { newsInsights } from "@/lib/newsData";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const sections = [
  { id: "current", label: "Current Insights", icon: RefreshCcw },
  { id: "past", label: "Past Highlights", icon: CalendarDays },
];

export default function NewsPage() {
  const groupedInsights = sections.map((section) => ({
    ...section,
    insights: newsInsights.filter((insight) => insight.category === section.id),
  }));

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 py-12">
      <header className="space-y-4">
        <Badge variant="secondary" aria-label="Daily insights badge">
          Daily Insights
        </Badge>
        <h1 className="text-4xl font-bold text-slate-900">Stay ahead with curated climate intel</h1>
        <p className="text-slate-600">
          Scan current sustainability news and revisit past breakthroughs to inspire your next
          EcoMeter challenge. Each card includes a recommended action.
        </p>
        <div className="flex flex-wrap gap-3 text-xs uppercase tracking-wide text-slate-500">
          <span className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1 text-blue-700">
            <Newspaper className="h-4 w-4" aria-hidden="true" />
            Curated sources
          </span>
          <span className="rounded-full bg-slate-100 px-4 py-1 text-slate-700">
            Updated weekdays 08:00
          </span>
        </div>
      </header>

      <section className="space-y-8">
        {groupedInsights.map(({ id, label, icon: Icon, insights }) => (
          <div key={id} className="space-y-4">
            <div className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-slate-500" aria-hidden="true" />
              <h2 className="text-2xl font-semibold text-slate-900">{label}</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {insights.map((insight) => (
                <Card key={insight.id} className="bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-900">
                      {insight.title}
                    </CardTitle>
                    <CardDescription className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-500">
                      <span>{insight.source}</span>
                      <span>{insight.publishedAt}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-slate-600">{insight.summary}</p>
                    <div className="rounded-xl border border-blue-100 bg-blue-50 p-3 text-sm text-blue-700">
                      <strong className="block text-xs uppercase tracking-wide text-blue-500">
                        Recommended action
                      </strong>
                      {insight.action}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

