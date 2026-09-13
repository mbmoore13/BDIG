export interface NavLink {
  href: string;
  label: string;
}

export const site = {
  name: "Brown Derivatives Investment Group",
  shortName: "BDIG",
  email: "bdig@brown.edu",
  description:
    "Brown Derivatives Investment Group is a Brown University student club demystifying derivatives through hands-on trading with $138k in simulated assets under management.",
  url: "https://bdig.vercel.app",
} as const;

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/mission", label: "Mission" },
  { href: "/deals", label: "Deals" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];
