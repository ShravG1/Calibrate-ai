# Calibrate — Code Review Findings

Audit date: 2026-05-25, against `main` at `2855838` (pre-Phase 3 first cut).

Severity tags: **Critical** (broken / security / a11y blocker) — **Major** (real but not blocking) — **Minor** (clean-up) — **Nit** (cosmetic).

Findings the audit fixed in-commit are marked **[FIXED]**. Everything else is for the morning review.

---

## Critical

_None._

---

## Major

### M1 — No automated tests
The codebase has no test runner, no unit tests, no smoke tests. Manual QA only. Low blast radius today (single-page site, no business logic) but as scope grows this becomes a real risk for regressions in any motion system.

**Suggested:** Add Playwright with one smoke test (`page loads`, `hero CTA reachable`, `services pin doesn't trap scroll`). One file, one config, ~30 minutes of work.

### M2 — Contact form opens user's mail client (mailto:)
`Contact.jsx:32-45` builds a `mailto:` URL with user-supplied name / business / message values and navigates the window to it. Two concerns:
1. **UX**: Many users (mobile especially) don't have a configured mail client; the link silently fails for them.
2. **Spam exposure**: The email address sits in client-side JS as plain text. Easy to scrape.

User input is properly `encodeURIComponent`'d so there's no injection vector — but the architectural choice is worth revisiting once the project has volume. A serverless form-to-email function (Cloudflare Workers, Vercel Functions) would solve both.

### M3 — No error boundaries
Any render error in a section component crashes the whole tree. For a marketing site that's acceptable for now; long-term an `<ErrorBoundary>` wrapping `<main>` with a fallback that just shows the page below the hero would protect against a single broken section nuking everything.

---

## Minor

### m1 — Multiple GSAP plugin registrations
`gsap.registerPlugin(ScrollTrigger, SplitText)` is called in seven different files (Contact, About, CaseStudies, Pricing, WhyAI, Services-related hooks, `useHeroIntro`). Registration is idempotent so it's harmless, but a single call in `main.jsx` would be cleaner and easier to audit.

### m2 — `MeshBackground.jsx` retained as dead code on desktop
After Phase 3 ships, the desktop path uses `HeroShaderBackground`; `MeshBackground` only runs on reduced-motion / mobile. Intentional (fallback) but worth documenting in the component header — without context, a future reader might assume it's stale.

### m3 — `claude-artifact.html` at repo root
~90 KB single-file mirror of the site, left over from earlier visual editing. Untracked. The user has flagged it for morning review; leaving alone overnight per their instruction. Either commit it as an artifact or delete it once they've decided.

### m4 — `WHAT-IS-THIS.txt` at repo root
Untracked breadcrumb file. Left alone per overnight constraints. Decide morning.

---

## Nit

### n1 — Inline-SVG lockup duplicated across Nav + Footer
`Nav.jsx` and `Footer.jsx` each define a `CalibrateWordmark` / `CalibrateLockup` SVG inline. They share most of their gradients + filters. Could be hoisted to one component. Not urgent — they have different sizes and slightly different decoration.

### n2 — `--color-violet` token holds an electric-blue value
`#0055ff` in a token named `violet` is mildly confusing. Renaming the token is a wide-blast-radius change (Tailwind classes everywhere use `text-violet` / `bg-violet`). Document and move on.

### n3 — `<a>` elements styled as buttons
The Nav "Let's talk" pill and the hero/pricing CTAs are `<a>` elements styled as buttons. Semantically fine for navigation (they jump to `#contact`), but the focus ring is a default browser style. Could add an explicit `focus-visible:` ring class for keyboard polish.

### n4 — `cursor: none !important` on every descendant
`index.css:42-48` applies `cursor: none` to `html.cursor-none, html.cursor-none body, html.cursor-none *, ::before, ::after`. The wildcard `*` covers descendants — the explicit listing is defence-in-depth against inline cursor styles. Intentional, but could be reduced to `html.cursor-none, html.cursor-none *` without losing coverage.

---

## Items the agent flagged that this audit reviewed and rejected

For transparency about what was _not_ acted on:

- **"Services.jsx improper JSX formatting"** — The agent flagged the `return ( <article> )` style around line 53. The structure is valid JSX inside a `.map(...)` callback. ESLint passes. Non-issue.
- **"`useAura` called inside `useEntranceTimeline`'s build phase"** — The agent misread the Contact component. `useAura` is called at component-body level (line 62), then `useEntranceTimeline` (line 64). They're sequential hook calls, not nested. Non-issue.
- **"AuraCanvas setState in render"** — `if (active && !mounted) setMounted(true)` is the React-recommended pattern for sticky derived state (see React docs on "storing info from previous props"). The setState triggers a synchronous re-render. Already commented in source. Non-issue.
- **"`getBoundingClientRect` in rAF loop"** — 4 magnetic-target elements × 60Hz = 240 calls/sec. Forced layout reads are cheap at this scale. Already discussed in commit history. Non-issue at current scale.
- **"`useServicesPin.js` dummy tween needs a comment"** — Already commented at line 134-135: _"Lock the timeline length so each card — especially the last — gets the full dwell of its beat before progress reaches 1."_ Agent missed the existing comment. No fix needed.

---

## Fixed in this commit

- **[FIXED] `Contact.jsx:253`** — `target="_blank"` link to WhatsApp had `rel="noreferrer"` only. Modern browsers treat `noreferrer` as implying `noopener`, but defence-in-depth is cheap: changed to `rel="noreferrer noopener"`.

That's the entire in-commit fix list. The agent's other suggestions either reviewed as non-issues or were major enough to warrant their own commit + decision.

---

## Recommended next steps (when you want to act on this)

1. **Quick win (~10 min):** Centralise `gsap.registerPlugin` in `main.jsx` and strip the per-file calls. Cosmetic but improves audit clarity.
2. **Medium (~30 min):** Add Playwright smoke test (one file, three assertions).
3. **Bigger (~2 hours):** Move Contact form off `mailto:` to a serverless function. Drops the spam exposure and improves mobile UX.
4. **Long-term:** SEO surfaces (`sitemap.xml`, `robots.txt`, JSON-LD). Not urgent for a single-page site but trivial when you're ready.
