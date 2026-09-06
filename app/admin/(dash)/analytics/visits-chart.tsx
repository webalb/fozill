"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function VisitsChart({ data }: { data: { day: string; count: number }[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="visits" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(var(--gold))" stopOpacity={0.4} />
              <stop offset="100%" stopColor="rgb(var(--gold))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" />
          <XAxis dataKey="day" stroke="rgb(var(--border))" fontSize={11} />
          <YAxis stroke="rgb(var(--border))" fontSize={11} allowDecimals={false} />
          <Tooltip
            contentStyle={{
              background: "rgb(var(--card))",
              border: "1px solid rgb(var(--border))",
              borderRadius: 8,
              fontSize: 12,
            }}
            labelStyle={{ color: "rgb(var(--muted))" }}
            itemStyle={{ color: "rgb(var(--fg))" }}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="rgb(var(--gold))"
            strokeWidth={2}
            fill="url(#visits)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
