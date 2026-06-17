# Pohjoinen Marketing Report Assistant

A working proof-of-concept Next.js app for a hiring challenge. It shows how monthly marketing metrics can be reviewed, lightly adjusted, and turned into a practical first draft of management commentary for Pohjoinen Oy, a Finnish ecommerce company selling outdoor gear, sports equipment, and seasonal apparel.

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
2. The user can adjust top-level monthly inputs such as revenue, ROAS, conversion rate, email revenue, and SEO sessions.
3. The user can add an optional note or focus area.
4. The user clicks **Generate AI report**.
5. The frontend calls `POST /api/report` with the note and edited monthly metrics.
6. The API route validates the inputs, falls back to defaults for missing values, and sends the structured data to the configured OpenAI model.
7. The app displays the generated report draft.

The generated report includes:

- Short executive summary
- What changed this month
- What needs attention
- Recommended next actions

## Editable mock data

The editable fields simulate monthly exports from analytics, ecommerce, ads, CRM, and SEO tools. They are still mock inputs, not live integrations.

The channel breakdown remains read-only in this version. The API validates the editable monthly metrics before calling the AI model:

- Revenue, ad spend, email revenue, SEO sessions, ROAS, and conversion rate cannot be negative.
- Month-over-month revenue change can be negative.
- Missing editable values fall back to the default mock data.
- Invalid provided values return a clear validation error.

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
OPENAI_MODEL=gpt-5.4-mini
```

`OPENAI_MODEL` is optional. If it is not set, the API route falls back to `gpt-5.4-mini`.

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
- Editable fields are demo inputs and are not saved.
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
