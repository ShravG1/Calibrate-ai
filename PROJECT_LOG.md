# Calibrate — Project Log

Last updated: 2026-05-25 (overnight audit + Phase 3 first cut)

This file is the canonical orientation document. Read it before changing anything.

---

## 1. Brand

- **Name:** Calibrate
- **Tagline:** _Less admin. More momentum._
- **Pitch:** AI and automation for small UK businesses — built by a real person, priced honestly, no agency overhead.
- **Tone:** UK English. Plain, direct. No jargon. Avoid hype.

### Palette (locked)

| Token | Hex | Purpose |
|---|---|---|
| `--color-ink` | `#060c18` | page background |
| `--color-ink-soft` | `#0a1220` | surface / card |
| `--color-ink-card` | `#0f1830` | raised surface |
| `--color-line` | `#1a2540` | borders |
| `--color-mist` | `#ffffff` | primary text |
| `--color-mist-dim` | `#4a6a8a` | secondary text |
| `--color-electric` | `#00ffcc` | accent teal |
| `--color-electric-deep` | `#00d9ad` | hover/pressed teal |
| `--color-violet` | `#0055ff` | accent blue (note: variable named `violet`, value is blue) |

Auxiliary brand colour (used only in WebGL shaders + gradients): `#00aaff` (sky).

### Typography

- **Switzer** (Fontshare) — display headings (h1–h4), 500/600/700. Also used wherever the `font-display` utility is applied.
- **DM Sans** (Google) — body text. 300/400/500/600/700, optical-size 9–40.
- **Plus Jakarta Sans** 700 — **only** inside the SVG wordmark / lockup. Don't extend.

Fonts are preconnected in `index.html` (`fonts.gstatic.com`, `cdn.fontshare.com`).

---

## 2. Domain + deploy

- **Production:** [calibrate-ai.uk](https://calibrate-ai.uk) via Vercel.
- **Vercel project** auto-deploys on push to `origin main` (the Calibrate-ai repo).
- **DNS** sits at Squarespace: `A @ → 76.76.21.21`, `CNAME www → cname.vercel-dns.com`.
- **Brand inbox:** `calibrate.ai.uk@gmail.com` — the single contact route used by `data.jsx`, Footer, Contact form mailto handler, and Contact success-state copy.
- **Repo:** `github.com/ShravG1/Calibrate-ai` (`origin`). Old monorepo remote retained as `lun-old` for archaeology only — never push there.

---

## 3. Roadmap — completed

| Phase | Summary |
|---|---|
| **Phase 1** | Lenis smooth-scroll + GSAP ScrollTrigger plumbing. `useLenis` hook wires `lenis.on('scroll', ScrollTrigger.update)` so all subsequent ScrollTrigger work composes cleanly. Anchor links honour an 80px nav offset. |
| **Phase 1.5** | Custom cursor — "asteroid streak". A 1.5px-amplitude sine-wave SVG path traces the last ~10 pointer positions; head morphs to a ring on hover over interactive targets. Hidden on coarse-pointer / touch devices. |
| **Calibrate rebrand** | Replaced the Idlemode visual identity end-to-end. New SVG assets (icon / wordmark / lockup), copy rewrite, palette + type lockdown, services interaction. |
| **Phase 2A — Services pin** | Replaced click-to-expand grid with a GSAP ScrollTrigger pin. Six service cards, ~140vh of scroll dwell per beat. Floating brand-coloured icons, category eyebrows (`01 OF 06 · OPERATIONS`), horizontal slide between cards. Outgoing card opacity uses `power4.in` so it stays readable until late in the transition. Mobile (<md) and reduced-motion fall back to a stacked `Reveal`-wrapped list. |
| **Phase 2B — Background depth** | `MeshBackground` widened parallax differentials (foreground ~3× background), added scroll-linked scale + rotation per blob, moved the grain texture outside the scale layer so it stays pixel-pinned. Hue-shift idea was implemented and removed (felt washed-out). |
| **Phase 2C — Per-section choreography** | Bespoke entrance animations per section, all gated at `top 80%`, all reduced-motion bypassed. Why AI light (SplitText words). Pricing 3-batch verdict (headline split on periods, batched with `expo.out`). Case Studies quick stagger. About light (portrait → headline → paragraphs → chip cascade). **Contact "overkill"**: char-by-char blur-in headline, typewriter subhead, form-field cascade, submit-button yoyo glow pulse, mesh background scrubbed scale 1 → 1.15 across the Contact section. |
| **Phase 2D — Magnetic cursor field** | Cursor drifts toward primary CTAs (max 18px offset, 100px range, quadratic falloff). Visible head + trail translate together so the cursor stays connected. Composes with `MagneticButton`'s button-pulls-to-cursor effect — they meet in the middle. Opt-in via `data-cursor-magnetic="true"`. |
| **Phase 2E — Button aura (pivot)** | Started as stacked CSS conic / blob / streak layers; pivoted to a WebGL plasma shader (R3F + custom GLSL). Three.js bundle is lazy-loaded via `React.lazy` — the ~236 KB gzipped chunk only downloads after a user first hovers a gradient CTA. Domain-warped simplex noise (4 octaves) drives the colour-region flow; smoothstep cursor glow accents the pointer location. |
| **Phase 3 (first cut)** | `HeroShaderBackground` — full-viewport plasma shader replacing the global `MeshBackground` mount on desktop with reduced-motion. Slower time / wider noise scales than the button aura. `MeshBackground` retained as the reduced-motion + mobile fallback. |
| **Repo migration** | Moved from the LUN monorepo to a dedicated `Calibrate-ai` repo. `main` is the deployment branch. |

---

## 4. Roadmap — pending

- **Phase 3 polish** — Tune the hero shader once seen at full scale on the deployed site (likely 1–2 rounds for noise frequency / time multiplier / palette blend weights). Consider mobile WebGL support once perf is verified.
- **Case studies** — Replace the three "Coming soon" placeholders in `data.jsx` with real projects once the first builds wrap.
- **Perf audit** — Lighthouse pass, image-format check, font-subset audit, R3F chunk warm-up strategy.
- **SEO polish** — `sitemap.xml`, `robots.txt`, structured-data JSON-LD (LocalBusiness or Organization schema), per-section meta if the site grows beyond a single page.
- **Mobile pin polish** — Services pin currently falls back to a stacked list below `md`. Worth evaluating whether a lighter pinned experience could work on tablet portrait.

---

## 5. Tech stack

- **Build / dev:** Vite 8, React 19
- **Styling:** Tailwind CSS v4 (`@theme` directive in `src/index.css`)
- **Scroll:** Lenis 1.3 (smooth scroll, drives `window.scrollY` natively so Framer Motion `useScroll` reads it directly)
- **Animation:** GSAP 3.15 + ScrollTrigger + SplitText. Framer Motion 12 for component-level `Reveal`, magnetic button, and reduced-motion detection.
- **WebGL:** `@react-three/fiber` + `three` (lazy-loaded chunk only)
- **Lint:** ESLint 10 with `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh`

---

## 6. Key technical decisions — and why

| Decision | Why |
|---|---|
| **Lenis over native scroll** | Native CSS smooth scroll is jumpy with ScrollTrigger and inconsistent across browsers. Lenis writes to real `window.scrollY` so it integrates with both Framer Motion `useScroll` and GSAP ScrollTrigger via one `scroll` event subscription. |
| **GSAP for pin storytelling** | ScrollTrigger's `pin` + scrubbed timelines are the cleanest way to map scroll progress → multi-card choreography. Framer Motion can do scrubs but doesn't pin natively. |
| **R3F for WebGL effects** | React-friendly Three.js. Custom `shaderMaterial` is one component vs a manual WebGL setup. Same `<Canvas>` primitive used for button aura and hero background. |
| **Lazy-load the Three chunk** | Three.js is ~240 KB gzipped on its own. Loading it eagerly pushes the main bundle past 400 KB gzipped. `React.lazy(() => import('./AuraCanvas.jsx'))` plus `<Suspense fallback={null}>` defers download until the user first hovers a gradient CTA. Main bundle stays at ~173 KB gzipped; the chunk only loads on interaction. |
| **MeshBackground retained as fallback** | Reduced-motion users + (currently) mobile fall back to the CSS-driven `MeshBackground`. It's also kept around as a revert path if the hero shader has issues. |
| **Switzer over Syne** | Syne was too stretched at display sizes. Switzer (Fontshare) reads tighter and more contemporary at the same weights. |
| **Plus Jakarta Sans 700 only for the wordmark** | The wordmark SVG bakes that font face by name. Using it elsewhere would dilute the brand mark. |
| **Single dedicated repo** | The original LUN monorepo had multiple unrelated projects. `Calibrate-ai` makes deploy + history clean. `lun-old` remote is kept for archaeology only. |
| **`useEntranceTimeline` shared hook** | Every section had the same boilerplate: ScrollTrigger at `top 80%`, `gsap.context` for cleanup, `fonts.ready` gating to avoid layout-jump when SplitText measures. Factored into one hook so future sections drop in cleanly. |
| **`useAura` returns a ref, not state** | The hook is called 60+ times per second on mousemove. Writing into a ref (read by R3F's `useFrame`) avoids React re-renders on every motion. |

---

## 7. Architecture

```
src/
├── App.jsx                       # mounts background, cursor, nav, sections, footer
├── main.jsx                      # React entry
├── index.css                     # Tailwind v4 + global utilities (.aura-host, .grain, .text-gradient, .glow-ring)
├── data.jsx                      # centralised content (services, case studies, contact email)
├── icons.jsx                     # SVG icon set
├── components/
│   ├── Nav.jsx                   # fixed header, inline SVG lockup, mobile menu, "Let's talk" CTA
│   ├── Hero.jsx                  # one-shot intro via useHeroIntro
│   ├── WhyAI.jsx                 # 3-card reasons grid, section entrance via useEntranceTimeline
│   ├── Services.jsx              # ScrollTrigger pin (desktop) / stacked Reveal list (mobile + reduce)
│   ├── Pricing.jsx               # 3-batch verdict, MagneticButton with aura
│   ├── CaseStudies.jsx           # 3 placeholder cards, headline SplitText + stagger
│   ├── About.jsx                 # portrait + bio + chip
│   ├── Contact.jsx               # form with cinematic entrance + scrubbed mesh-scale
│   ├── Footer.jsx                # inline wordmark, nav, email
│   ├── MagneticButton.jsx        # motion.a; pulls toward pointer, optional aura={true} mounts AuraCanvas
│   ├── AuraCanvas.jsx            # R3F + custom GLSL plasma shader (lazy-loaded)
│   ├── HeroShaderBackground.jsx  # R3F + GLSL plasma at full-viewport (lazy-loaded, desktop only)
│   ├── MeshBackground.jsx        # CSS-driven ambient backdrop (mobile + reduced-motion fallback)
│   ├── Cursor.jsx                # asteroid-streak custom cursor + Phase 2D magnetic field
│   └── Reveal.jsx                # one-shot fade-up on enter via Framer Motion whileInView
├── hooks/
│   ├── useLenis.js               # smooth scroll + ScrollTrigger sync (skips on reduced-motion)
│   ├── useHeroIntro.js           # hero headline SplitText + cascade
│   ├── useServicesPin.js         # Services pin timeline; 140vh per beat, power4.in opacity exit
│   ├── useEntranceTimeline.js    # shared "play once at top 80%" pattern for sections
│   └── useAura.js                # cursor position relative to a button → ref (read by shader)
└── assets/
    ├── calibrate-icon.svg        # also lives in /public for absolute /calibrate-icon.svg URL
    ├── calibrate-lockup.svg
    └── calibrate-wordmark.svg
```

---

## 8. Conventions

- **Files:** components `PascalCase.jsx`, hooks `useXxx.js`.
- **Reveal** wraps anything that fades in on scroll. Don't reimplement.
- **`MagneticButton`** wraps gradient CTAs. `aura={true}` opt-in mounts the WebGL plasma.
- **`useAura`** is the source of truth for cursor-position-inside-button. Returns a normalised (0..1, Y-flipped) ref.
- **`data-cursor-magnetic="true"`** opts an element into the Phase 2D cursor-pull. Only the primary CTAs (Hero "Get in touch", Pricing "Tell us what you need", Contact "Send it over", Nav desktop "Let's talk") are marked.
- **Reduced-motion** is checked via `useReducedMotion` (Framer) or `window.matchMedia('(prefers-reduced-motion: reduce)')` (vanilla). When set, the rule is _content present, no movement_.
- **`gsap.registerPlugin(ScrollTrigger, SplitText)`** is currently called per-file. Harmless (registration is idempotent) but a candidate for centralisation if the file count grows.
- **`@layer utilities`** in `index.css` is where global classes live. Tailwind v4's `@theme` block holds the design tokens.

---

## 9. Known issues / tech debt

See `REVIEW_FINDINGS.md` for the full code-review punch list. High-level state:

- **Bundle:** Main JS is 172.86 KB gzipped post-lazy-load. The Three chunk (235.52 KB gzipped) only loads on first CTA hover.
- **Mobile WebGL:** Hero shader currently falls back to MeshBackground below `md` (perf-conservative). May be worth enabling on tablet+ once we have perf telemetry.
- **No SEO surfaces yet:** `sitemap.xml`, `robots.txt`, JSON-LD all absent. Single-page so low priority but worth a polish pass.
- **No tests:** No unit / visual / E2E tests. Manual QA only. Adding Playwright smoke for "page loads + hero CTA visible" would be the lowest-hanging fruit.
- **Worker folder:** `worker/` is untracked Cloudflare CLI state. `.wrangler/` will be added to gitignore overnight.

Last commit before this audit: `2855838` — _Lazy-load AuraCanvas chunk to defer Three.js bundle until first hover._
