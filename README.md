# Calibrate

AI and automation services for UK small businesses.

Live site: https://calibrate-ai.uk

## Stack

- React 19 + Vite 8
- Tailwind CSS v4
- GSAP 3.15 (ScrollTrigger, SplitText) for scroll-driven choreography
- Lenis 1.3 for smooth scroll
- React Three Fiber + Three.js for the hero WebGL shader (lazy-loaded)
- Framer Motion 12 for Reveal and magnetic-cursor interactions

## Local dev

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Structure

- `src/App.jsx` — section composition (Nav, Hero, Services, About, CaseStudies, Pricing, Contact, Footer)
- `src/components/` — section components and shared primitives (Reveal, MagneticButton, Cursor, MeshBackground, HeroShaderBackground, AuraCanvas)
- `src/hooks/` — scroll/animation hooks (`useLenis`, `useHeroIntro`, `useHeroExit`, `useServicesPin`, `useEntranceTimeline`, `useAura`)
- `src/data.jsx` — services copy, case-study placeholders, contact details
- `src/index.css` — Tailwind v4 `@theme` tokens and global utilities

## Content edits

Most copy lives in `src/data.jsx`. Section-specific microcopy is inline
in each component file under `src/components/`. Contact email and
WhatsApp number are at the bottom of `src/data.jsx` (leave `whatsapp`
blank to hide the button).

## Deploy

Vercel auto-deploys on push to `main`. Framework preset: Vite. Build
command `npm run build`, output directory `dist`.
