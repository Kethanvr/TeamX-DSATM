import Image from "next/image";

import heroIllustration from "@/public/hero-sustainability.svg";
import { UploadDataCard } from "@/components/UploadDataCard";

export default function Home() {
  return (
    <div className="relative isolate mx-auto flex w-full max-w-6xl flex-col gap-14 pb-16 pt-12 md:pt-20">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-primary px-6 py-12 text-white shadow-2xl md:px-12 md:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.22),_transparent_48%)]" />
        <div className="absolute -bottom-32 -right-24 hidden h-[360px] w-[360px] rounded-full bg-white/15 blur-3xl md:block" />

        <div className="relative z-10 grid gap-12 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-center">
          <div className="flex flex-col gap-6">
            <span className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-100">
              Carbon Intelligence
            </span>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Turn raw emissions into confident sustainability playbooks.
            </h1>
            <p className="text-lg text-emerald-50 md:text-xl">
              Load curated demo scenarios or bring your own CSV to uncover top emitters, compare future trajectories, and brief executives with AI-authored guidance—all from a single dashboard.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-emerald-50/90 md:text-sm">
              <span className="rounded-full bg-white/20 px-4 py-1">Interactive dashboard</span>
              <span className="rounded-full bg-white/20 px-4 py-1">Forecast simulations</span>
              <span className="rounded-full bg-white/20 px-4 py-1">AI insights</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="pointer-events-none absolute -inset-6 rounded-[2rem] border border-white/30 bg-white/15 blur-lg" />
            <Image
              src={heroIllustration}
              alt="EcoMeter dashboard preview showing charts and analytics"
              className="relative rounded-[1.75rem] border border-white/20 shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>

      <UploadDataCard />
    </div>
  );
}
