import { NextResponse } from "next/server";

import { requestGeminiInsights } from "@/lib/geminiClient";
import type { GeminiRequestPayload } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as GeminiRequestPayload;

    if (!payload || !payload.aggregated || !payload.monthlySeries) {
      return NextResponse.json(
        { error: "Invalid payload. Provide aggregated totals and monthly series." },
        { status: 400 },
      );
    }

    const response = await requestGeminiInsights(payload);
    return NextResponse.json(response);
  } catch (error) {
    console.error("Gemini API route failure", error);
    return NextResponse.json(
      {
        error:
          "Gemini request failed. Mocked insights are available on the client for continuity.",
      },
      { status: 500 },
    );
  }
}

