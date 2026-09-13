import type { Metadata } from "next";
import type { ReactNode } from "react";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { contactParagraphs, meeting } from "@/data/contact";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "BDIG convenes weekly on Tuesday at 8:00 p.m. in Friedman 202. Anyone attending weekly sessions is automatically a General Body member.",
};

/** Turns any mention of the club email inside body copy into a mailto link. */
function linkifyEmail(text: string): ReactNode {
  const segments = text.split(site.email);
  if (segments.length === 1) return text;

  return segments.map((segment, index) => (
    <span key={index}>
      {index > 0 ? (
        <a
          href={`mailto:${site.email}`}
          className="text-brown underline decoration-line underline-offset-4 transition-colors hover:decoration-brown"
        >
          {site.email}
        </a>
      ) : null}
      {segment}
    </span>
  ));
}

export default function ContactPage() {
  return (
    <>
      <Container className="pb-12 pt-16 sm:pt-24">
        <p className="section-label mb-5">Contact</p>
        <h1 className="max-w-3xl font-display text-4xl leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-6xl">
          Come to a meeting.
        </h1>
      </Container>

      <Container>
        <hr className="rule" />
      </Container>

      <Container className="py-16 sm:py-20">
        <div className="grid gap-14 md:grid-cols-[1fr_320px] md:gap-20">
          <div className="flex flex-col gap-6">
            {contactParagraphs.map((paragraph, index) => (
              <Reveal key={index} delay={index * 80}>
                <p className="max-w-2xl text-[1.0625rem] leading-[1.75] text-ink-soft">
                  {linkifyEmail(paragraph)}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="flex flex-col gap-10">
              <section>
                <h2 className="section-label mb-4">{meeting.heading}</h2>
                <address className="not-italic text-[0.9375rem] leading-[1.8] text-ink">
                  {meeting.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <p className="mt-4 text-[0.9375rem] text-ink-soft">
                  {meeting.when}
                </p>
              </section>

              <hr className="rule" />

              <section>
                <h2 className="section-label mb-4">Email</h2>
                <a
                  href={`mailto:${site.email}`}
                  className="text-[0.9375rem] text-brown underline decoration-line underline-offset-4 transition-colors hover:decoration-brown"
                >
                  {site.email}
                </a>
              </section>
            </div>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
