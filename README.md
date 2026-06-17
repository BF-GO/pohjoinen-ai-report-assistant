# Pohjoinen Marketing Report Assistant

A working proof-of-concept Next.js app for a hiring challenge. It shows how monthly marketing metrics can be turned into a practical first draft of management commentary for Pohjoinen Oy, a Finnish ecommerce company selling outdoor gear, sports equipment, and seasonal apparel.

The app uses local mock data only. It does not connect to GA4, Shopify, Klaviyo, Google Ads, Meta Ads, TikTok Ads, Semrush, Canva, WordPress, Google Sheets, or any other live platform.

## Why this opportunity

The CMO currently spends around two days per month building a management reporting deck. This prototype focuses on the repetitive commentary step: summarising channel performance, highlighting changes, flagging risks, and suggesting next actions. The goal is not to replace review or judgement, but to create a useful draft faster.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- OpenAI JavaScript SDK
- Local mock data
- No database, auth, or external data connectors

## How it works

1. The dashboard renders mock monthly marketing metrics from `src/lib/mock-data.ts`.
2. The user can add an optional note or focus area.
3. The user clicks **Generate AI report**.
4. The frontend calls `POST /api/report`.
5. The API route sends the structured mock data and optional note to the configured OpenAI model.
6. The app displays the generated report draft.

The generated report includes:

- Short executive summary
- What changed this month
- What needs attention
- Recommended next actions

## Run locally

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open http://localhost:3000.

## Environment variables

Create `.env.local` with:

```bash
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-5.5
```

`OPENAI_MODEL` is optional. If it is not set, the API route falls back to `gpt-5.5`.

## Useful commands

```bash
pnpm lint
pnpm build
pnpm dev
```

## Deploy to Vercel

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Add `OPENAI_API_KEY` and optionally `OPENAI_MODEL` in the Vercel project environment variables.
4. Deploy with the default Next.js settings.

No database or additional services are required.

## Limitations

- Uses mock data stored in the repository.
- Does not fetch real marketing, ecommerce, SEO, email, or creative data.
- Does not store generated reports.
- Does not include authentication or user roles.
- Does not export to slides or dashboards.
- AI output still requires human review before use in management reporting.

## What would be built next

- Real connectors through Supermetrics or Funnel.io
- BigQuery or Google Sheets data layer
- Looker Studio dashboard
- Month-over-month history
- Anomaly detection
- Google Slides export
- Separate summaries for CEO, CMO, and channel managers
