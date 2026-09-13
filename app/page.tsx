import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TradeCard from "@/components/TradeCard";
import { heroHeadline, whoWeAre } from "@/data/home";
import { stats } from "@/data/stats";
import { trades } from "@/data/trades";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  const recent = [...trades]
    .sort((a, b) => b.sequence - a.sequence)
    .slice(0, 3);

  return (
    <>
      <section className="relative flex h-[72vh] min-h-[440px] w-full items-end overflow-hidden">
        <Image
          src="/tradingdesk.jpg"
          alt="The BDIG trading desk during a weekly session"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#171310]/80 via-[#171310]/35 to-[#171310]/10"
        />
        <Container className="relative pb-14 sm:pb-20">
          <h1 className="max-w-4xl font-display text-[2.5rem] leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {heroHeadline}
          </h1>
        </Container>
      </section>

      <Container className="py-20 sm:py-28">
        <Reveal>
          <SectionHeading label="Who We Are" title="A club built on curiosity." />
        </Reveal>

        <div className="mt-10 grid gap-x-14 gap-y-6 md:grid-cols-2">
          {whoWeAre.map((paragraph, index) => (
            <Reveal key={index} delay={index * 90}>
              <p className="text-[1.0625rem] leading-[1.75] text-ink-soft">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>

      <Container>
        <hr className="rule" />
      </Container>

      <Container className="py-20 sm:py-24">
        <Reveal>
          <dl className="grid grid-cols-1 gap-12 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-5xl tracking-tight text-brown sm:text-6xl">
                    {stat.value}
                  </span>
                  <span className="mt-3 block text-sm text-muted">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>

      <Container>
        <hr className="rule" />
      </Container>

      <Container className="py-20 sm:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading label="Recent Activity" title="Latest trades." />
            <Link
              href="/deals"
              className="text-sm tracking-wide text-brown underline decoration-line underline-offset-4 transition-colors hover:decoration-brown"
            >
              View the full archive
            </Link>
          </div>
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recent.map((trade, index) => (
            <li key={trade.slug} className="flex">
              <Reveal delay={index * 90} className="flex w-full">
                <TradeCard trade={trade} href="/deals" />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
