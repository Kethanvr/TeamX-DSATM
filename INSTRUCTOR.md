Purpose: This document tells an AI builder exactly how to generate a complete hackathon-ready MVP of EcoMeter AI — an Intelligent Carbon Emission Management dashboard built with Next.js, Tailwind v3, shadcn/ui, Recharts, and Google Gemini for AI-driven recommendations.
Use this as a single canonical instruction for automated creation: scaffolding, components, API route, dummy data, styling, and a demo-ready flow.

Quick goals (what the AI must produce)

A Next.js app (App Router) scaffolded and runnable (npm run dev)

TailwindCSS v3 configured and working.

shadcn/ui installed and a basic component set (Card, Button, Badge, Progress).

A data/dummy_emission_data.json dataset included.

Pages/components:

Home / Upload page (/) — demo dataset loader + CSV upload fallback.

Dashboard page (/dashboard) — header, charts, AI insights, forecast, EcoScore.

Optional Admin page (/admin) (simple table).

app/api/gemini/route.ts (server API) that accepts POST with dataset and returns Gemini output (uses NEXT_PUBLIC_GEMINI_API_KEY or a server env variable).

Clean UI using Tailwind + shadcn; charts via Recharts.

No external DB required — stateful mock data and local JSON suffice.

README + demo script + environment setup instructions.

Small test checklist and demo run-through.

High-level build strategy (order of operations)

Follow these steps in sequence to ensure the build is consistent and minimal friction:

Scaffold project with Next.js (app router), TypeScript optional but recommended.

Install dependencies: Tailwind v3, shadcn/ui, Recharts, csv-parse (optional), axios/fetch for API calls.

Add Tailwind config and global CSS; wire shadcn styles.

Create data/dummy_emission_data.json and a CSV example file.

Create layout & global components (Navbar, Footer, Layout wrapper).

Implement Home page with "Use Demo Data" and "Upload CSV" flow.

Implement Dashboard page:

Data ingestion from state (or query param)

Charts: Bar, Pie, Line (Recharts)

AI Insights: button triggers API call to api/gemini route

Forecast: create two trend lines (current vs optimized) using generated/mock numbers

EcoScore: calculated based on weighted emission contributions

Create server API route to call Gemini (securely) to get recommendations and summaries.

Polish UI with Tailwind & shadcn components; ensure responsive design.

Add demo instructions and test checklist.

Project skeleton & file map

Create files exactly like this tree (AI should generate file stubs and fill internals as instructed below):

ecometer-ai/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                # Home / Upload page
│   ├── dashboard/
│   │    └── page.tsx           # Dashboard
│   └── admin/
│        └── page.tsx           # Optional
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── UploadDataCard.tsx
│   ├── EmissionChart.tsx
│   ├── AIInsightsCard.tsx
│   ├── ForecastChart.tsx
│   └── EcoScoreCard.tsx
├── data/
│   └── dummy_emission_data.json
├── lib/
│   ├── geminiClient.ts
│   └── calculateEmissions.ts
├── styles/
│   └── globals.css
├── app/api/gemini/route.ts
├── package.json
├── next.config.js
├── tailwind.config.js
└── README.md

Dummy data (must be placed at /data/dummy_emission_data.json)

The AI must create a JSON file with realistic, small dataset. Example structure (AI should create at least 10 rows and include monthly breakdown):

{
  "company": "ABC Manufacturing",
  "period": "Q4 2025",
  "departments": [
    { "department": "Transport", "month": "2025-10", "quantity": 500, "unit": "L", "emission_factor": 2.68 },
    { "department": "Transport", "month": "2025-11", "quantity": 520, "unit": "L", "emission_factor": 2.68 },
    { "department": "Electricity", "month": "2025-10", "quantity": 1200, "unit": "kWh", "emission_factor": 0.82 },
    { "department": "Travel", "month": "2025-10", "quantity": 20, "unit": "trips", "emission_factor": 250 },
    { "department": "Manufacturing", "month": "2025-10", "quantity": 300, "unit": "kg", "emission_factor": 1.4 }
    // ... add additional months & rows to cover 3 months
  ]
}


The AI should compute emissions as quantity * emission_factor per record when building charts.

Component requirements & UI behavior — detailed

These are functional requirements that the generated components must implement.

1. UploadDataCard

UI: Title, short description, two big buttons:

"Use Demo Dataset" — loads /data/dummy_emission_data.json into React state and navigates to /dashboard.

"Upload CSV" — file input reads CSV (client-side) and converts to the same data shape as the JSON. If time-constrained, this can be a simple FileReader that parses a known column format.

Provide subtle animation on click.

Validate uploaded file shape; show an inline error for missing columns.

2. EmissionChart

Accepts aggregated data (emission totals by department or monthly series).

Renders:

Bar chart for emissions by department

Pie chart for percentage contribution

Line chart for monthly trend (if monthly series available)

Use Recharts with animations enabled, tooltips, and legends.

3. AIInsightsCard

Displays Gemini-generated text.

UI: title, small spinner while waiting, formatted text result.

Contains a button: "Generate Insights" which:

sends current aggregated data to /api/gemini via POST,

receives response { insightText: string, actions: [..], forecastSummary: string }

renders the text with small highlighted bullets for actions.

Should handle and display errors.

4. ForecastChart

Uses mock predictive data: create two lines:

currentTrend: extrapolate last months with +x% growth

optimizedTrend: apply a reduction percentage if AI actions applied (e.g., -15%)

Chart shows next 3 months.

Add a small legend and snapshot numbers at the top (e.g., "Projected reduction: 15%").

5. EcoScoreCard

Calculates a score from aggregated department emissions using simple rules:

Normalize by max emission and invert to get a score (0-100).

Apply cosmetic color logic:

=70 green, 40-69 yellow, <40 red.

Show EcoScore, short recommendation line, and a CTA to "Generate AI recommendations".

6. Navbar & Layout

Navbar with app title and two links: Dashboard, Admin (optional).

Layout component wraps all pages with consistent padding and background.

Server API: /app/api/gemini/route.ts (server-only)

Purpose: Accept POST requests with the prepared data and call Gemini (the AI). The file must not expose the API key to the client.

Accepts payload:

{
  "company": "...",
  "period": "...",
  "aggregated": { "Transport": 1340, "Electricity": 984, ... },
  "monthlySeries": [ { "month": "Nov", "value": 15000 }, ... ]
}


Build a concise prompt using the template (see Gemini prompt templates section).

Call Gemini (via server-side fetch/axios). Use environment variable GEMINI_API_KEY (server-only). If the agent or environment uses NEXT_PUBLIC_GEMINI_API_KEY, ensure it's only used server-side (or use a proxy).

Return structured response:

{
  "insightText": "string",
  "actions": ["action1","action2","action3"],
  "forecastSummary": "string"
}


Handle rate limits & errors; return error JSON on failure.

If actual Gemini endpoint parameters differ, the AI should default to generating a mock response structure if it cannot reach the API (so the UI never breaks).

Gemini prompt templates (exact phrasing the AI must use)

Use the following templates to get consistent outputs.

Primary prompt (for insights & actions)
You are an expert sustainability consultant. Analyze the following company carbon emission data and provide:
1. A short summary (2-3 sentences) of the top emission sources.
2. Top 3 prioritized, actionable recommendations to reduce emissions. Keep each action short and specific (1–2 lines).
3. A concise forecast summary predicting percent change in emissions over next 3 months if the actions are followed.

Data:
{{JSON.stringify(aggregated)}} 
MonthlySeries:
{{JSON.stringify(monthlySeries)}}

Respond in JSON:
{
  "summary": "...",
  "actions": ["...","...","..."],
  "forecastSummary": "..."
}

Follow-up prompt (if you want a human-readable explanation / speech)
Convert the JSON response into a short friendly paragraph for an executive summary, not more than 6 sentences. Use simple business language.


The AI agent building the app should ensure it extracts the JSON parts robustly (parse the response if the model returns text).

Emission calculation rules (helper logic)

For each record: emission = quantity * emission_factor.

Aggregate by department and by month.

Total emission = sum of all record emissions.

Calculate percentages: deptPercent = (deptEmission / totalEmission) * 100.

EcoScore: simple heuristic:

base = 100 - (normalized_total_emission * 100) where normalized_total_emission = min(totalEmission / expected_max, 1); tune expected_max to dataset scale (e.g., 20000).

Clamp score to 0–100.

Create helper functions in lib/calculateEmissions.ts that return:

{
  totalsByDepartment: Record<string, number>,
  monthlySeries: [{ month: string, value: number }],
  totalEmission: number,
  ecoScore: number
}

Styling & shadcn/ui usage (exact instructions)

Use TailwindCSS v3 as the main utility library.

Use shadcn/ui for consistent components. The AI must:

Initialize shadcn (or mimic its component styles) and generate minimal component wrappers used in the project.

Use Card, Button, Badge, Progress components from shadcn in UI layout.

Provide responsive layout: two-column on desktop (charts left, AI insights right) and single-column on mobile.

Color palette:

Primary gradient: from-green-400 to to-blue-500

Danger: red-500

Success: green-500

Neutral backgrounds: gray-50 / white cards

CSV upload format (for upload fallback)

If the user uploads CSV, expect columns:

department, month, quantity, unit, emission_factor
Provide client-side parser to convert CSV rows to the same JSON record structure. If parser encounters unknown column names, display a readable error message and show a sample CSV download.

Accessibility & small UX rules

All interactive elements must have aria-label attributes.

Color-coded status must have text labels (not color-only).

Buttons must have hover/focus states.

Charts should have tooltips and readable legends.

Error handling (must be implemented)

If no data loaded → show a friendly empty state with CTA to "Use Demo Dataset".

If Gemini API fails → show fallback message and display a mocked set of insights (so demo continues).

Upload errors → show line errors and allow sample CSV download.

Demo script (what to show to judges)

Create a demo.md or include in README. The AI must add a short script that the presenter repeats:

Open app (Home) → Click Use Demo Dataset

Dashboard loads: show Total Emissions at top, then Bar/Pie charts

Click Generate Insights → wait for Gemini → show AI-prompted recommendations

Scroll to Forecast → show "Current vs Optimized" lines — explain the expected % reduction if actions followed.

Highlight EcoScore & close with “This is an MVP — with real integrations (smart meters, ERPs), EcoMeter AI can automatically monitor and reduce corporate emissions.”

Tests & validation (simple checklist AI must add)

Before finalizing, run these quick checks (automated or manual):

 npm run dev starts Next.js server and homepage loads.

 Clicking “Use Demo Dataset” navigates to /dashboard.

 Bar chart renders departments and tooltips show correct emission numbers.

 Clicking “Generate Insights” returns JSON and displays 3 actions.

 Forecast chart displays two lines with 3 months of data.

 EcoScore is a number between 0 and 100 and color-coded correctly.

 CSV upload (if present) parses sample CSV and data updates charts.

 API errors gracefully handled (fallback text displayed).

Deployment & environment notes

Use .env.local for GEMINI_API_KEY or NEXT_PUBLIC_GEMINI_API_KEY. Prefer server-side var GEMINI_API_KEY and refer to it only in app/api/gemini/route.ts.

For hackathon demo you may generate mocked Gemini responses to avoid network issues. But keep the server route implemented so swapping to real key is trivial.

Recommended deployment: Vercel (default Next.js). Add environment variables in Vercel dashboard.

Prompts to drive automated generation (what you should feed the AI builder)

Use these short prompts (examples for an AI code-generator agent) to sequentially produce artifact sets:

Scaffold & deps

Create a Next.js (App Router) project named ecometer-ai with TypeScript. Install tailwindcss v3, shadcn/ui, recharts, csv-parse, and axios. Add tailwind config with base, components, utilities. Add globals.css linking tailwind base, components, utilities.

Data & helpers

Create file /data/dummy_emission_data.json with a 3-month dataset for company ABC Manufacturing and export helper lib/calculateEmissions.ts that calculates per-record emission, totals per department, monthly series, and ecoScore.

Layout & pages

Generate app/layout.tsx with Navbar and Footer components and a home page at app/page.tsx that offers "Use Demo Dataset" and "Upload CSV". Make "Use Demo Dataset" load dummy JSON and navigate to /dashboard.

Charts & Dashboard

Create app/dashboard/page.tsx that uses EmissionChart, ForecastChart, EcoScoreCard, and AIInsightsCard. Charts use Recharts to display totals and monthly series. Use Tailwind + shadcn components for layout.

Gemini API

Create server route app/api/gemini/route.ts that receives aggregated data and calls Gemini API using the prompt template. If API fails, return mock structured JSON.

UI polish

Use shadcn Card, Button, Progress elements, apply gradient header and responsive layout. Add tooltips, legends, and animated chart transitions.

Testing & README

Add README.md with setup and demo instructions and a demo checklist. Ensure npm run dev works.

Run each prompt in sequence and produce code for that chunk. After each chunk, run tests in the checklist and continue.

Final notes & guardrails for the AI builder

Do not leak the Gemini API key in client-side code. All AI calls must originate server-side (app/api/gemini/route.ts).

Keep the UI minimal & clean. Prioritize readable cards and one polished screen over many half-finished features.

If network or time issues occur, fallback to static mocked AI response that looks professional.

Keep the dataset small and deterministic so the demo output is predictable.

Add comments in each generated file to explain purpose and where to change production keys.

Deliverables (what the AI must output at the end)

Fully runnable Next.js project with files per the tree above.

data/dummy_emission_data.json and optional data/sample_upload.csv.

app/api/gemini/route.ts with stubbed/mocked Gemini call and prompt template.

README.md with demo script and setup steps.

demo.md (short presenter script).

Checklist validation log showing all tests pass.

If you need to ask clarifying questions (prioritize these only)

Use TypeScript or JavaScript? (Default: TypeScript)

Should the Gemini integration be real or mocked for the first run? (Default: mocked with option to enable real key)

Do you want CSV upload parsing to accept custom column names? (Default: expect fixed column names)