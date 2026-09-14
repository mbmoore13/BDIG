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
        The hero image carries the club name and mission as part of the artwork,
        so it is shown whole rather than cropped to fill a fixed height — any
        crop would cut into that text. Its soft edges are meant to dissolve into
        the page, so it sits on the paper background with no overlay. The
        headline stays in the markup for search engines and screen readers.
      */}
      <section className="w-full bg-paper">
        <h1 className="sr-only">{heroHeadline}</h1>
        <Image
          src="/campus-hero.jpg"
          alt="Brown Derivatives Investment Group. To develop exceptional investors and leaders by providing real-world experience in derivatives, fostering critical thinking, and building a collaborative community at Brown."
          width={1536}
          height={1024}
          priority
          sizes="100vw"
          className="mx-auto block h-auto w-full max-w-[1600px]"
        />
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
