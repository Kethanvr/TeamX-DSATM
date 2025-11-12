<div align="center">

# 🌱 EcoMeter AI

An intelligent carbon emission management dashboard for hackathon demos. Built with Next.js (App Router), TailwindCSS v3, shadcn/ui primitives, Recharts, and an on-device insight engine.

</div>

## ✨ Highlights

- Interactive dashboard with bar, pie, and line charts powered by Recharts.
- Landing page card that offers multiple curated demo datasets or CSV uploads with shape validation.
- AI Insights card that posts aggregated data to `/api/insights` and returns narrative summaries, actions, and a forecast snippet.
- Forecast widget that visualizes current vs optimized trajectories and projected reduction impact.
- Admin workspace with filtering, grouped totals, and CSV export alongside the EcoScore heuristic.

## 🧱 Project Structure

```
app/
  layout.tsx            # Root layout with navbar, footer, providers
  page.tsx              # Home with dataset loader
  dashboard/page.tsx    # Main analytics view
  admin/page.tsx        # Optional audit table
  demo/page.tsx         # Presenter script (visual)
  api/insights/route.ts # Server action powering AI briefings
  demo/download/route.ts# Download demo.md
components/
  Navbar.tsx, Footer.tsx
  UploadDataCard.tsx
  EmissionChart.tsx
  AIInsightsCard.tsx
  ForecastChart.tsx
  EcoScoreCard.tsx
  providers/EmissionDataProvider.tsx
  ui/{button,card,badge,progress}.tsx
data/
  dummy_emission_data.json
  dummy_emission_data_logistics.json
  dummy_emission_data_energy.json
  sample_upload.csv
lib/
  calculateEmissions.ts
  insightsEngine.ts
  types.ts
  utils.ts
styles/
  globals.css
demo.md                 # Presenter narrative
```

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment (optional)**
   - Create `.env.local` if you need to store project-specific overrides (e.g., analytics IDs or future API hooks).  
     No variables are required for the local heuristic insight engine.

3. **Run the dev server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000`.

## 📊 Dataset & Calculations

- Curated demo scenarios live in `data/dummy_emission_data*.json` covering manufacturing, logistics, and renewable energy operations.
- Each record includes `department`, `month`, `quantity`, `unit`, and `emission_factor`.
- `calculateEmissions.ts` computes:
  - Emission totals per department and month.
  - Overall CO₂e and normalized EcoScore (expected max = 20,000 kg CO₂e).
  - Percentage splits for pie charts.
- Forecasts extrapolate growth vs a 15% reduction scenario.

## 🤖 Insight Engine

- `app/api/insights/route.ts` centralises server-side generation.
- `lib/insightsEngine.ts` analyses aggregated data locally and returns narrative-ready insights, prioritized actions, and a forecast snippet.
- The frontend displays graceful fallbacks if the request fails so the demo can continue uninterrupted.

## 🧪 Demo & Test Checklist

Before shipping, run through:

1. `npm run dev` starts Next.js and loads the homepage.
2. Click **Use Demo Dataset** → routed to `/dashboard`.
3. Bar/pie/line charts render with interactive tooltips.
4. **Generate Insights** returns summary + 3 actions (local heuristic engine).
5. Forecast chart shows both lines with three future months.
6. EcoScore between 0–100 with correct color banding.
7. Upload a CSV matching the template → charts update (try `data/sample_upload.csv`).
8. API failure surfaces a friendly inline error and fallback insights.

## 🎤 Demo Resources

- Presenter guide lives at `/demo` with a downloadable `demo.md`.
- Quick flow: Home → Use Demo → Dashboard charts → Generate Insights → Forecast → EcoScore → Admin table.

## 📦 Deployment Notes

- Designed for Vercel or any Node-compatible host.
- `next.config.js` enables standalone output for simplified hosting.
- No external database required—state lives in memory for demo purposes.

## 🧰 Scripts

- `npm run dev` — start local dev server.
- `npm run build` — production build.
- `npm run start` — run the compiled app.
- `npm run lint` — ESLint via `eslint-config-next`.

---

Built for rapid hackathon storytelling. Extend with live data connectors, historical baselines, or automation hooks as your MVP evolves. 🌍
