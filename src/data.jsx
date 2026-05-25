import { ClockIcon, ChatIcon, DataIcon } from './icons.jsx'

export const services = [
  {
    id: 'operations',
    icon: ClockIcon,
    category: 'Operations',
    title: 'Get your evenings back.',
    summary:
      'The invoicing, the bookings, the inventory, the integrations — all the back-office work that eats your week. We connect your existing tools and automate the repetition so the business runs itself, quietly, in the background.',
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
      "Email campaigns, WhatsApp messages, websites, customer portals — everything your customers see and interact with. We build it once and automate it forever, so reaching them consistently doesn't cost you time you don't have.",
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
      "Your business already has the data and the questions. We turn the data into dashboards and forecasts you'll actually use, and we sit down with you to map exactly where automation would make the biggest difference. No jargon, no fluff.",
    points: [
      "Raw data turned into clean visual dashboards you'll actually look at.",
      'Sales forecasting so you can plan ahead instead of reacting.',
      'We map how your business runs and identify exactly where automation would help most.',
      "Honest advice on what's worth building and what isn't — no upselling.",
      'A clear action plan you can take away and act on, with or without us.',
    ],
  },
]

export const caseStudies = [
  {
    id: 'cs-1',
    tag: 'Coming soon',
    title: 'Project coming soon',
    problem: 'A short description of the problem this business was facing.',
    solution: 'What was built and how it fit into their day-to-day.',
    outcome:
      'The measurable result — time saved, errors reduced, money kept in the business.',
  },
  {
    id: 'cs-2',
    tag: 'Coming soon',
    title: 'Project coming soon',
    problem: 'A short description of the problem this business was facing.',
    solution: 'What was built and how it fit into their day-to-day.',
    outcome:
      'The measurable result — time saved, errors reduced, money kept in the business.',
  },
  {
    id: 'cs-3',
    tag: 'Coming soon',
    title: 'Project coming soon',
    problem: 'A short description of the problem this business was facing.',
    solution: 'What was built and how it fit into their day-to-day.',
    outcome:
      'The measurable result — time saved, errors reduced, money kept in the business.',
  },
]

export const contact = {
  email: 'calibrate.ai.uk@gmail.com',
  whatsapp: '', // e.g. '447000000000' — leave blank to hide the WhatsApp button
}
