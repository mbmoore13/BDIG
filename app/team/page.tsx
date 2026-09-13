import type { Metadata } from "next";
import Container from "@/components/Container";
import TeamGrid from "@/components/TeamGrid";
import { team } from "@/data/team";
import { findPublicAsset } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The executive board of the Brown Derivatives Investment Group.",
};

export default function TeamPage() {
  // A headshot dropped at /public/team/<slug>.jpg is picked up here at build
  // time — no code change required.
  const entries = team.map((member) => ({
    member,
    photoSrc: findPublicAsset("team", member.slug),
  }));

  return (
    <>
      <Container className="pb-12 pt-16 sm:pt-24">
        <p className="section-label mb-5">Team</p>
        <h1 className="max-w-3xl font-display text-4xl leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-6xl">
          The executive board.
        </h1>
        <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft">
          BDIG is led by eight students who set the curriculum, run the weekly
          pitch sessions, and manage the book. Select any member to read more.
        </p>
      </Container>

      <Container>
        <hr className="rule" />
      </Container>

      <Container className="py-16 sm:py-20">
        <TeamGrid entries={entries} />
      </Container>
    </>
  );
}
