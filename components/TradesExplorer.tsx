"use client";

import { useId, useMemo, useState, type ReactNode } from "react";
import Modal from "./Modal";
import PnlChart from "./PnlChart";
import TradeCard from "./TradeCard";
import type { Trade } from "@/data/trades";
import type { PnlPoint } from "@/lib/pnl";
import {
  formatCurrency,
  formatDate,
  formatSignedCurrency,
  formatSignedPercent,
} from "@/lib/format";

type SortDirection = "newest" | "oldest";

/** Only the fields this trade actually has, in the order they should read. */
function detailFields(trade: Trade): { label: string; value: ReactNode }[] {
  const fields: { label: string; value: ReactNode }[] = [
    { label: "Strategy", value: trade.strategy },
    { label: "Semester", value: trade.semester },
    { label: "All In", value: trade.allIn ? "Yes" : "No" },
    { label: "Trade Date", value: formatDate(trade.dateOpened) },
  ];

  const add = (label: string, value: ReactNode) => {
    if (value !== undefined && value !== null) fields.push({ label, value });
  };

  add("Date Closed", trade.dateClosed ? formatDate(trade.dateClosed) : undefined);
  add("Expiration", trade.expiration ? formatDate(trade.expiration) : undefined);
  add("Contracts", trade.contracts);
  add("Strikes", trade.strikes);
  add("Moneyness", trade.moneyness);
  add("Entry Price", trade.entryPrice ? `$${trade.entryPrice}` : undefined);
  add("Exit Price", trade.exitPrice);
  add(
    "Capital Deployed",
    trade.capitalDeployed ? formatCurrency(trade.capitalDeployed) : undefined,
  );
  add(
    "Credit Received",
    trade.creditReceived ? `$${trade.creditReceived.toFixed(2)}` : undefined,
  );
  add("Max Profit", trade.maxProfit ? formatCurrency(trade.maxProfit) : undefined);
  add("Max Loss", trade.maxLoss);
  add("Breakeven", trade.breakeven ? `$${trade.breakeven}` : undefined);

  return fields;
}

export default function TradesExplorer({
  trades,
  chartData,
}: {
  trades: Trade[];
  chartData: PnlPoint[];
}) {
  const [semester, setSemester] = useState<string>("all");
  const [sort, setSort] = useState<SortDirection>("newest");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const headingId = useId();
  const sortId = useId();

  // Semesters in book order, so the filter row reads chronologically.
  const semesters = useMemo(() => {
    const seen = new Map<string, number>();
    for (const trade of trades) {
      const first = seen.get(trade.semester);
      if (first === undefined || trade.sequence < first) {
        seen.set(trade.semester, trade.sequence);
      }
    }
    return [...seen.entries()]
      .sort((a, b) => a[1] - b[1])
      .map(([name]) => name);
  }, [trades]);

  const visible = useMemo(() => {
    const filtered =
      semester === "all"
        ? trades
        : trades.filter((trade) => trade.semester === semester);

    return [...filtered].sort((a, b) =>
      sort === "newest" ? b.sequence - a.sequence : a.sequence - b.sequence,
    );
  }, [trades, semester, sort]);

  const trade = trades.find((item) => item.slug === selectedSlug);
  const positive = trade ? trade.pnlDollars >= 0 : false;

  return (
    <>
      {chartData.length >= 2 ? (
        <section aria-label="Cumulative realized profit and loss" className="mb-20">
          <p className="section-label mb-6">Cumulative Realized P&amp;L</p>
          <PnlChart data={chartData} />
        </section>
      ) : null}

      <div className="mb-10 flex flex-col gap-5 border-y border-line py-5 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="group"
          aria-label="Filter trades by semester"
          className="flex flex-wrap items-center gap-x-7 gap-y-2"
        >
          {["all", ...semesters].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSemester(option)}
              aria-pressed={semester === option}
              className={`text-sm tracking-wide transition-colors ${
                semester === option ? "text-brown" : "text-muted hover:text-ink"
              }`}
            >
              {option === "all" ? "All" : option}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor={sortId} className="section-label">
            Sort
          </label>
          <select
            id={sortId}
            value={sort}
            onChange={(event) => setSort(event.target.value as SortDirection)}
            className="cursor-pointer border border-line bg-paper px-3 py-1.5 text-sm text-ink-soft transition-colors hover:border-brown/40"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>

      {visible.length > 0 ? (
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {visible.map((item) => (
            <li key={item.slug} className="flex">
              <TradeCard
                trade={item}
                onOpen={() => setSelectedSlug(item.slug)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-16 text-center text-sm text-muted">
          No trades in the archive for {semester}.
        </p>
      )}

      <Modal
        open={Boolean(trade)}
        onClose={() => setSelectedSlug(null)}
        labelledBy={headingId}
      >
        {trade ? (
          <article>
            <header className="border-b border-line px-7 py-8 sm:px-10">
              <h2
                id={headingId}
                className="font-display text-2xl leading-tight tracking-tight text-ink sm:text-3xl"
              >
                {trade.company}
              </h2>
              <p className="mt-1.5 text-sm text-muted">{trade.ticker}</p>
            </header>

            <div className="px-7 py-8 sm:px-10">
              <dl className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
                {detailFields(trade).map((field, index) => (
                  <Field
                    key={field.label}
                    label={field.label}
                    className={index === 0 ? "sm:col-span-2" : ""}
                  >
                    {field.value}
                  </Field>
                ))}

                <Field label="Resulting P&L">
                  <span className={positive ? "text-gain" : "text-loss"}>
                    {formatSignedCurrency(trade.pnlDollars)}
                    {trade.pnlPercent !== undefined ? (
                      <span className="text-sm">
                        {" "}
                        ({formatSignedPercent(trade.pnlPercent)})
                      </span>
                    ) : null}
                  </span>
                </Field>
              </dl>

              {trade.notes ? (
                <div className="mt-9 border-t border-line pt-8">
                  <p className="section-label mb-4">Notes</p>
                  <p className="text-[0.9375rem] leading-relaxed text-ink-soft">
                    {trade.notes}
                  </p>
                </div>
              ) : null}
            </div>
          </article>
        ) : null}
      </Modal>
    </>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="section-label mb-2">{label}</dt>
      <dd className="text-[0.9375rem] leading-relaxed text-ink">{children}</dd>
    </div>
  );
}
