import Link from "next/link";

const guideSections = [
  {
    title: "1. Load data",
    points: [
      "Choose from curated demo scenarios on the home page or upload a CSV with the required columns (department, month, quantity, unit, emission_factor).",
      "Switch between demo scenarios to showcase different industry emission profiles before heading to the dashboard.",
      "If uploading, double-check the column names—validation happens client-side and gives immediate feedback.",
    ],
  },
  {
    title: "2. Explore the dashboard",
    points: [
      "Top metric cards summarise department coverage, total emissions, and EcoScore benchmarks.",
      "Interactive bar, pie, and line charts highlight hotspots and monthly progression—hover to reveal exact kg CO₂e values.",
      "Generate insights to receive executive-ready summaries, prioritized actions, and a forecast scenario.",
    ],
  },
  {
    title: "3. Work the Admin workspace",
    points: [
      "Filter the activity table by department to validate uploaded records in isolation.",
      "Review calculated emissions per record and export the filtered view to CSV for audits or collaboration.",
      "Use the ‘Grouped totals’ view to confirm the numbers feeding the dashboard aggregates.",
    ],
  },
  {
    title: "4. Demo day pro tips",
    points: [
      "Start from the home hero to highlight EcoMeter’s purpose and curated datasets.",
      "Narrate the dashboard from left to right: metrics → charts → insights → forecast → EcoScore.",
      "Close with the Admin table to prove data lineage and answer questions about underlying records.",
    ],
  },
];

export default function GuidePage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 py-12">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">
          EcoMeter AI
        </p>
        <h1 className="text-4xl font-bold text-slate-900">Usage & Admin Guide</h1>
        <p className="text-slate-600">
          Share this playbook with teammates to prepare for demos or onboarding. It covers how to
          load data, interpret the dashboards, and present admin workflows confidently.
        </p>
      </header>

      <section className="space-y-6">
        {guideSections.map((section) => (
          <div key={section.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-slate-600">
              {section.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-sm text-emerald-800">
        <h3 className="text-base font-semibold text-emerald-700">Need the demo narrative?</h3>
        <p className="mt-2">
          Visit the{" "}
          <Link href="/demo" className="font-semibold text-emerald-700 underline-offset-4 hover:underline">
            Demo Script
          </Link>{" "}
          for a slide-ready walkthrough. The guide and script pair together to deliver a cohesive story.
        </p>
      </section>
    </div>
  );
}

