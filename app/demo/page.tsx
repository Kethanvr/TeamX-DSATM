import Link from "next/link";

export default function DemoPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 py-12">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-500">
          Demo Guide
        </p>
        <h1 className="text-4xl font-bold text-slate-900">EcoMeter AI Demo Script</h1>
        <p className="text-slate-600">
          A step-by-step flow for showcasing EcoMeter AI during hackathon judging.
        </p>
      </header>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Pre-demo checklist</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-slate-600">
          <li>Run <code className="rounded bg-slate-100 px-2 py-1">npm run dev</code> and open <span className="font-medium text-slate-800">http://localhost:3000</span>.</li>
          <li>Verify the demo datasets load successfully.</li>
        </ul>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Live demo sequence</h2>
        <ol className="list-decimal space-y-4 pl-6 text-sm text-slate-600">
          <li>
            <strong>Welcome &amp; Vision.</strong> “EcoMeter AI is our carbon intelligence cockpit. It transforms raw activity data into decisions within minutes.”
          </li>
          <li>
            <strong>Home → Load Demo Dataset.</strong> Click <em>Use Demo Dataset</em> and describe the Q4 transport, electricity, travel, and manufacturing mix.
          </li>
          <li>
            <strong>Dashboard Highlights.</strong> Spotlight top metrics, hover over charts, and mention tooltips showing kg CO₂e values.
          </li>
          <li>
            <strong>AI Insights.</strong> Scroll to the AI card, trigger <em>Generate Insights</em>, and highlight the narrative summary, actions, and forecast snippet.
          </li>
          <li>
            <strong>Forecast Panel.</strong> Compare current vs optimized trajectories and call out the projected reduction percentage.
          </li>
          <li>
            <strong>EcoScore &amp; Admin.</strong> Explain the score bands, then optionally open the Admin view to show raw activity rows.
          </li>
          <li>
            <strong>Closing.</strong> “With live ERP integrations, EcoMeter AI could continuously benchmark and coach teams toward net-zero goals.”
          </li>
        </ol>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Suggested Q&amp;A</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-slate-600">
          <li>
            <span className="font-medium text-slate-800">Onboarding:</span> uploads via CSV today; production would offer automated connectors.
          </li>
          <li>
            <span className="font-medium text-slate-800">Exporting actions:</span> copy from UI or expose via API/webhook for tasking tools.
          </li>
          <li>
            <span className="font-medium text-slate-800">Forecast accuracy:</span> currently heuristic; roadmap includes historical learning and energy pricing inputs.
          </li>
        </ul>
      </section>

      <footer className="border-t border-slate-200 pt-6 text-sm text-slate-500">
        Prefer raw markdown?{" "}
        <Link href="/demo/download" className="text-emerald-600 hover:text-emerald-700">
          Download demo.md
        </Link>
      </footer>
    </div>
  );
}

