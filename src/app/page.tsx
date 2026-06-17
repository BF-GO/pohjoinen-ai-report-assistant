import { ChannelTable } from "@/components/channel-table";
import { MetricCard } from "@/components/metric-card";
import { ReportGenerator } from "@/components/report-generator";
import { monthlyMarketingData } from "@/lib/mock-data";

const euroFormatter = new Intl.NumberFormat("fi-FI", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0
});

const numberFormatter = new Intl.NumberFormat("en-US");

function formatPercent(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

function formatMom(value: number) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${formatPercent(value)} MoM`;
}

export default function Home() {
  const data = monthlyMarketingData;

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="border-b border-slate-200 pb-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-normal text-teal-700">
                Working prototype using local mock data
              </p>
              <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-normal text-slate-950 sm:text-5xl">
                Pohjoinen Marketing Report Assistant
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                A proof-of-concept dashboard that turns monthly marketing metrics
                into a management-ready commentary draft. It is a human-reviewed
                first draft, not an auto-publishing system.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white px-5 py-4 shadow-soft">
              <p className="text-sm text-slate-500">Reporting month</p>
              <p className="mt-1 text-lg font-semibold text-slate-950">{data.month}</p>
            </div>
          </div>
        </header>

        <section className="mt-8">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-normal text-slate-950">
                Monthly metrics
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Mock metrics shaped like the data Pohjoinen could collect from
                analytics, advertising, ecommerce, email, and SEO tools.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              detail={formatMom(data.revenueMomChange)}
              label="Revenue"
              tone="positive"
              value={euroFormatter.format(data.revenue)}
            />
            <MetricCard
              detail="Paid media investment"
              label="Ad spend"
              value={euroFormatter.format(data.adSpend)}
            />
            <MetricCard
              detail="Blended paid media return"
              label="ROAS"
              tone="positive"
              value={`${data.roas.toFixed(1)}x`}
            />
            <MetricCard
              detail="Sitewide ecommerce conversion"
              label="Conversion rate"
              value={formatPercent(data.conversionRate)}
            />
            <MetricCard
              detail="Klaviyo campaigns and flows"
              label="Email revenue"
              tone="positive"
              value={euroFormatter.format(data.emailRevenue)}
            />
            <MetricCard
              detail="Organic search traffic"
              label="SEO sessions"
              value={numberFormatter.format(data.seoSessions)}
            />
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4">
            <h2 className="text-xl font-semibold tracking-normal text-slate-950">
              Channel breakdown
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Each row includes a short analyst note to help the AI report stay
              grounded in the mock monthly performance.
            </p>
          </div>
          <ChannelTable channels={data.channelBreakdown} />
        </section>

        <div className="mt-8">
          <ReportGenerator />
        </div>

        <footer className="mt-8 rounded-lg border border-slate-200 bg-white px-5 py-4 text-sm leading-6 text-slate-600 shadow-soft">
          This prototype does not connect to real GA4, Shopify, Klaviyo, ad
          platform, Semrush, Canva, WordPress, or Google Sheets APIs. It uses
          local mock data to demonstrate the reporting workflow.
        </footer>
      </div>
    </main>
  );
}
