"use client";

import { useId, useState } from "react";
import Avatar from "./Avatar";
import Modal from "./Modal";
import type { TeamMember } from "@/data/team";

export interface TeamEntry {
  member: TeamMember;
  /** Resolved at build time from /public/team; null renders initials instead. */
  photoSrc: string | null;
}

export default function TeamGrid({ entries }: { entries: TeamEntry[] }) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const headingId = useId();

  const selected = entries.find((entry) => entry.member.slug === selectedSlug);

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
        {entries.map(({ member, photoSrc }) => (
          <li
            key={member.slug}
            className="group relative flex flex-col items-center text-center"
          >
            <div className="w-full transition duration-300 group-hover:-translate-y-1">
              <Avatar
                src={photoSrc}
                name={member.name}
                sizes="(min-width: 1024px) 220px, (min-width: 640px) 28vw, 42vw"
                className="ring-1 ring-line transition duration-300 group-hover:ring-brown/35"
              />
            </div>
            <h3 className="mt-5 font-display text-lg tracking-tight text-ink">
              <button
                type="button"
                onClick={() => setSelectedSlug(member.slug)}
                aria-label={`${member.name}, ${member.title}. Read bio.`}
                className="cursor-pointer transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-brown"
              >
                {member.name}
              </button>
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              {member.title}
            </p>
          </li>
        ))}
      </ul>

      <Modal
        open={Boolean(selected)}
        onClose={() => setSelectedSlug(null)}
        labelledBy={headingId}
      >
        {selected ? (
          <article className="px-7 py-9 sm:px-10 sm:py-11">
            <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:gap-8 sm:text-left">
              <div className="w-28 shrink-0 sm:w-32">
                <Avatar
                  src={selected.photoSrc}
                  name={selected.member.name}
                  sizes="128px"
                  className="ring-1 ring-line"
                />
              </div>

              <div className="mt-5 sm:mt-1">
                <h2
                  id={headingId}
                  className="font-display text-2xl tracking-tight text-ink sm:text-3xl"
                >
                  {selected.member.name}
                </h2>
                <p className="section-label mt-2.5">{selected.member.title}</p>
                <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {selected.member.bio}
                </p>
              </div>
            </div>
          </article>
        ) : null}
      </Modal>
    </>
  );
}
