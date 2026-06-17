import type { MonthlyMarketingData } from "@/lib/mock-data";

type BuildReportPromptOptions = {
  note?: string;
  adjustedFields?: string[];
};

export function buildReportPrompt(
  marketingData: MonthlyMarketingData,
  options: BuildReportPromptOptions = {}
) {
  const { note, adjustedFields = [] } = options;
  const focusNote = note?.trim() ? note.trim() : "No additional focus note provided.";
  const inputStatus =
    adjustedFields.length > 0
      ? `The user adjusted these top-level monthly metrics during the demo: ${adjustedFields.join(", ")}.`
      : "The report uses the default mock monthly metrics loaded by the dashboard.";

  return {
    instructions: [
      "You are a senior marketing analyst preparing monthly management commentary for Pohjoinen Oy, a Finnish ecommerce company selling outdoor gear, sports equipment, and seasonal apparel.",
      "Use only the structured mock data provided by the app. Do not imply that the app is connected to live GA4, Shopify, Klaviyo, Google Ads, Meta Ads, TikTok Ads, Semrush, Canva, WordPress, or Google Sheets APIs.",
      "Some top-level monthly metrics may have been adjusted by the user during the demo. Treat those adjusted values as the current structured input, while keeping the read-only channel breakdown as supporting context.",
      "Write in practical, natural business language. Avoid AI hype, filler, and exaggerated certainty.",
      "The output is a human-reviewed first draft for a management deck. Keep it concise.",
      "Return plain text with these exact section headings: Short executive summary, What changed this month, What needs attention, Recommended next actions."
    ].join("\n"),
    input: JSON.stringify(
      {
        userFocusNote: focusNote,
        inputStatus,
        marketingData
      },
      null,
      2
    )
  };
}
