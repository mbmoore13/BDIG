import type { Metadata } from "next";
import Container from "@/components/Container";
import TradesExplorer from "@/components/TradesExplorer";
import { trades } from "@/data/trades";
import { cumulativeRealizedPnl } from "@/lib/pnl";

export const metadata: Metadata = {
  title: "Deals",
  description:
    "The full BDIG trade archive: strategy, capital deployed, and realized P&L for every position taken with our simulated book.",
};

export default function DealsPage() {
  const chartData = cumulativeRealizedPnl(trades);

  return (
    <>
      <Container className="pb-12 pt-16 sm:pt-24">
        <p className="section-label mb-5">Deals</p>
        <h1 className="max-w-3xl font-display text-4xl leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-6xl">
          Every position we have taken.
        </h1>
        <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft">
          BDIG publishes its full trade archive — the winners and the losers.
          Every position is pitched around an earnings report and logged once it
          is closed. Select any trade to see the structure, the capital
          committed, and the result.
        </p>
      </Container>

      <Container>
        <hr className="rule" />
      </Container>

      <Container className="py-16 sm:py-20">
        <TradesExplorer trades={trades} chartData={chartData} />
      </Container>
    </>
  );
}
