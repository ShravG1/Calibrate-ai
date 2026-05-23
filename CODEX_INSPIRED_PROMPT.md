# Idlemode × Codex aesthetic — self-prompt

A working brief for the next pass on the Idlemode site. Captures what makes
openai.com/codex feel modern, then translates each move into a concrete change
to make here. Read this and execute — don't ask permission section by section.

---

## What's already done (the "zip action" pass)

- Brand swapped to **Idlemode**. Nav and footer now use the IDLE/MODE wordmark
  + the new sine-wave logo at `/public/idlemode-logo.svg`.
- Palette tokens remapped to the Idlemode brief:
  `--color-ink #060c18`, `--color-ink-soft #0a1220`, `--color-line #1a2540`,
  `--color-mist #ffffff`, `--color-mist-dim #4a6a8a`,
  `--color-electric #00ffcc` (teal), `--color-violet #0055ff` (electric blue).
- Display font is now **Syne 800**, body is **DM Sans 300–500**. Loaded via
  Google Fonts in `index.html`. `h1–h4` defaults to Syne.
- `text-gradient` utility re-coloured teal → blue per the logo gradient.
- `index.html` title, description, OG tags, theme-color rewritten.
- `package.json` renamed to `idlemode`.

Existing components still compile because token names were preserved — only the
values changed. From here, the work is layout/atmosphere, not search-replace.

---

## Codex page — what's actually doing the work

What I saw on openai.com/codex (the reference screenshot):

1. **Atmospheric hero background.** A soft purple-into-blue cloud-blur that
   bleeds full width. Not a mesh, not a grid — wisps. Feels weather-like.
   Restrained: one hue family, low saturation in the dark spots, high in the
   bright spots. Lots of negative space around it.
2. **Centred single-column hero, not left-aligned.** Icon → wordmark → one
   sentence → CTA pair → tiny availability footnote. That's it. Nothing else
   above the fold.
3. **One product icon mark, no wordmark in the hero.** The wordmark only
   appears in the nav. The hero leads with the icon as a logo-sized symbol
   (~80–96 px), then the wordmark is *the H1 itself* in oversized weight.
4. **Single primary CTA + a ghost secondary.** Black solid pill ("Download for
   macOS") next to a transparent pill with thin border ("Explore Codex for
   work"). Same height, same radius, different weight.
5. **A "thing exists" preview card below the fold.** A clean app-screenshot
   card with soft shadow, rounded corners, a fake window chrome (traffic
   lights), and a believable UI inside. Anchors abstraction in something
   concrete. This is the single biggest credibility move on the page.
6. **Nav is almost nothing.** Wordmark left, 4–5 plain text links centre, one
   pill CTA right. No dropdowns, no megamenu, no icons. Borderless until you
   scroll, then a hairline appears.
7. **Type does the heavy lifting, not effects.** Huge weight on the hero
   wordmark, generous line height on subtitle, body type is mid-weight grey.
   No drop shadows, no neon, no glows on text. Glow is reserved for one
   thing: the icon.
8. **Tiny footnote of trust below CTA.** "Available on macOS and Windows" in
   small mist-dim type. Reads like a fact, not a sell.

The vibe is: *quiet confidence, oversized type, one atmospheric backdrop, one
product artefact, nothing else*. The opposite of a SaaS landing page that
fights for attention with five gradients and animated counters.

---

## Translating that into Idlemode changes

### A. Hero (`src/components/Hero.jsx`, `src/components/MeshBackground.jsx`)

Goal: make the hero feel like Codex's hero, but with the Idlemode wave as the
hero artefact instead of a black pill app icon.

- Replace the current mesh background with a **cloud-blur backdrop**: two or
  three large radial-gradient blobs (teal `#00ffcc` and electric blue
  `#0055ff` at low alpha) blurred to 120–180 px, drifting slowly. Keep the
  page background `#060c18` showing through. Result: weather, not a grid.
- Centre the hero column. Drop `max-w-4xl` on the H1 in favour of
  `max-w-3xl mx-auto text-center`. Same for subtitle and CTAs.
- Promote the **sine-wave logo to a hero-sized mark**: render
  `/idlemode-logo.svg` at ~96 px above the H1, with a soft teal glow ring
  behind it (a single `box-shadow` or absolutely-positioned blurred disc).
- Rebuild the H1 hierarchy:
  - Tiny eyebrow chip (kept) — "Taking on three projects, completely free"
    with a pulsing teal dot. Centred.
  - Then a **two-line H1**, Syne 800, ~6.5–7.5 rem on desktop:
    line 1 "Automate the repetitive." line 2 "Focus on what grows your
    business." Use `text-gradient` only on the second line for a single hit
    of colour. Keep tracking tight (`-0.03em`).
  - Subtitle: one tight sentence, max-width prose, DM Sans 400, mist-dim.
    Suggested: "AI and automation for small UK businesses. We take the
    repetitive work off your plate so you can focus on actually growing."
- CTA pair, centred:
  - **Primary**: solid mist (white) pill, ink text, label "Get Your Free
    Project". Replaces the current gradient button on hero. The teal/blue
    gradient is too loud as the primary CTA — Codex uses pure black. We
    invert: pure white on near-black background. Reserve the gradient for
    accent moments only.
  - **Secondary**: transparent pill, 1 px `border-line`, mist text, label
    "See what we've built" → anchors to `#work`.
- Below the CTAs add the **availability footnote** styled like Codex's
  "Available on macOS and Windows": small DM Sans 400, mist-dim, e.g.
  "Currently taking on **2 of 3** free projects · UK businesses, 1–50 people".
- Remove the stats row from the hero if it's still there — Codex has none
  above the fold. Stats live in WhyAI instead.

### B. Hero artefact card (NEW — directly under the fold)

This is the highest-impact addition.

- Build a `HeroArtefact.jsx` component that renders a fake "Idlemode app"
  preview card immediately under the hero. Specs:
  - Card: `rounded-2xl`, `bg-ink-soft`, 1 px `border-line`, soft shadow
    `0 30px 80px -20px rgba(0,255,204,0.18)`.
  - Faux window chrome: three traffic-light dots (mute red/yellow/green),
    centred title bar text "Idlemode · Shift Manager", left sidebar with
    items "Dashboard / Shifts / Team / Reports".
  - Right pane: a believable mock — a dashboard with two stat tiles
    ("This week: 142 hrs", "Cover requests: 6") and a thin sparkline.
    All static SVG, no real data.
  - Sit the card on a soft teal glow disc behind it (atmospheric, same
    family as the hero blobs).
- This card answers "what does Idlemode actually look like?" without
  shipping a real product yet.

### C. Nav (`src/components/Nav.jsx`)

Already swapped to the IDLEMODE wordmark. Two small further moves:

- **Centre the link group** instead of having it sit left-of-CTA. Codex
  pattern: wordmark left, links absolutely-centred, CTA right.
- Replace primary CTA label "Let's talk" with "Get started" (matches the
  hero CTA verb) and keep it pill-shaped, solid mist.
- Drop the box-shadow / gradient on the logo container. The new logo is the
  art — don't wrap it in another graphic.

### D. Typography pass (global)

- Add `font-display` to every section heading (`h2`, `h3` inside
  Services/WhyAI/About/etc.). Should already inherit via base layer rules
  but verify after this pass.
- Bump H2 sizes — Codex feels big. Try `text-5xl sm:text-6xl` minimum for
  section headlines.
- Tighten letter-spacing on display headings to `-0.025em` to
  `-0.03em`.

### E. Section atmosphere

- Apply the same cloud-blur backdrop technique (very low alpha) as a single
  drifting blob *behind* one mid-page section — probably "The Offer" /
  pricing. Don't apply it everywhere. Codex uses it once, with intent.
- Section dividers: a single 1 px line at `--color-line`. No background
  changes between sections. Keep everything on ink.

### F. Colour discipline

- Teal (`#00ffcc`) and electric blue (`#0055ff`) are the **only** accent
  colours. Drop the violet/lilac stops from any remaining gradient
  utilities, reveal animations, or icons.
- The gradient should appear at most **three times** on the page: hero
  headline second line, the logo itself, and one final CTA flourish in the
  Contact section. Anywhere else, prefer flat mist or mist-dim.
- Replace any remaining `from-electric to-violet` Tailwind utilities with
  `from-electric to-electric-deep` or `from-electric to-violet` where
  `--color-violet` is now the electric blue — both legal, both on-brand.

### G. Final CTA section

- Make it visually echo the hero: centred, big Syne headline ("Ready to
  automate?"), one sentence, primary pill CTA to WhatsApp + secondary email
  link. No form. Add the only other big logo render here, smaller (~64 px),
  as a closing mark above the headline.

---

## Don't-dos

- Don't add stock photos.
- Don't add a video / lottie / animated illustration. Atmosphere is two
  blurred discs and good type.
- Don't ship more than the two accent colours. Resist the urge to add a
  warning-yellow or success-green anywhere.
- **Naming convention (overrides the original brief):** the site is going to
  friends & family first, so the founder's name is allowed in **one
  designated area only** — the About section, which now reads "Hi, I'm
  Shrav" with a "Shrav · founder of Idlemode" chip. Everywhere else stays
  brand-only ("Idlemode" / "we" / "the founder"). Don't sprinkle the name
  back into the hero, services, pricing, or footer. The WhatsApp prefilled
  message is the one other exception — that's a personal context.
- Don't break the existing GSAP hero intro timeline. Re-target the refs to
  the new centred elements.

---

## Order of operations when executing

1. Build the cloud-blur background utility (CSS or component).
2. Recompose the Hero JSX to centred single column + new H1 + CTA pair +
   availability footnote.
3. Build `HeroArtefact.jsx` and mount it directly under the Hero in
   `App.jsx`.
4. Re-centre the nav link group; swap primary CTA label.
5. Sweep utilities for stray violet/lilac usages and replace.
6. Final CTA section visual echo.
7. Re-test the GSAP intro timing — adjust if needed.
8. Verify on mobile (375 px) at every step. The single-column hero should
   already be a phone-shaped composition by default.
