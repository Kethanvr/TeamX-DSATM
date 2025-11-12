import { NextResponse } from "next/server";

import { generateInsights } from "@/lib/insightsEngine";
import type { InsightsRequestPayload } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as InsightsRequestPayload;

    if (!payload || !payload.aggregated || !payload.monthlySeries) {
      return NextResponse.json(
        { error: "Invalid payload. Provide aggregated totals and monthly series." },
        { status: 400 },
      );
    }

    const response = await generateInsights(payload);
    return NextResponse.json(response);
  } catch (error) {
    console.error("Insight API failure", error);
    return NextResponse.json(
      {
        error:
          "Insight generation failed. Please retry with valid data or refresh the page.",
      },
      { status: 500 },
    );
  }
}

