import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import { navLinks, site } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line bg-paper-warm">
      <Container className="py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Link href="/" aria-label={`${site.name} — home`}>
              <Image
                src="/banner-white.png"
                alt={site.name}
                width={472}
                height={80}
                className="h-8 w-auto"
              />
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 inline-block text-sm text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-brown hover:decoration-brown"
            >
              {site.email}
            </a>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-soft transition-colors hover:text-brown"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <hr className="rule my-10" />

        <p className="max-w-3xl text-xs leading-relaxed text-muted">
          &copy; {year} Brown Derivatives Investment Group. Simulated trading for
          educational purposes only. Nothing on this site is investment advice.
        </p>
      </Container>
    </footer>
  );
}
