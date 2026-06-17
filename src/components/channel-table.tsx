import type { ChannelPerformance } from "@/lib/mock-data";

type ChannelTableProps = {
  channels: ChannelPerformance[];
};

const euroFormatter = new Intl.NumberFormat("fi-FI", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0
});

const numberFormatter = new Intl.NumberFormat("fi-FI");

function formatPercent(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

function formatMom(value: number) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${formatPercent(value)}`;
}

export function ChannelTable({ channels }: ChannelTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-normal text-slate-500">
            <tr>
              <th className="whitespace-nowrap px-5 py-4 font-semibold">Channel</th>
              <th className="whitespace-nowrap px-5 py-4 font-semibold">Revenue</th>
              <th className="whitespace-nowrap px-5 py-4 font-semibold">MoM</th>
              <th className="whitespace-nowrap px-5 py-4 font-semibold">Spend</th>
              <th className="whitespace-nowrap px-5 py-4 font-semibold">ROAS</th>
              <th className="whitespace-nowrap px-5 py-4 font-semibold">Sessions</th>
              <th className="whitespace-nowrap px-5 py-4 font-semibold">Conv.</th>
              <th className="min-w-72 px-5 py-4 font-semibold">Channel note</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {channels.map((channel) => (
              <tr key={channel.name} className="align-top">
                <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-950">
                  {channel.name}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-slate-700">
                  {euroFormatter.format(channel.revenue)}
                </td>
                <td
                  className={`whitespace-nowrap px-5 py-4 font-medium ${
                    channel.revenueMomChange >= 0
                      ? "text-teal-700"
                      : "text-amber-700"
                  }`}
                >
                  {formatMom(channel.revenueMomChange)}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-slate-700">
                  {channel.spend === null ? "Not paid" : euroFormatter.format(channel.spend)}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-slate-700">
                  {channel.roas === null ? "n/a" : `${channel.roas.toFixed(2)}x`}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-slate-700">
                  {numberFormatter.format(channel.sessions)}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-slate-700">
                  {formatPercent(channel.conversionRate)}
                </td>
                <td className="px-5 py-4 leading-6 text-slate-600">{channel.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
