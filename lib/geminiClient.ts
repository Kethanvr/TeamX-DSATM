import { type GeminiRequestPayload, type GeminiResponse } from "./types";

const GEMINI_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";

function buildPrompt(payload: GeminiRequestPayload) {
  return `You are an expert sustainability consultant. Analyze the following company carbon emission data and provide:
1. A short summary (2-3 sentences) of the top emission sources.
2. Top 3 prioritized, actionable recommendations to reduce emissions. Keep each action short and specific (1–2 lines).
3. A concise forecast summary predicting percent change in emissions over next 3 months if the actions are followed.

Data:
${JSON.stringify(payload.aggregated)}
MonthlySeries:
${JSON.stringify(payload.monthlySeries)}

Respond in JSON:
{
  "summary": "...",
  "actions": ["...","...","..."],
  "forecastSummary": "..."
}`;
}

function toGeminiBody(prompt: string) {
  return {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  };
}

function extractJsonFromText(text: string) {
  const match = text.match(/\{[\s\S]*\}/);
  return match ? match[0] : text;
}

function mapToResponse(data: {
  summary?: string;
  actions?: string[];
  forecastSummary?: string;
}) {
  const actions = Array.isArray(data.actions)
    ? data.actions.filter((action) => typeof action === "string")
    : [];

  return {
    insightText: data.summary ?? "Emission trends are stable this quarter.",
    actions:
      actions.length > 0
        ? actions
        : [
            "Audit transport logistics to consolidate high-emission routes.",
            "Switch 20% of grid electricity to renewable sources.",
            "Launch employee travel guidelines to prioritize virtual meetings.",
          ],
    forecastSummary:
      data.forecastSummary ??
      "If the recommended actions are implemented, total emissions can decline by ~12% over the next quarter.",
  };
}

function buildMockResponse(payload: GeminiRequestPayload): GeminiResponse {
  const topDepartment = Object.entries(payload.aggregated).sort(
    (a, b) => b[1] - a[1],
  )[0];
  const summary = topDepartment
    ? `Transport and Electricity remain the leading emission sources, with ${topDepartment[0]} contributing the most.`
    : "Emissions are well balanced across departments.";

  return {
    insightText: summary,
    actions: [
      "Introduce route optimization and driver coaching to cut fuel consumption by 12%.",
      "Negotiate renewable energy contracts to transition 30% of electricity demand.",
      "Deploy waste heat recovery on manufacturing lines to reduce baseline load.",
    ],
    forecastSummary:
      "Applying these measures can realistically lower Q1 emissions by 15% while improving energy intensity per unit output.",
  };
}

async function parseGeminiPayload(response: Response) {
  const body = await response.json();
  const candidateText: string | undefined =
    body?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!candidateText) {
    return null;
  }

  try {
    return JSON.parse(extractJsonFromText(candidateText));
  } catch {
    return null;
  }
}

export async function requestGeminiInsights(
  payload: GeminiRequestPayload,
): Promise<GeminiResponse> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return buildMockResponse(payload);
  }

  try {
    const prompt = buildPrompt(payload);
    const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toGeminiBody(prompt)),
    });

    if (!response.ok) {
      return buildMockResponse(payload);
    }

    const parsed = await parseGeminiPayload(response);
    if (!parsed) {
      return buildMockResponse(payload);
    }

    return mapToResponse(parsed);
  } catch (error) {
    console.error("Gemini request failed", error);
    return buildMockResponse(payload);
  }
}

