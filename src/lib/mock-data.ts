export type ChannelPerformance = {
  name: "Google Ads" | "Meta Ads" | "TikTok Ads" | "Klaviyo" | "SEO";
  revenue: number;
  revenueMomChange: number;
  spend: number | null;
  roas: number | null;
  sessions: number;
  conversionRate: number;
  note: string;
};

export type MonthlyMarketingData = {
  company: string;
  month: string;
  currency: "EUR";
  revenue: number;
  revenueMomChange: number;
  adSpend: number;
  roas: number;
  conversionRate: number;
  emailRevenue: number;
  seoSessions: number;
  channelBreakdown: ChannelPerformance[];
  contextNotes: string[];
};

export const monthlyMarketingData: MonthlyMarketingData = {
  company: "Pohjoinen Oy",
  month: "May 2026",
  currency: "EUR",
  revenue: 284600,
  revenueMomChange: 0.084,
  adSpend: 52000,
  roas: 3.9,
  conversionRate: 0.031,
  emailRevenue: 41800,
  seoSessions: 69400,
  channelBreakdown: [
    {
      name: "Google Ads",
      revenue: 113700,
      revenueMomChange: 0.112,
      spend: 25500,
      roas: 4.46,
      sessions: 38200,
      conversionRate: 0.034,
      note:
        "Search demand for hiking boots and camping sets improved as early-summer planning started. Brand search remained efficient."
    },
    {
      name: "Meta Ads",
      revenue: 68200,
      revenueMomChange: 0.061,
      spend: 16400,
      roas: 4.16,
      sessions: 29600,
      conversionRate: 0.027,
      note:
        "Prospecting creative around lightweight jackets lifted traffic, while retargeting continued to carry the strongest conversion rate."
    },
    {
      name: "TikTok Ads",
      revenue: 18700,
      revenueMomChange: -0.047,
      spend: 8900,
      roas: 2.1,
      sessions: 22100,
      conversionRate: 0.014,
      note:
        "Video engagement was healthy, but revenue efficiency softened after the spring sale ended."
    },
    {
      name: "Klaviyo",
      revenue: 41800,
      revenueMomChange: 0.139,
      spend: 1200,
      roas: 34.83,
      sessions: 18400,
      conversionRate: 0.061,
      note:
        "Email revenue grew from replenishment flows, seasonal apparel campaigns, and stronger abandoned-cart recovery."
    },
    {
      name: "SEO",
      revenue: 42200,
      revenueMomChange: 0.073,
      spend: null,
      roas: null,
      sessions: 69400,
      conversionRate: 0.024,
      note:
        "Organic sessions increased for tent, trail running shoe, and rainwear guides. Some high-volume product pages lost position."
    }
  ],
  contextNotes: [
    "The figures are mock monthly data for a prototype, not live platform data.",
    "Seasonality matters: May usually benefits from camping, hiking, and summer sports demand.",
    "Management wants practical commentary that can be reviewed before being pasted into a reporting deck."
  ]
};
