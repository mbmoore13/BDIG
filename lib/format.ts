const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Dates are formatted by hand rather than through `new Date()` so that the
 * server and the browser always produce the same string regardless of the
 * viewer's time zone. Hydration mismatches here are easy to cause and hard to
 * spot.
 */
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}

/** Compact axis/tooltip form. e.g. "Apr 2026" */
export function formatMonthYear(iso: string): string {
  const [year, month] = iso.split("-").map(Number);
  return `${MONTHS[month - 1].slice(0, 3)} ${year}`;
}

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatCurrency(value: number): string {
  return usd.format(value);
}

/** Always carries an explicit + or −, for P&L figures. */
export function formatSignedCurrency(value: number): string {
  const sign = value < 0 ? "−" : "+";
  return `${sign}${usd.format(Math.abs(value))}`;
}

export function formatSignedPercent(value: number): string {
  const sign = value < 0 ? "−" : "+";
  return `${sign}${Math.abs(value).toFixed(1)}%`;
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}
