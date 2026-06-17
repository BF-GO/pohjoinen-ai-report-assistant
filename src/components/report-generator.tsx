"use client";

import { FileText, Loader2, RotateCcw } from "lucide-react";
import { FormEvent, useState } from "react";
import {
  validateReportMetrics,
  type EditableReportMetrics
} from "@/lib/report-input";

type ReportResponse = {
  report?: string;
  error?: string;
};

type MetricFormState = {
  revenue: string;
  revenueMomChange: string;
  adSpend: string;
  roas: string;
  conversionRate: string;
  emailRevenue: string;
  seoSessions: string;
};

type MetricField = {
  key: keyof MetricFormState;
  label: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: string;
};

const metricFields: MetricField[] = [
  {
    key: "revenue",
    label: "Revenue",
    suffix: "EUR",
    min: 0,
    max: 10_000_000,
    step: "100"
  },
  {
    key: "revenueMomChange",
    label: "Revenue MoM change",
    suffix: "%",
    min: -100,
    max: 500,
    step: "0.1"
  },
  {
    key: "adSpend",
    label: "Ad spend",
    suffix: "EUR",
    min: 0,
    max: 5_000_000,
    step: "100"
  },
  {
    key: "roas",
    label: "ROAS",
    min: 0,
    max: 100,
    step: "0.1"
  },
  {
    key: "conversionRate",
    label: "Conversion rate",
    suffix: "%",
    min: 0,
    max: 100,
    step: "0.1"
  },
  {
    key: "emailRevenue",
    label: "Email revenue",
    suffix: "EUR",
    min: 0,
    max: 10_000_000,
    step: "100"
  },
  {
    key: "seoSessions",
    label: "SEO sessions",
    min: 0,
    max: 10_000_000,
    step: "100"
  }
];

function formatDecimal(value: number, digits = 1) {
  return Number(value.toFixed(digits)).toString();
}

function buildInitialFormState(
  defaultMetrics: EditableReportMetrics
): MetricFormState {
  return {
    revenue: defaultMetrics.revenue.toString(),
    revenueMomChange: formatDecimal(defaultMetrics.revenueMomChange * 100),
    adSpend: defaultMetrics.adSpend.toString(),
    roas: defaultMetrics.roas.toString(),
    conversionRate: formatDecimal(defaultMetrics.conversionRate * 100),
    emailRevenue: defaultMetrics.emailRevenue.toString(),
    seoSessions: defaultMetrics.seoSessions.toString()
  };
}

function percentToRatio(value: string) {
  if (!value.trim()) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed / 100 : value;
}

function buildMonthlyMetricsPayload(state: MetricFormState) {
  return {
    revenue: state.revenue,
    revenueMomChange: percentToRatio(state.revenueMomChange),
    adSpend: state.adSpend,
    roas: state.roas,
    conversionRate: percentToRatio(state.conversionRate),
    emailRevenue: state.emailRevenue,
    seoSessions: state.seoSessions
  };
}

type ReportGeneratorProps = {
  defaultMetrics: EditableReportMetrics;
};

export function ReportGenerator({ defaultMetrics }: ReportGeneratorProps) {
  const [note, setNote] = useState("");
  const [metricInputs, setMetricInputs] = useState(() =>
    buildInitialFormState(defaultMetrics)
  );
  const [report, setReport] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function updateMetricInput(key: keyof MetricFormState, value: string) {
    setMetricInputs((currentInputs) => ({
      ...currentInputs,
      [key]: value
    }));
  }

  function resetMetricInputs() {
    setMetricInputs(buildInitialFormState(defaultMetrics));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setReport("");

    try {
      const monthlyMetrics = buildMonthlyMetricsPayload(metricInputs);
      const validatedMetrics = validateReportMetrics(monthlyMetrics);

      if (validatedMetrics.errors.length > 0) {
        throw new Error(validatedMetrics.errors.join(" "));
      }

      const response = await fetch("/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          note: note.trim() || undefined,
          monthlyMetrics: validatedMetrics.metrics
        })
      });

      const payload = (await response.json()) as ReportResponse;

      if (!response.ok) {
        throw new Error(payload.error || "Report generation failed.");
      }

      if (!payload.report) {
        throw new Error("The API returned an empty report.");
      }

      setReport(payload.report);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "Report generation failed.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-normal text-slate-950">
            Generate management commentary
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Add an optional focus area, then generate a first draft using the mock
            monthly metrics shown on this page.
          </p>
        </div>
      </div>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <div className="border-b border-slate-200 pb-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-950">
                Adjust monthly data
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                These values simulate monthly exports from analytics, ecommerce,
                ads, CRM and SEO tools.
              </p>
            </div>
            <button
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isLoading}
              onClick={resetMetricInputs}
              type="button"
            >
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              Reset defaults
            </button>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metricFields.map((field) => (
              <label key={field.key} className="block">
                <span className="text-sm font-medium text-slate-700">
                  {field.label}
                </span>
                <div className="mt-2 flex overflow-hidden rounded-lg border border-slate-300 bg-white focus-within:border-teal-600 focus-within:ring-4 focus-within:ring-teal-100">
                  <input
                    className="min-h-11 w-full min-w-0 border-0 bg-transparent px-3 py-2 text-sm text-slate-900 outline-none"
                    disabled={isLoading}
                    inputMode="decimal"
                    max={field.max}
                    min={field.min}
                    onChange={(event) =>
                      updateMetricInput(field.key, event.target.value)
                    }
                    step={field.step}
                    type="number"
                    value={metricInputs[field.key]}
                  />
                  {field.suffix ? (
                    <span className="flex min-w-12 items-center justify-center border-l border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-500">
                      {field.suffix}
                    </span>
                  ) : null}
                </div>
              </label>
            ))}
          </div>
        </div>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Optional note or focus area
          </span>
          <textarea
            className="mt-2 min-h-28 w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            maxLength={1200}
            placeholder="Example: Focus on why TikTok efficiency softened and what management should do next."
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6 text-slate-500">
            Output is intended for review and editing before it is used in a deck.
          </p>
          <button
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-200 disabled:cursor-not-allowed disabled:bg-slate-400"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? (
              <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
            ) : (
              <FileText aria-hidden="true" className="h-4 w-4" />
            )}
            {isLoading ? "Generating report" : "Generate AI report"}
          </button>
        </div>
      </form>

      {error ? (
        <div
          className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900"
          role="alert"
        >
          {error}
        </div>
      ) : null}

      {report ? (
        <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-base font-semibold text-slate-950">
            Generated first draft
          </h3>
          <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-7 text-slate-700">
            {report}
          </pre>
        </div>
      ) : null}
    </section>
  );
}
