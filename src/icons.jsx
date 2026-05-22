// Minimal stroke icons — single colour, inherit currentColor.
const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function TeamIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M16 18a4 4 0 0 0-8 0" />
      <circle cx="12" cy="9" r="3" />
      <path d="M5 18a3 3 0 0 1 3-3M19 18a3 3 0 0 0-3-3" />
      <path d="M3.5 13a2.2 2.2 0 1 1 2.2-2.2M20.5 13a2.2 2.2 0 1 0-2.2-2.2" />
    </svg>
  )
}

export function ChatIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M21 12a8 8 0 0 1-11.4 7.2L4 21l1.8-5.6A8 8 0 1 1 21 12Z" />
      <path d="M8.5 11h7M8.5 14.5h4" />
    </svg>
  )
}

export function ProductIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4" width="13" height="10" rx="1.6" />
      <path d="M3 17h13" />
      <rect x="15.5" y="9" width="6" height="11" rx="1.6" />
      <path d="M18.5 17.2h.01" />
    </svg>
  )
}

export function DataIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20V4" />
      <path d="M4 20h16" />
      <path d="M8 20v-6M12.5 20V8M17 20v-9" />
      <path d="M7 9.5 11 6l3 2.5 4-4.5" />
    </svg>
  )
}

export function TutorIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4 2.5 8.5 12 13l9.5-4.5L12 4Z" />
      <path d="M6.5 10.5V15c0 1.4 2.5 2.8 5.5 2.8s5.5-1.4 5.5-2.8v-4.5" />
      <path d="M21.5 8.5V14" />
    </svg>
  )
}

export function ClockIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  )
}

export function ShieldIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 5 6v6c0 4.4 3 7.5 7 9 4-1.5 7-4.6 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

export function ScaleIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5 19V9M12 19V5M19 19v-7" />
      <path d="M3.5 19h17" />
      <path d="m4 9 8-4 7 3" />
    </svg>
  )
}

export function ArrowIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function CheckIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12.5 4.5 4.5L19 6" />
    </svg>
  )
}

export function PlusIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function MailIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  )
}

export function WhatsAppIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.7-5.2A8.5 8.5 0 1 1 21 11.5Z" />
      <path d="M9 8.6c-.3 0-.7.1-.9.5-.3.5-.9 1.5-.4 2.9.8 2.1 2.8 3.9 5 4.4 1.3.3 1.9-.3 2.2-.8.2-.4.2-.9 0-1l-1.6-.8c-.2-.1-.4 0-.6.2l-.5.6c-.1.2-.3.2-.5.1a5.7 5.7 0 0 1-2.6-2.5c-.1-.2 0-.4.1-.5l.5-.6c.1-.2.1-.3 0-.5l-.7-1.7c-.1-.4-.3-.4-.5-.4Z" />
    </svg>
  )
}
