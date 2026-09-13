export interface Stat {
  /** The headline figure, rendered large in the display serif. e.g. "$150k" */
  value: string;
  /** Caption shown beneath the figure. e.g. "Simulated AUM" */
  label: string;
}

/** The three-figure strip on the Home page. */
export const stats: Stat[] = [
  // Book value as of the last logged trade: $95,423.61 opening balance plus
  // $43,007 of realized P&L across the archive in /data/trades.ts.
  { value: "$138k", label: "Simulated AUM" },
  { value: "200+", label: "Club Members" },
  { value: "1", label: "Shared Love for Derivatives" },
];
