import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TradeCard from "@/components/TradeCard";
import { heroHeadline, whoWeAre } from "@/data/home";
import { site } from "@/data/site";
import { stats } from "@/data/stats";
import { trades } from "@/data/trades";

export const metadata: Metadata = {
  // Spelled out rather than just "Home": a title template does not apply to the
  // segment that defines it, so the root page never picks up the layout's
  // "%s | ..." suffix the way /team and /deals do.
  title: `Home | ${site.name}`,
};

export default function HomePage() {
  const recent = [...trades]
    .sort((a, b) => b.sequence - a.sequence)
    .slice(0, 3);

  return (
    <>
      {/*
        The source photo is small, so it is upscaled and deliberately sits
        behind a dark gradient: at hero size the softness reads as depth of
        field rather than a stretched image. The headline is real text in the
        display serif — it stays sharp at any size, unlike type baked into
        artwork.
      */}
      <section className="relative flex h-[62vh] min-h-[420px] w-full items-end overflow-hidden">
        <Image
          src="/campus-hero.jpg"
          alt="Brown University's campus at dusk in autumn, seen from above"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#171310]/85 via-[#171310]/45 to-[#171310]/20"
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
