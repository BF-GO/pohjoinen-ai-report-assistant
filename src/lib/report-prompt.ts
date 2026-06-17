import { monthlyMarketingData } from "@/lib/mock-data";

export function buildReportPrompt(note?: string) {
  const focusNote = note?.trim() ? note.trim() : "No additional focus note provided.";

  return {
    instructions: [
      "You are a senior marketing analyst preparing monthly management commentary for Pohjoinen Oy, a Finnish ecommerce company selling outdoor gear, sports equipment, and seasonal apparel.",
      "Use only the structured mock data provided by the app. Do not imply that the app is connected to live GA4, Shopify, Klaviyo, Google Ads, Meta Ads, TikTok Ads, Semrush, Canva, WordPress, or Google Sheets APIs.",
      "Write in practical, natural business language. Avoid AI hype, filler, and exaggerated certainty.",
      "The output is a human-reviewed first draft for a management deck. Keep it concise.",
      "Return plain text with these exact section headings: Short executive summary, What changed this month, What needs attention, Recommended next actions."
    ].join("\n"),
    input: JSON.stringify(
      {
        userFocusNote: focusNote,
        marketingData: monthlyMarketingData
      },
      null,
      2
    )
  };
}
