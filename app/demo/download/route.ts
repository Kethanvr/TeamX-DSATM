import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "demo.md");
    const content = await fs.readFile(filePath, "utf-8");
    return new NextResponse(content, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Content-Disposition": "attachment; filename=demo.md",
      },
    });
  } catch (error) {
    console.error("Failed to load demo.md", error);
    return NextResponse.json(
      { error: "Demo script not found." },
      { status: 404 },
    );
  }
}

