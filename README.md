<div align="center">

# 🌱 EcoMeter AI

An intelligent carbon emission management dashboard for hackathon demos. Built with Next.js (App Router), TailwindCSS v3, shadcn/ui primitives, Recharts, and a Gemini-powered insights API.

</div>

## ✨ Highlights

- Interactive dashboard with bar, pie, and line charts powered by Recharts.
- Upload card to ingest the curated demo dataset or validate CSV uploads with shape checks.
- AI Insights card that POSTs aggregated data to the `/api/gemini` endpoint and returns structured actions.
- Forecast widget that visualizes current vs optimized trajectories and projected reduction impact.
- EcoScore heuristic with color-coded status, plus an optional Admin table for raw audit.

## 🧱 Project Structure

```
app/
  layout.tsx            # Root layout with navbar, footer, providers
  page.tsx              # Home with dataset loader
  dashboard/page.tsx    # Main analytics view
  admin/page.tsx        # Optional audit table
  demo/page.tsx         # Presenter script (visual)
  api/gemini/route.ts   # Server action proxying Gemini
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
  sample_upload.csv
lib/
  calculateEmissions.ts
  geminiClient.ts
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

2. **Environment (optional but recommended)**
   - Copy `.env.local.example` → `.env.local` (create manually if absent).
   - Add `GEMINI_API_KEY=your-google-gemini-key`.  
     The server route automatically falls back to a mocked response when the key is missing.

3. **Run the dev server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000`.

## 📊 Dataset & Calculations

- `data/dummy_emission_data.json` contains Q4 2025 activity for ABC Manufacturing.
- Each record includes `department`, `month`, `quantity`, `unit`, and `emission_factor`.
- `calculateEmissions.ts` computes:
  - Emission totals per department and month.
  - Overall CO₂e and normalized EcoScore (expected max = 20,000 kg CO₂e).
  - Percentage splits for pie charts.
- Forecasts extrapolate growth vs a 15% reduction scenario.

## 🤖 Gemini Integration

- `app/api/gemini/route.ts` keeps the API key server-side.
- Requests follow the supplied prompt template and expect JSON responses.
- `lib/geminiClient.ts` handles:
  - Prompt construction.
  - Calling Gemini (when `GEMINI_API_KEY` is set).
  - Parsing JSON or returning a deterministic mock when offline.
- Frontend gracefully displays fallback insights if the API call fails.

## 🧪 Demo & Test Checklist

Before shipping, run through:

1. `npm run dev` starts Next.js and loads the homepage.
2. Click **Use Demo Dataset** → routed to `/dashboard`.
3. Bar/pie/line charts render with interactive tooltips.
4. **Generate Insights** returns summary + 3 actions (mocked if no API key).
5. Forecast chart shows both lines with three future months.
6. EcoScore between 0–100 with correct color banding.
7. Upload a CSV matching the template → charts update (try `data/sample_upload.csv`).
8. API failure surfaces a friendly inline error and fallback insights.

## 🎤 Demo Resources

- Presenter guide lives at `/demo` with a downloadable `demo.md`.
- Quick flow: Home → Use Demo → Dashboard charts → Generate Insights → Forecast → EcoScore → Admin table.

## 📦 Deployment Notes

- Designed for Vercel. Add `GEMINI_API_KEY` in the Vercel dashboard before deploying.
- `next.config.js` enables standalone output for simplified hosting.
- No external database required—state lives in memory for demo purposes.

## 🧰 Scripts

- `npm run dev` — start local dev server.
- `npm run build` — production build.
- `npm run start` — run the compiled app.
- `npm run lint` — ESLint via `eslint-config-next`.

---

Built for rapid hackathon storytelling. Extend with live data connectors, historical baselines, or automation hooks as your MVP evolves. 🌍
