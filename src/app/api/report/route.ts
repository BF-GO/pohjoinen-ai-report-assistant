import { NextResponse } from "next/server";
import OpenAI from "openai";
import { buildReportPrompt } from "@/lib/report-prompt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ReportRequestBody = {
  note?: unknown;
};

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

async function parseNote(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    throw new Error("Request body must be valid JSON.");
  }

  if (!isRecord(body)) {
    throw new Error("Request body must be a JSON object.");
  }

  const { note } = body as ReportRequestBody;

  if (note !== undefined && typeof note !== "string") {
    throw new Error("The optional note field must be a string.");
  }

  const trimmedNote = note?.trim();
  return trimmedNote ? trimmedNote.slice(0, 1200) : undefined;
}

export async function POST(request: Request) {
  let note: string | undefined;

  try {
    note = await parseNote(request);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid request body.";
    return jsonError(message, 400);
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return jsonError("OPENAI_API_KEY is not configured.", 500);
  }

  const model = process.env.OPENAI_MODEL || "gpt-5.5";
  const client = new OpenAI({ apiKey });
  const prompt = buildReportPrompt(note);

  try {
    const response = await client.responses.create({
      model,
      instructions: prompt.instructions,
      input: prompt.input
    });

    const report = response.output_text?.trim();

    if (!report) {
      return jsonError("The AI model returned an empty report.", 502);
    }

    return NextResponse.json({ report });
  } catch (error) {
    console.error("Report generation failed", error);

    return jsonError(
      "Unable to generate the report. Check the AI API configuration and try again.",
      502
    );
  }
}
