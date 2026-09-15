import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { site } from "@/data/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    siteName: site.name,
    type: "website",
  },
  icons: {
    icon: "/box-brown.png",
    apple: "/box-brown.png",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  email: site.email,
  description: site.description,
  logo: `${site.url}/banner-white.png`,
  foundingLocation: {
    "@type": "Place",
    name: "Brown University, Providence, Rhode Island",
  },
  parentOrganization: {
    "@type": "CollegeOrUniversity",
    name: "Brown University",
    url: "https://www.brown.edu",
  },
  location: {
    "@type": "Place",
    name: "Friedman Hall, Room 202",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Brown University",
      addressLocality: "Providence",
      addressRegion: "RI",
      postalCode: "02912",
      addressCountry: "US",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${cormorant.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        {/*
          Tells search engines that "BDIG" and the full name are the same
          organisation, and ties it to Brown. This is what lets a search for the
          acronym resolve to the club rather than to something unrelated.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-brown focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
