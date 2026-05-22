import {
  TeamIcon,
  ChatIcon,
  ProductIcon,
  DataIcon,
  TutorIcon,
} from './icons.jsx'

export const services = [
  {
    id: 'team-ops',
    icon: TeamIcon,
    title: 'Team & Operations',
    summary:
      'Shift management and HR that lives on your team’s phones — less admin for you, fewer headaches for them.',
    points: [
      'Staff request cover, swap or part-swap shifts straight from an app on their phone — no group chat chaos.',
      'Hours and pay tracked automatically, so payroll stops being a Sunday-night job.',
      'Flags where rota costs are creeping up and where you could trim them.',
      'Optional performance stats and analytics if you want a clearer picture of how the team is doing.',
    ],
  },
  {
    id: 'customer-engagement',
    icon: ChatIcon,
    title: 'Customer Engagement',
    summary:
      'Stay in front of your customers without spending your evenings writing emails or answering the same questions.',
    points: [
      'Mass email outreach built from targeted templates that pull straight from your existing Excel data.',
      'AI chatbots embedded on your website to answer visitors instantly, day or night.',
      'AI agents that handle routine customer support queries on their own, and hand the tricky ones to you.',
    ],
  },
  {
    id: 'digital-products',
    icon: ProductIcon,
    title: 'Digital Products',
    summary:
      'A proper online presence — a website or app that looks the part and actually works for your customers.',
    points: [
      'Custom websites with smooth animations and a clean, modern design that feels current.',
      'PWA apps that install straight from a link — no App Store, no approval queue, no fees.',
      'Push notifications built in, so you can reach customers the way the big apps do.',
    ],
  },
  {
    id: 'data-intelligence',
    icon: DataIcon,
    title: 'Data Intelligence',
    summary:
      'Turn the messy data you already have into clear dashboards you’ll actually look at.',
    points: [
      'Takes any raw data you’ve got — spreadsheets, exports, sales records — and cleans it up.',
      'Builds it into clear, visual dashboards rather than walls of numbers.',
      'Helps you make fast, informed decisions without needing a data analyst on payroll.',
    ],
  },
  {
    id: 'tutoring',
    icon: TutorIcon,
    title: 'Tutoring',
    summary:
      'Prefer to learn it yourself? One-to-one sessions to get you confidently using these tools.',
    points: [
      'One-to-one teaching sessions tailored to you and your business.',
      'Learn how to set up and run specific tools yourself, at your own pace.',
      'Charged at a premium rate compared with the other services — it’s hands-on time, just the two of us.',
    ],
  },
]

export const caseStudies = [
  {
    id: 'cs-1',
    tag: 'Coming soon',
    title: 'Project Title Placeholder',
    problem:
      'A short description of the problem this business was facing before we started working together.',
    solution:
      'What was built and how it fit into their day-to-day — the automation, app or dashboard delivered.',
    outcome:
      'The measurable result: time saved per week, errors reduced, or money kept in the business.',
  },
  {
    id: 'cs-2',
    tag: 'Coming soon',
    title: 'Project Title Placeholder',
    problem:
      'A short description of the problem this business was facing before we started working together.',
    solution:
      'What was built and how it fit into their day-to-day — the automation, app or dashboard delivered.',
    outcome:
      'The measurable result: time saved per week, errors reduced, or money kept in the business.',
  },
  {
    id: 'cs-3',
    tag: 'Coming soon',
    title: 'Project Title Placeholder',
    problem:
      'A short description of the problem this business was facing before we started working together.',
    solution:
      'What was built and how it fit into their day-to-day — the automation, app or dashboard delivered.',
    outcome:
      'The measurable result: time saved per week, errors reduced, or money kept in the business.',
  },
]

// Update these once Shrav confirms the real details.
export const contact = {
  email: 'meshavie@gmail.com',
  whatsapp: '', // e.g. '447000000000' — leave blank to hide the WhatsApp button
}
