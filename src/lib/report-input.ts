import {
  monthlyMarketingData,
  type MonthlyMarketingData
} from "@/lib/mock-data";

export type EditableReportMetrics = Pick<
  MonthlyMarketingData,
  | "revenue"
  | "revenueMomChange"
  | "adSpend"
  | "roas"
  | "conversionRate"
  | "emailRevenue"
  | "seoSessions"
>;

export type ReportInputValidation = {
  data: MonthlyMarketingData;
  metrics: EditableReportMetrics;
  adjustedFields: string[];
  errors: string[];
};

type MetricRule = {
  label: string;
  min: number;
  max: number;
};

const metricRules: Record<keyof EditableReportMetrics, MetricRule> = {
  revenue: {
    label: "Revenue",
    min: 0,
    max: 10_000_000
  },
  revenueMomChange: {
    label: "Revenue month-over-month change",
    min: -1,
    max: 5
  },
  adSpend: {
    label: "Ad spend",
    min: 0,
    max: 5_000_000
  },
  roas: {
    label: "ROAS",
    min: 0,
    max: 100
  },
  conversionRate: {
    label: "Conversion rate",
    min: 0,
    max: 1
  },
  emailRevenue: {
    label: "Email revenue",
    min: 0,
    max: 10_000_000
  },
  seoSessions: {
    label: "SEO sessions",
    min: 0,
    max: 10_000_000
  }
};

const metricKeys = Object.keys(metricRules) as Array<keyof EditableReportMetrics>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getDefaultMetrics(
  defaults: MonthlyMarketingData = monthlyMarketingData
): EditableReportMetrics {
  return {
    revenue: defaults.revenue,
    revenueMomChange: defaults.revenueMomChange,
    adSpend: defaults.adSpend,
    roas: defaults.roas,
    conversionRate: defaults.conversionRate,
    emailRevenue: defaults.emailRevenue,
    seoSessions: defaults.seoSessions
  };
}

function readOptionalNumber(value: unknown) {
  if (
    value === undefined ||
    value === null ||
    (typeof value === "string" && value.trim() === "")
  ) {
    return { isMissing: true, value: undefined };
  }

  const parsedValue =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number(value.trim())
        : Number.NaN;

  if (!Number.isFinite(parsedValue)) {
    return { isMissing: false, value: undefined };
  }

  return { isMissing: false, value: parsedValue };
}

export function validateReportMetrics(
  input: unknown,
  defaults: MonthlyMarketingData = monthlyMarketingData
): ReportInputValidation {
  const defaultMetrics = getDefaultMetrics(defaults);
  const errors: string[] = [];
  const metrics: EditableReportMetrics = { ...defaultMetrics };

  if (input === undefined || input === null) {
    return {
      data: defaults,
      metrics,
      adjustedFields: [],
      errors
    };
  }

  if (!isRecord(input)) {
    return {
      data: defaults,
      metrics,
      adjustedFields: [],
      errors: ["Monthly metrics must be provided as an object."]
    };
  }

  for (const key of metricKeys) {
    const rule = metricRules[key];
    const parsed = readOptionalNumber(input[key]);

    if (parsed.isMissing) {
      continue;
    }

    if (parsed.value === undefined) {
      errors.push(`${rule.label} must be a number.`);
      continue;
    }

    if (parsed.value < rule.min || parsed.value > rule.max) {
      errors.push(`${rule.label} must be between ${rule.min} and ${rule.max}.`);
      continue;
    }

    metrics[key] = parsed.value;
  }

  if (errors.length > 0) {
    return {
      data: defaults,
      metrics: defaultMetrics,
      adjustedFields: [],
      errors
    };
  }

  const adjustedFields = metricKeys
    .filter((key) => Math.abs(metrics[key] - defaultMetrics[key]) > 0.000001)
    .map((key) => metricRules[key].label);

  return {
    data: {
      ...defaults,
      ...metrics,
      contextNotes: [
        ...defaults.contextNotes,
        "Top-level monthly metrics may include user adjustments made during the demo. Channel breakdown remains read-only mock data."
      ]
    },
    metrics,
    adjustedFields,
    errors
  };
}

export function getDefaultReportMetrics(
  defaults: MonthlyMarketingData = monthlyMarketingData
) {
  return getDefaultMetrics(defaults);
}
