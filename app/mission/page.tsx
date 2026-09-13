import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { missionParagraphs } from "@/data/mission";

export const metadata: Metadata = {
  title: "Mission",
  description:
    "BDIG exists to demystify derivatives and make them accessible to Brown students through hands-on trading with simulated capital, weekly pitch sessions, and peer-led education.",
};

export default function MissionPage() {
  return (
    <>
      <Container className="pb-12 pt-16 sm:pt-24">
        <p className="section-label mb-5">Mission</p>
        <h1 className="max-w-3xl font-display text-4xl leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-6xl">
          Making derivatives legible, one position at a time.
        </h1>
      </Container>

      <Container>
        <hr className="rule" />
      </Container>

      <Container className="py-16 sm:py-20">
        <div className="grid gap-14 md:grid-cols-[1fr_260px] md:gap-20">
          <div className="flex flex-col gap-6">
            {missionParagraphs.map((paragraph, index) => (
              <Reveal key={index} delay={index * 90}>
                <p className="max-w-2xl text-[1.0625rem] leading-[1.75] text-ink-soft">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="md:pt-2">
            <Image
              src="/box-brown.png"
              alt=""
              width={520}
              height={520}
              aria-hidden="true"
              className="mx-auto w-40 md:mx-0 md:w-full"
            />
            <p className="mt-6 text-center text-xs leading-relaxed text-muted md:text-left">
              Brown Derivatives Investment Group
              <br />
              Founded at Brown University
            </p>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
