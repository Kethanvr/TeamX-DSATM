<div align="center">

# 🌱 EcoMeter AI

An intelligent carbon-emission storytelling experience that helps sustainability teams explain impact, explore trade-offs, and pitch reduction strategies with data-driven clarity.

</div>

## Overview

EcoMeter AI is a narrative-first analytics workspace built to demo how organisations can monitor and optimise their carbon footprint across departments. It combines ready-to-present visuals, heuristic insights, and guided messaging so teams can communicate sustainability progress without needing external tooling or bespoke integrations.

## Why It Exists

- **Make carbon data tangible** for exec reviews, hackathons, and investor updates.
- **Showcase AI-assisted narratives** that translate raw metrics into actions and forecast snippets.
- **Prototype ESG storytelling** before connecting to operational systems or climate partners.
- **Provide a safe sandbox** where demo datasets and uploads can be swapped in minutes.

## Core Experience

- **Unified landing page** that lets presenters pick curated datasets or upload CSVs with schema validation for a tailored story.
- **Interactive dashboard** featuring bar, pie, and line charts powered by Recharts with department-level breakdowns.
- **AI Insights card** that aggregates data and returns plain-language summaries, prioritized actions, and a forecast talking point.
- **Forecast comparison widget** showing current trajectory versus recommended optimised path and the projected reduction impact.
- **EcoScore heuristic** that translates total emissions into a digestible health score with contextual color banding.
- **Admin workspace** offering filters, grouped totals, CSV export, and a behind-the-scenes audit trail.

## Guided Demo Flow

1. Start on the landing page and choose a demo dataset or upload a scenario-specific CSV.
2. Jump into the dashboard to explore emissions by department, month, and contribution split.
3. Generate AI insights to unlock narrative talking points and recommended actions.
4. Walk through the forecast section to compare current versus optimised trends.
5. Reference the EcoScore and admin workspace to discuss governance, compliance, and next steps.

## Data & Intelligence

- Demo scenarios cover manufacturing, logistics, and renewable energy operations stored in `data/dummy_emission_data*.json`.
- Each record tracks department, month, quantity, unit, and emission factors so totals and percentages can be computed reliably.
- `calculateEmissions.ts` powers aggregation and chart-ready reshaping, while the heuristic insight engine in `lib/insightsEngine.ts` crafts narratives offline.
- The `/api/insights` endpoint centralises processing so the UI can gracefully handle both success and fallback messaging.

## Technology Foundation

- Built with Next.js App Router, Tailwind CSS v3, and shadcn/ui component primitives.
- Recharts drives the data visualisation layer with responsive defaults for demos and tablets.
- State is managed through lightweight providers, keeping the experience fast and dependency-light.

## Roadmap

- **Live data connectors:** plug in real emissions feeds or sustainability APIs.
- **Scenario planning:** simulate policy changes or supplier swaps with side-by-side comparisons.
- **Collaboration mode:** share insight snapshots and assign follow-up actions.
- **Automation hooks:** push recommended actions into project trackers or alerting systems.
- **Accessibility polish:** broaden keyboard navigation and narration-ready modes for presenters.

---

EcoMeter AI is crafted for teams who need to persuade, educate, and inspire around decarbonisation journeys—no manual spreadsheet wrangling required. 🌍
