import Link from "next/link";
import type { Trade } from "@/data/trades";
import { formatDate } from "@/lib/format";

/**
 * The whole card is clickable, but the click target is a real button (or link)
 * wrapping only text, stretched over the card with an ::after overlay. That
 * keeps the company name a heading instead of burying it in a <button>.
 */
const TRIGGER_CLASS =
  "cursor-pointer transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-brown";

export default function TradeCard({
  trade,
  onOpen,
  href,
}: {
  trade: Trade;
  onOpen?: () => void;
  href?: string;
}) {
  const label = `${trade.company} — ${trade.strategy}, ${formatDate(trade.dateOpened)}. View trade details.`;

  return (
    <article className="group relative flex h-full w-full flex-col items-center justify-center border border-line bg-paper px-6 py-12 text-center transition duration-300 hover:-translate-y-0.5 hover:border-brown/35 hover:shadow-[0_6px_28px_rgba(23,19,16,0.07)] focus-within:border-brown/35">
      <h3 className="font-display text-2xl leading-tight tracking-tight text-ink">
        {href ? (
          <Link href={href} aria-label={label} className={TRIGGER_CLASS}>
            {trade.company}
          </Link>
        ) : (
          <button
            type="button"
            onClick={onOpen}
            aria-label={label}
            className={TRIGGER_CLASS}
          >
            {trade.company}
          </button>
        )}
      </h3>

      <p className="mt-5 text-xs tracking-wide text-muted">
        {formatDate(trade.dateOpened)}
      </p>
    </article>
  );
}
