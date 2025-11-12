import { UploadDataCard } from "@/components/UploadDataCard";

export default function Home() {
  return (
    <div className="relative isolate mx-auto flex w-full max-w-6xl flex-col gap-12 pb-12 pt-10 md:pt-16">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-primary px-6 py-12 text-white shadow-2xl md:px-12 md:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.25),_transparent_45%)]" />
        <div className="relative z-10 flex flex-col gap-6 md:max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-100">
            Carbon Intelligence
          </span>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            EcoMeter AI turns emission data into actionable sustainability wins.
          </h1>
          <p className="text-lg text-emerald-50">
            Upload operational data or launch our demo dataset to visualize
            hotspots, forecast reductions, and generate Gemini-powered
            recommendations—all in minutes.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-emerald-50/90">
            <span className="rounded-full bg-white/20 px-4 py-1">
              Dashboard-first
            </span>
            <span className="rounded-full bg-white/20 px-4 py-1">
              Recharts visualizations
            </span>
            <span className="rounded-full bg-white/20 px-4 py-1">
              Gemini insights
            </span>
          </div>
        </div>
      </div>

      <UploadDataCard />
    </div>
  );
}
