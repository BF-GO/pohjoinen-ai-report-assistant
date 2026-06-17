"use client";

import { FileText, Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";

type ReportResponse = {
  report?: string;
  error?: string;
};

export function ReportGenerator() {
  const [note, setNote] = useState("");
  const [report, setReport] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setReport("");

    try {
      const response = await fetch("/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ note: note.trim() || undefined })
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
