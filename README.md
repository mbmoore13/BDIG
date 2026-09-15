# Brown Derivatives Investment Group

Marketing site for BDIG, a Brown University student club trading derivatives with
$138k in simulated assets under management.

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Recharts. No CMS — every
piece of editable content is a typed file in [`/data`](./data).

## Running it

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

```bash
npm run build   # production build
npm start       # serve the production build
```

## Deploying to Vercel

Import the repository at [vercel.com/new](https://vercel.com/new). Vercel detects
Next.js and needs no configuration. There are no environment variables.

One thing to update before launch: `url` in [`/data/site.ts`](./data/site.ts) is
set to a placeholder. Point it at the real domain so page metadata and social
previews resolve correctly.

## Where the content lives

| File | Controls |
| --- | --- |
| [`data/trades.ts`](./data/trades.ts) | The Trades archive and the P&L chart |
| [`data/team.ts`](./data/team.ts) | The Team grid and bio modals |
| [`data/stats.ts`](./data/stats.ts) | The three-figure strip on Home |
| [`data/home.ts`](./data/home.ts) | Hero headline and "Who We Are" copy |
| [`data/mission.ts`](./data/mission.ts) | Mission page copy |
| [`data/contact.ts`](./data/contact.ts) | Contact page copy and the address block |
| [`data/site.ts`](./data/site.ts) | Club name, email, nav links, site URL |

---

## How to add a trade

Open [`data/trades.ts`](./data/trades.ts) and append one object to the `trades`
array, giving it the next `sequence` number. That is the whole process — the
grid, the semester filter, the sort control, and the cumulative P&L chart all
read from this one array.

**Only nine fields are required.** Everything else is optional; the detail modal
renders whatever is present and silently skips the rest, so a trade the sheet
recorded little about still looks finished.

```ts
{
  slug: "msft-spring-2026-put-spread",  // unique, URL-safe
  company: "Microsoft Corporation",     // shown on the card
  ticker: "MSFT",
  semester: "Spring 2026",
  sequence: 16,                         // next number in the book
  strategy: "Bear Put Debit Spread",
  allIn: false,
  dateOpened: "2026-04-23",             // the earnings date we traded into
  pnlDollars: -1840,                    // negative for a loss
}
```

**Optional fields**, added whenever the sheet has them: `dateClosed`,
`expiration`, `contracts`, `strikes`, `capitalDeployed`, `creditReceived`,
`maxProfit`, `maxLoss`, `breakeven`, `entryPrice`, `exitPrice`, `moneyness`,
`pnlPercent`, and `notes`.

Adding a new `semester` string automatically adds it to the filter row, ordered
by when the book first traded in it.

**Notes**

- Dates must be `YYYY-MM-DD`. They are formatted without `Date` parsing so the
  server and browser always agree.
- **`sequence` is what orders everything**, not dates. It is the order the
  semester sheets stepped the book through, which is what the running portfolio
  value reconciles against. The chart and the sort control both use it.
- The card shows the company name and the trade date. Everything else appears
  on click.
- P&L is colored green when positive and red when negative in the detail modal.
- The chart hides itself until there are at least two trades.
- Every trade in the archive is a closed position. The club logs a trade only
  after closing it, so there is no "open" state anywhere in the data or the UI.

---

## How to add a headshot

Save the photo to `public/team/` named after the member's `slug` from
[`data/team.ts`](./data/team.ts):

```
public/team/max-moore.jpg
public/team/sania-shareef.jpg
```

No code change is needed. The site checks for the file at build time and swaps
it in; until then the tile shows a neutral gray avatar with the member's
initials. `.jpg`, `.jpeg`, `.png`, and `.webp` all work.

Square images look best — they are cropped to a circle. Roughly 600×600 is
plenty.

### Cropping phone screenshots

If all you have is a screenshot of someone's profile photo — black letterbox,
status bar, app buttons, and the photo as a circle in the middle — there is a
script for that:

```bash
node scripts/crop-headshots.mjs <folder-of-screenshots>
```

It finds the circle in each image, crops a square to it, resizes to 800×800, and
writes the result into `public/team/`. **Name each input file after the member's
slug first** (`max-moore.png`), because the output keeps the name — that is what
puts the right face under the right person.

Pass a second argument to write somewhere else, e.g. a staging folder you want
to check before copying in:

```bash
node scripts/crop-headshots.mjs ~/Desktop/shots ./tmp-headshots
```

To add a new board member, append an object to the `team` array in
[`data/team.ts`](./data/team.ts). The grid renders members in array order.

---

## How to update a bio

Edit the `bio` string for that person in [`data/team.ts`](./data/team.ts) and
delete the `// TODO` comment above it.

Unwritten bios ship as placeholders in the BDIG house style, with the fields to
fill in marked by brackets:

> Originally from **[Hometown]**, **[Full name]** is pursuing an
> **[A.B./Sc.B.]** in **[Concentration]** at Brown University. **[First name]**
> joined BDIG in **[Month Year]**. Prior to joining BDIG, **[he/she/they]**
> interned with **[Firm]** in **[City]**.

Keep the sentence order — hometown, then BDIG, then internship — so the page
reads consistently. Full name on first reference, first name only on the second.
Replace `[he/she/they]` with the pronoun that person uses.

Two notes on the degree and the internship:

- Brown awards the **A.B.** and the **Sc.B.**, not a B.A. Pick whichever matches
  the concentration. Both read correctly after "an".
- The last sentence assumes a *past* internship. For an upcoming one, drop the
  "Prior to joining BDIG" clause and write it forward-looking instead — e.g.
  "He will intern with the Jefferies M&A group in Summer 2027." Name the season
  and year rather than "this summer", which goes stale.

---

## Project layout

```
app/              Routes (App Router). One folder per page.
components/       Shared UI. Client components are marked "use client".
data/             All editable content. Typed. No CMS.
lib/              Formatting, P&L math, build-time asset lookup.
public/           Static assets.
  team/           Headshots, named by member slug.
```

### A few conventions

- **Design tokens** live in the `@theme` block at the top of
  [`app/globals.css`](./app/globals.css). Tailwind v4 generates utilities from
  them, so `--color-brown` gives you `text-brown`, `bg-brown`, `border-brown`.
  There is no `tailwind.config.ts` — v4 configures from CSS.
- **Modals** (trade details, team bios) share
  [`components/Modal.tsx`](./components/Modal.tsx): Escape closes, Tab is
  trapped inside, and focus returns to the element that opened it.
- **Fade-in on scroll** is [`components/Reveal.tsx`](./components/Reveal.tsx).
  It respects `prefers-reduced-motion`.
- **Headshots** are resolved by [`lib/assets.ts`](./lib/assets.ts), which checks
  `/public` on the server at build time. This is what makes them drop-in. After
  adding a file locally, restart `npm run dev` to pick it up.

### Deal cards use names, not logos

Trade cards show the company name set in the display serif rather than a company
logo. This is deliberate: third-party logos carry trademark and usage-rights
questions that a public club site is better off not inheriting.
