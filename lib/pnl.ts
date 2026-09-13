import type { Trade } from "@/data/trades";

/** Trades in book order, earliest first. */
export function tradesInOrder(trades: Trade[]): Trade[] {
  return [...trades].sort((a, b) => a.sequence - b.sequence);
}

export interface PnlPoint {
  sequence: number;
  ticker: string;
  semester: string;
  /** Running total of realized P&L through this trade, in dollars. */
  cumulative: number;
  /** Realized P&L of this trade alone. */
  delta: number;
  /** Trade date, ISO `YYYY-MM-DD`. */
  date: string;
}

/**
 * Running total of realized P&L, one point per trade, ordered by `sequence`
 * rather than by date — sequence is the order the semester sheets stepped the
 * book through, which is what the running portfolio value reconciles against.
 */
export function cumulativeRealizedPnl(trades: Trade[]): PnlPoint[] {
  let running = 0;
  return tradesInOrder(trades).map((trade) => {
    running += trade.pnlDollars;
    return {
      sequence: trade.sequence,
      ticker: trade.ticker,
      semester: trade.semester,
      cumulative: running,
      delta: trade.pnlDollars,
      date: trade.dateOpened,
    };
  });
}

/** Total realized P&L across the whole archive. */
export function totalRealizedPnl(trades: Trade[]): number {
  return trades.reduce((sum, trade) => sum + trade.pnlDollars, 0);
}
