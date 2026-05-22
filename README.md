# Shrav — AI & Automation Services

A personal landing site for Shrav's AI and automation services for small
businesses. Dark, futuristic, and warm — built to be sent to friends and
friends-of-friends.

## Tech

- React + Vite
- Tailwind CSS v4
- Framer Motion (entrance animations, smooth scroll)
- Deployed on Vercel

## Sections

Hero · Why AI · Services (five expandable cards) · Pricing (three free
projects) · Case Studies (placeholder layout) · About Shrav · Contact.

## Dev

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Editing content

- Services and case studies live in `src/data.jsx`.
- Contact email / WhatsApp number are at the bottom of `src/data.jsx`
  (set `whatsapp` to a number like `447000000000` to show the WhatsApp
  button; leave it blank to hide it).
- Case Studies use placeholder copy and image slots — swap real project
  details and screenshots in once they're ready.

## Deploy (Vercel)

Import the repo into Vercel. Framework preset: **Vite**. Build command
`npm run build`, output directory `dist`.
