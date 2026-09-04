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
              <stop offset="0%" stopColor="#c9a44c" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#c9a44c" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(120,120,120,0.15)" />
          <XAxis dataKey="day" stroke="rgba(120,120,120,0.5)" fontSize={11} />
          <YAxis stroke="rgba(120,120,120,0.5)" fontSize={11} allowDecimals={false} />
          <Tooltip
            contentStyle={{
              background: "var(--color-surface, #111)",
              border: "1px solid rgba(120,120,120,0.3)",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#c9a44c"
            strokeWidth={2}
            fill="url(#visits)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
