type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
  tone?: "neutral" | "positive" | "warning";
};

const toneClasses = {
  neutral: "border-slate-200 bg-white",
  positive: "border-teal-200 bg-white",
  warning: "border-amber-200 bg-white"
};

export function MetricCard({
  label,
  value,
  detail,
  tone = "neutral"
}: MetricCardProps) {
  return (
    <article className={`rounded-lg border p-5 shadow-soft ${toneClasses[tone]}`}>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-3 text-2xl font-semibold tracking-normal text-slate-950">
        {value}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p>
    </article>
  );
}
