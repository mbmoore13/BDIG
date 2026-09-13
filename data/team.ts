/**
 * The BDIG executive board.
 *
 * To add a headshot: save it as /public/team/<slug>.jpg — for example
 * /public/team/max-moore.jpg. The site picks it up automatically at build time;
 * no code change is needed. Until a photo exists, the tile renders a neutral
 * gray avatar with the member's initials. .jpeg, .png, and .webp also work.
 *
 * Bios follow the BDIG house style: hometown, then degree, then when they
 * joined, then the internship. The internship sentence is omitted entirely for
 * members who do not have one to list. See the README for the template.
 */

export interface TeamMember {
  /** URL-safe id. Doubles as the headshot filename: /public/team/<slug>.jpg */
  slug: string;
  /** Full name, as it should appear under the headshot. */
  name: string;
  /** Board title. e.g. "Chief Investment Officer" */
  title: string;
  /** Short bio shown in the member's modal. */
  bio: string;
}

/** Rendered in this order. */
export const team: TeamMember[] = [
  {
    slug: "max-moore",
    name: "Max Moore",
    title: "President",
    bio: "Originally from Charlottesville, Virginia, Max Moore is pursuing an Sc.B. in Applied Math-Economics at Brown University. Max joined BDIG in September 2024. He will intern with Jefferies as an investment banking analyst in Houston in Summer 2027.",
  },
  {
    slug: "matt-williamson",
    name: "Matt Williamson",
    title: "Chief Operating Officer",
    bio: "Originally from Seattle, Washington, Matt Williamson is pursuing an Sc.B. in Applied Math-Economics at Brown University. Matt joined BDIG in September 2023. He interned with Oppenheimer in their Tech M&A group in New York City last summer.",
  },
  {
    slug: "connor-wickerham",
    name: "Connor Wickerham",
    title: "Chief Operating Officer",
    bio: "Originally from Charlotte, North Carolina, Connor Wickerham is pursuing an Sc.B. in Applied Math-Economics at Brown University. Connor joined BDIG in September 2025.",
  },
  {
    slug: "liam-kearns",
    name: "Liam Kearns",
    title: "Chief Education Officer",
    bio: "Originally from Montclair, New Jersey, Liam Kearns is pursuing Sc.B. degrees in Applied Math-Economics and Computer Science at Brown University. Liam joined BDIG in September 2023. He interned with Stevens Capital Management as a quant last summer.",
  },
  {
    slug: "christian-duetoft",
    name: "Christian Duetoft",
    title: "Chief Education Officer",
    bio: "Originally from London, England, Christian Duetoft is pursuing an Sc.B. in Applied Math-Economics at Brown University. Christian joined BDIG in September 2024. He will intern with PJT as an investment banking analyst in New York City in Summer 2027.",
  },
  {
    slug: "caden-blamer",
    name: "Caden Blamer",
    title: "Chief Macroeconomist",
    bio: "Originally from Columbus, Ohio, Caden Blamer is pursuing an Sc.B. in Applied Math-Economics at Brown University. Caden joined BDIG in September 2025.",
  },
  {
    slug: "sania-shareef",
    name: "Sania Shareef",
    title: "Chief Investment Officer",
    bio: "Originally from New York City, Sania Shareef is pursuing an Sc.B. in Applied Math-Economics at Brown University. Sania joined BDIG in September 2025.",
  },
  {
    slug: "james-kershaw",
    name: "James Kershaw",
    title: "Chief Technology Officer",
    bio: "Originally from Boulder, Colorado, James Kershaw is pursuing an Sc.B. in Applied Math-Economics and an A.B. in Public Health at Brown University. James joined BDIG in September 2024.",
  },
];
