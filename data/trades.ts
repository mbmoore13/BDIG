/**
 * The BDIG trade archive.
 *
 * Source of truth: the club's semester trade spreadsheets. Every position here
 * is closed — the club logs a trade only after closing it, so there is no open
 * state anywhere in this file or the UI.
 *
 * Fields a given semester's sheet did not record are simply omitted; the detail
 * modal renders what is present and skips the rest.
 *
 * DATES: the sheets recorded entry and exit dates for the first three trades
 * only. Every other `dateOpened` below is the underlying's quarterly earnings
 * release date, since positions are pitched into earnings and entered the same
 * day. Those are marked `// earnings` and were taken from company IR releases
 * and SEC 8-K filings.
 *
 * To add a trade: append one object, give it the next `sequence` number.
 */

export type Semester = "Fall 2025" | "Spring 2026";

export interface Trade {
  /** Stable URL-safe id. Must be unique across the array. */
  slug: string;
  /** Full company name. This is what the deal card shows. */
  company: string;
  /** Exchange ticker. */
  ticker: string;
  /** Which semester's book this trade belongs to. Drives the filter row. */
  semester: Semester;
  /**
   * Position of this trade in the book, 1 = earliest. Orders the grid and the
   * cumulative P&L chart.
   */
  sequence: number;
  /** The structure, in the club's own words. */
  strategy: string;
  /** Whether the book was committed to this single position. */
  allIn: boolean;
  /** Trade date, ISO `YYYY-MM-DD`. Shown on the card. */
  dateOpened: string;
  /** Realized P&L in whole dollars. Negative for a loss. */
  pnlDollars: number;

  // Everything below is optional — only some semesters recorded these.

  /** Exit date, ISO `YYYY-MM-DD`. */
  dateClosed?: string;
  /** Option expiration, ISO `YYYY-MM-DD`. */
  expiration?: string;
  /** Number of contracts. */
  contracts?: number;
  /** Strike or strikes, as written on the sheet. e.g. "60/70/80" */
  strikes?: string;
  /** Premium or margin committed at entry, in whole dollars. */
  capitalDeployed?: number;
  /** Credit taken in at entry, per contract. */
  creditReceived?: number;
  /** Maximum profit at entry, in dollars. */
  maxProfit?: number;
  /** Maximum loss at entry. A string because it is often "unlimited". */
  maxLoss?: string;
  /** Breakeven price of the underlying. */
  breakeven?: number;
  /** Price of the underlying at entry. */
  entryPrice?: number;
  /** Price of the underlying at exit. A string — the sheets use "~142". */
  exitPrice?: string;
  /** ATM / ITM / OTM at entry. */
  moneyness?: string;
  /** Return on capital deployed, as a percent. Only where capital was recorded. */
  pnlPercent?: number;
  /** Free text shown at the bottom of the detail modal. */
  notes?: string;
}

export const trades: Trade[] = [
  // ---------------------------------------------------------------- Fall 2025
  {
    slug: "nvda-fall-2025-long-calls",
    company: "NVIDIA Corporation",
    ticker: "NVDA",
    semester: "Fall 2025",
    sequence: 1,
    strategy: "Buy Calls",
    allIn: false,
    dateOpened: "2025-09-25",
    dateClosed: "2025-09-30",
    contracts: 4,
    strikes: "175",
    moneyness: "ATM",
    entryPrice: 174.48,
    exitPrice: "186.58",
    capitalDeployed: 2000,
    pnlDollars: 2816,
    pnlPercent: 140.8,
    notes:
      "Call premium of $5.00 at entry against a $2,000 commitment, sized to four contracts. Sold at $12.04 for $1,204 per contract, returning $4,816 on the position.",
  },
  {
    slug: "stz-fall-2025-naked-puts",
    company: "Constellation Brands",
    ticker: "STZ",
    semester: "Fall 2025",
    sequence: 2,
    strategy: "Sold Naked Puts",
    allIn: false,
    dateOpened: "2025-10-06",
    dateClosed: "2025-10-08",
    expiration: "2025-10-10",
    contracts: 6,
    strikes: "136",
    creditReceived: 3.8,
    maxProfit: 2280,
    maxLoss: "Substantial — undefined to the downside",
    breakeven: 136,
    exitPrice: "~142",
    pnlDollars: 1920,
  },
  {
    slug: "blk-fall-2025-bull-call-spread",
    company: "BlackRock",
    ticker: "BLK",
    semester: "Fall 2025",
    sequence: 3,
    strategy: "Bull Call Spread",
    allIn: true,
    dateOpened: "2025-10-14", // earnings — Q3 2025
    expiration: "2025-11-21",
    contracts: 13,
    // The sheet records "85/95", which cannot be right — BLK traded near $1,100
    // that autumn, so that spread would be ~$1,000 in the money and could not
    // lose $1,755. Confirmed as a dropped leading "10".
    strikes: "1085 / 1095",
    pnlDollars: -1755,
  },
  {
    slug: "pypl-fall-2025-call-butterfly",
    company: "PayPal Holdings",
    ticker: "PYPL",
    semester: "Fall 2025",
    sequence: 4,
    strategy: "Long Call Butterfly Spread",
    allIn: true,
    dateOpened: "2025-10-28", // earnings — Q3 2025
    expiration: "2025-11-21",
    contracts: 40,
    strikes: "60/70/80",
    pnlDollars: 1500,
  },
  {
    slug: "xom-fall-2025-twisted-sister",
    company: "Exxon Mobil",
    ticker: "XOM",
    semester: "Fall 2025",
    sequence: 5,
    strategy: "Twisted Sister",
    allIn: true,
    dateOpened: "2025-10-31", // earnings — Q3 2025
    pnlDollars: 100,
  },
  {
    slug: "crwv-fall-2025-synthetic-short",
    company: "CoreWeave",
    ticker: "CRWV",
    semester: "Fall 2025",
    sequence: 6,
    strategy: "Sell Call just OTM, buy a Put just ITM",
    allIn: true,
    dateOpened: "2025-11-10", // earnings — Q3 2025
    pnlDollars: 9593,
  },
  {
    slug: "klar-fall-2025-short-strangle",
    company: "Klarna Group",
    ticker: "KLAR",
    semester: "Fall 2025",
    sequence: 7,
    strategy: "Short OTM Strangle",
    allIn: true,
    dateOpened: "2025-11-18", // earnings — Q3 2025, Klarna's first as a public company
    pnlDollars: 2958,
  },

  // -------------------------------------------------------------- Spring 2026
  {
    slug: "googl-spring-2026-short-strangle",
    company: "Alphabet",
    ticker: "GOOGL",
    semester: "Spring 2026",
    sequence: 8,
    strategy: "Short OTM Strangle",
    allIn: true,
    dateOpened: "2026-02-04", // earnings — Q4 2025
    pnlDollars: 1300,
  },
  {
    slug: "ko-spring-2026-put-credit-spread",
    company: "The Coca-Cola Company",
    ticker: "KO",
    semester: "Spring 2026",
    sequence: 9,
    strategy: "Short Put Credit Spread",
    allIn: false,
    dateOpened: "2026-02-10", // earnings — Q4 2025
    pnlDollars: 1870,
  },
  {
    slug: "mtn-spring-2026-bear-put-spread",
    company: "Vail Resorts",
    ticker: "MTN",
    semester: "Spring 2026",
    sequence: 10,
    strategy: "Bear Put Debit Spread",
    allIn: false,
    dateOpened: "2026-03-09", // earnings — Q2 FY2026
    pnlDollars: 2880,
  },
  {
    slug: "ccl-spring-2026-bull-call-spread",
    company: "Carnival Corporation",
    ticker: "CCL",
    semester: "Spring 2026",
    sequence: 11,
    strategy: "Bull Call Debit Spread",
    allIn: false,
    dateOpened: "2026-03-27", // earnings — Q1 FY2026
    pnlDollars: 3000,
  },
  {
    slug: "play-spring-2026-short-strangle",
    company: "Dave & Buster's Entertainment",
    ticker: "PLAY",
    semester: "Spring 2026",
    sequence: 12,
    strategy: "Short Strangle",
    allIn: false,
    dateOpened: "2026-03-31", // earnings — Q4 FY2025
    pnlDollars: 700,
  },
  {
    slug: "dal-spring-2026-broken-wing-butterfly",
    company: "Delta Air Lines",
    ticker: "DAL",
    semester: "Spring 2026",
    sequence: 13,
    strategy: "Bullish Broken Wing Butterfly",
    allIn: true,
    dateOpened: "2026-04-08", // earnings — March quarter 2026
    pnlDollars: 9200,
  },
  {
    slug: "asml-spring-2026-bull-call-spread",
    company: "ASML Holding",
    ticker: "ASML",
    semester: "Spring 2026",
    sequence: 14,
    strategy: "Bull Call Spread",
    allIn: true,
    dateOpened: "2026-04-15", // earnings — Q1 2026
    pnlDollars: 1925,
  },
  {
    // The sheet lists this fourth in the Spring block, but Exxon's only Spring
    // earnings dates are 2026-01-30 (before the semester's first trade) and
    // 2026-05-01. Placed on the May date; see README if the sheet order matters
    // more than the earnings date here.
    slug: "xom-spring-2026-bull-call-spread",
    company: "Exxon Mobil",
    ticker: "XOM",
    semester: "Spring 2026",
    sequence: 15,
    strategy: "Bull Call Spread",
    allIn: false,
    dateOpened: "2026-05-01", // earnings — Q1 2026
    pnlDollars: 5000,
  },
];
