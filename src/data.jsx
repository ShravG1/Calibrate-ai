import { ClockIcon, ChatIcon, DataIcon } from './icons.jsx'

export const services = [
  {
    id: 'operations',
    icon: ClockIcon,
    category: 'Operations',
    title: 'Get your evenings back.',
    summary:
      'The invoicing, the bookings, the inventory, the integrations — all the back-office work that eats your week. I connect your existing tools and automate the repetition so the business runs itself, quietly, in the background.',
    points: [
      'Invoices raised and sent automatically — no more end of month panic.',
      'Booking and appointment systems that manage themselves.',
      "Stock counts that update themselves so you're never caught short.",
      'Your existing tools connected so data flows between them automatically.',
      'One joined-up system instead of six separate ones you have to manage manually.',
    ],
  },
  {
    id: 'customers',
    icon: ChatIcon,
    category: 'Customers',
    title: 'Outreach that handles itself.',
    summary:
      "Email campaigns, WhatsApp messages, websites, customer portals — everything your customers see and interact with. I build it once and automate it forever, so reaching them consistently doesn't cost you time you don't have.",
    points: [
      'Mass email campaigns built from your existing customer data — sent in minutes, not hours.',
      'WhatsApp Business automation for follow-ups, confirmations and updates.',
      'Custom websites with modern design and smooth animations that feel current.',
      'Customer portals so your clients can self-serve without calling you.',
      'AI chatbots and support agents that handle enquiries around the clock.',
    ],
  },
  {
    id: 'strategy',
    icon: DataIcon,
    category: 'Strategy',
    title: 'See clearly and decide with confidence.',
    summary:
      "Your business already has the data and the questions. I turn the data into dashboards and forecasts you'll actually use, and sit down with you to map exactly where automation would make the biggest difference. No jargon, no fluff.",
    points: [
      "Raw data turned into clean visual dashboards you'll actually look at.",
      'Sales forecasting so you can plan ahead instead of reacting.',
      'I map how your business runs and identify exactly where automation would help most.',
      "Honest advice on what's worth building and what isn't — no upselling.",
      'A clear action plan you can take away and act on, with or without me.',
    ],
  },
]

export const caseStudies = [
  {
    id: 'cs-rota',
    tag: 'Operations',
    title: 'Staff rota dashboard',
    image: '/case-studies/03-rota-crop.png',
    imageAlt:
      'Rota dashboard with coverage stats and live shift timeline for the day',
    aspect: 'aspect-[16/9]',
    problem:
      'Managers running rotas from spreadsheets — no visibility on coverage gaps, sickness, or open cover requests.',
    solution:
      'A single dashboard: live coverage stats, uncovered shifts flagged, cover requests queued, plus a full audit trail.',
    outcome:
      'Gaps caught the day they appear, not the morning of. One screen replaces four tabs and a WhatsApp group.',
  },
  {
    id: 'cs-ebay',
    tag: 'Reseller P&L',
    title: 'eBay reseller ledger',
    image: '/case-studies/04-ebay-crop.png',
    imageAlt:
      'eBay tracker showing monthly profit chart and category breakdown donut',
    aspect: 'aspect-[16/9]',
    problem:
      'A reseller juggling spreadsheets to track stock, fees, sales — and what HMRC was owed at year-end.',
    solution:
      'An automated ledger that syncs eBay sales, matches Gmail receipts, calculates net profit, tracks unsold stock and projects tax headroom.',
    outcome:
      'Year-end tax position visible in real time. Hours of monthly bookkeeping cut to a glance.',
  },
  {
    id: 'cs-vat',
    tag: 'Hospitality',
    title: 'VAT receipt generator',
    image: '/case-studies/02-vat-receipt.png',
    imageAlt: 'VAT receipt generator form with venue, guest and booking fields',
    aspect: 'aspect-[3/4]',
    problem:
      'Staff retyping the same VAT receipts dozens of times a week for refund requests.',
    solution:
      'A form-driven tool — pick venue, fill the booking details, hit generate. Outputs a compliant PDF with the correct VAT breakdown.',
    outcome:
      'Receipt creation dropped from ~6 minutes to ~20 seconds. Zero typos in HMRC-bound paperwork.',
  },
  {
    id: 'cs-layers',
    tag: 'Personal app',
    title: 'Layers — what to wear, decided',
    image: '/case-studies/01-layers.jpg',
    imageAlt: "Layers app showing today's recommended outfit based on weather",
    aspect: 'aspect-[3/4]',
    problem:
      'Five minutes lost every morning checking weather and second-guessing what to wear.',
    solution:
      'A mobile-first app that reads live weather and recommends an outfit, learning from too cold / just right / too warm feedback.',
    outcome:
      "Decision time dropped to seconds. Combos that worked are remembered, so tomorrow's call is sharper than today's.",
  },
]

export const faqs = [
  {
    q: 'Do you work with businesses in my industry?',
    a: "Probably. The four projects on this page span hospitality, ecommerce, operations and consumer apps — but the underlying skill is connecting the tools you already use and automating the repetition. If you can describe what's eating your time, I can usually tell you within one conversation whether it's a fit.",
  },
  {
    q: 'How much does this cost?',
    a: "Right now I'm building a portfolio, so discovery calls are free and some smaller builds are too. Larger builds get quoted up front with a fixed scope and price — no agency markup, no surprise invoices. If I'm not the right person for it I'll say so on the call.",
  },
  {
    q: 'How long does a typical project take?',
    a: "Small automations — a single workflow, a tidied-up dashboard, a Formspree-style integration — usually land within 1–2 weeks. Full builds (custom apps, multi-tool integrations, AI agents) are 4–8 weeks depending on scope. You'll get a realistic timeline before you commit, not after.",
  },
  {
    q: 'Do I have to switch tools or platforms?',
    a: "No. The whole point is connecting what you already pay for — your existing invoicing, bookings, spreadsheets, WhatsApp, email — so they talk to each other. Switching tools is sometimes the right call, but it's a recommendation, never a precondition.",
  },
  {
    q: 'Is automating WhatsApp messages allowed in the UK?',
    a: 'Yes, via the WhatsApp Business API and only with the right templates, opt-ins and PECR/UK GDPR compliance. I build to those rules — the easiest way to get banned from WhatsApp is to send unsolicited messages, and that helps no one.',
  },
  {
    q: 'What happens after the build — am I stuck with you?',
    a: "Never. Everything I build sits in your accounts (your cloud, your domains, your data) and comes with documentation a non-technical person can hand to another developer. If you'd rather I stay on for ongoing changes I can — but it's an option, not a lock-in.",
  },
]

export const contact = {
  email: 'calibrate.ai.uk@gmail.com',
  whatsapp: '', // e.g. '447000000000' — leave blank to hide the WhatsApp button
}
