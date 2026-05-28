import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { ProjectionPoint } from "@/lib/ppr-projection";

interface Props {
  points: ProjectionPoint[];
}

const eurCompact = new Intl.NumberFormat("pt-PT", {
  style: "currency",
  currency: "EUR",
  notation: "compact",
  maximumFractionDigits: 1,
});

const eurFull = new Intl.NumberFormat("pt-PT", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function ProjectionChart({ points }: Props) {
  return (
    <section className="px-10 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-sm font-medium text-foreground">Capital growth</h2>
          <p className="text-xs text-muted-foreground">Balance projected year by year</p>
        </div>
      </div>

      <div className="h-[380px] w-full rounded-md border border-border bg-card/40 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={points} margin={{ top: 12, right: 16, left: 8, bottom: 8 }}>
            <CartesianGrid stroke="oklch(0.27 0 0)" strokeDasharray="2 4" vertical={false} />
            <XAxis
              dataKey="age"
              stroke="oklch(0.55 0 0)"
              tick={{ fontSize: 11, fill: "oklch(0.65 0 0)" }}
              tickLine={false}
              axisLine={{ stroke: "oklch(0.27 0 0)" }}
              tickFormatter={(v) => `${v}`}
            />
            <YAxis
              stroke="oklch(0.55 0 0)"
              tick={{ fontSize: 11, fill: "oklch(0.65 0 0)" }}
              tickLine={false}
              axisLine={false}
              width={70}
              tickFormatter={(v: number) => eurCompact.format(v)}
            />
            <Tooltip
              cursor={{ stroke: "oklch(0.45 0 0)", strokeDasharray: "2 4" }}
              contentStyle={{
                backgroundColor: "oklch(0.19 0 0)",
                border: "1px solid oklch(0.27 0 0)",
                borderRadius: 6,
                fontSize: 12,
                color: "oklch(0.97 0 0)",
              }}
              labelStyle={{ color: "oklch(0.65 0 0)", fontSize: 11 }}
              formatter={(value: number) => [eurFull.format(Math.round(value)), "Balance"]}
              labelFormatter={(label) => `Age ${label}`}
            />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="oklch(0.97 0 0)"
              strokeWidth={1.75}
              dot={false}
              activeDot={{ r: 4, fill: "oklch(0.97 0 0)", stroke: "oklch(0.16 0 0)", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
