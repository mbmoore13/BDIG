"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { PnlPoint } from "@/lib/pnl";
import {
  formatCurrency,
  formatDate,
  formatSignedCurrency,
} from "@/lib/format";

const BROWN = "#4e3629";
const LINE = "#e7e2db";
const MUTED = "#837a70";

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: PnlPoint }[];
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0]!.payload;

  return (
    <div className="border border-line bg-paper px-4 py-3 shadow-lg">
      <p className="text-[0.7rem] tracking-wide text-muted">
        {point.date ? formatDate(point.date) : point.semester}
      </p>
      <p className="mt-1.5 font-display text-xl tracking-tight text-ink">
        {formatCurrency(point.cumulative)}
      </p>
      <p className="mt-0.5 text-xs text-muted">
        {point.ticker} {formatSignedCurrency(point.delta)}
      </p>
    </div>
  );
}

export default function PnlChart({ data }: { data: PnlPoint[] }) {
  const tickerBySequence = new Map(data.map((d) => [d.sequence, d.ticker]));

  return (
    <figure className="m-0">
      <div className="h-[280px] w-full sm:h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="pnlFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={BROWN} stopOpacity={0.14} />
                <stop offset="100%" stopColor={BROWN} stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke={LINE} strokeDasharray="0" vertical={false} />
            <XAxis
              dataKey="sequence"
              tickFormatter={(value: number) => tickerBySequence.get(value) ?? ""}
              tickLine={false}
              axisLine={{ stroke: LINE }}
              tick={{ fill: MUTED, fontSize: 11 }}
              tickMargin={12}
              interval="preserveStartEnd"
              minTickGap={8}
            />
            <YAxis
              tickFormatter={(value: number) => formatCurrency(value)}
              tickLine={false}
              axisLine={false}
              tick={{ fill: MUTED, fontSize: 12 }}
              width={78}
            />
            <ReferenceLine y={0} stroke={LINE} strokeWidth={1} />
            <Tooltip
              content={<ChartTooltip />}
              cursor={{ stroke: BROWN, strokeWidth: 1, strokeDasharray: "3 3" }}
            />
            <Area
              type="linear"
              dataKey="cumulative"
              stroke={BROWN}
              strokeWidth={1.5}
              fill="url(#pnlFill)"
              dot={{ r: 2.5, fill: BROWN, stroke: BROWN }}
              activeDot={{ r: 5, fill: BROWN, stroke: "#ffffff", strokeWidth: 2 }}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <figcaption className="mt-4 text-xs text-muted">
        Running total of realized P&amp;L across every position, in the order the
        book traded them.
      </figcaption>
    </figure>
  );
}
