import {
  ClockIcon,
  ChatIcon,
  DataIcon,
  ProductIcon,
  TeamIcon,
  TutorIcon,
} from './icons.jsx'

export const services = [
  {
    id: 'back-end',
    icon: ClockIcon,
    title: 'The Back End, Handled',
    summary:
      'The invoicing, the bookings, the inventory, the documents — all the behind-the-scenes work that eats your week. We automate it so it just happens, without you having to think about it.',
    points: [
      'Invoices raised and sent automatically — no more end of month panic.',
      'Booking and appointment systems that manage themselves.',
      "Inventory tracked in real time so you're never caught short.",
      'Documents like contracts and reports generated automatically when you need them.',
    ],
  },
  {
    id: 'outreach',
    icon: ChatIcon,
    title: 'Outreach On Autopilot',
    summary:
      'Email campaigns, WhatsApp messages, social posts, review requests — reaching your customers consistently and automatically, without you writing a single thing from scratch each time.',
    points: [
      'Mass email campaigns built from your existing customer data — sent in minutes, not hours.',
      'WhatsApp Business automation for follow-ups, confirmations and updates.',
      'Social media scheduled and posted automatically — stay consistent without the daily effort.',
      'Review requests sent automatically after every job or visit.',
    ],
  },
  {
    id: 'intelligence',
    icon: DataIcon,
    title: 'Intelligence You Can Act On',
    summary:
      'Your business already has the data. We turn it into dashboards, forecasts and competitor insights that tell you exactly where to focus — no spreadsheet digging required.',
    points: [
      "Raw data turned into clean visual dashboards you'll actually look at.",
      'Sales forecasting so you can plan ahead instead of reacting.',
      'Sentiment analysis on customer feedback so you know what people really think.',
      'Competitor monitoring so you always know where you stand in your market.',
    ],
  },
  {
    id: 'web',
    icon: ProductIcon,
    title: 'Built For The Web',
    summary:
      'Websites, PWA apps, customer portals, AI chatbots — everything your customers see and interact with online, built properly and designed to work hard for your business.',
    points: [
      'Custom websites with modern design and smooth animations that feel current.',
      'PWA apps that install from a link — no App Store, no fees, no approval queue.',
      'Customer portals so your clients can self-serve without calling you.',
      'AI chatbots and support agents that handle enquiries around the clock.',
    ],
  },
  {
    id: 'one-flow',
    icon: TeamIcon,
    title: 'One Flow. All Connected.',
    summary:
      "Your calendar, CRM, email, booking system — all talking to each other. No more copy-pasting between apps or things falling through the cracks because two tools don't connect.",
    points: [
      'Your existing tools connected so data flows between them automatically.',
      'No more copy-pasting between your calendar, CRM and email.',
      "API integrations built to link platforms that don't natively talk to each other.",
      'One joined-up system instead of six separate ones you have to manage manually.',
    ],
  },
  {
    id: 'advisory',
    icon: TutorIcon,
    title: 'AI Advisory & Consultancy',
    summary:
      "Not sure where to start or what's even worth automating? We come in, look at how your business runs, and tell you exactly what would make the biggest difference — no jargon, no fluff.",
    points: [
      'We map out how your business runs and identify exactly where automation would help most.',
      "Honest advice on what's worth building and what isn't — no upselling.",
      'A clear action plan you can take away and act on, with or without us.',
      'Priced separately — this is dedicated time and expertise, not a quick call.',
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
  email: 'meshavie@gmail.com',
  whatsapp: '', // e.g. '447000000000' — leave blank to hide the WhatsApp button
}
