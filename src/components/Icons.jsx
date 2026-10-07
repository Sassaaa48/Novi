/* Small inline SVG icon set. Decorative by default (aria-hidden). */

const Stroke = ({ children, size, ...rest }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  >
    {children}
  </svg>
);

const Fill = ({ children, size, ...rest }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
    {...rest}
  >
    {children}
  </svg>
);

export const IconBoard = (p) => (
  <Stroke {...p}>
    <rect x="3" y="4" width="5" height="16" rx="1.5" />
    <rect x="10" y="4" width="5" height="10" rx="1.5" />
    <rect x="17" y="4" width="4" height="6" rx="1.5" />
  </Stroke>
);

export const IconThread = (p) => (
  <Stroke {...p}>
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.6A8 8 0 1 1 21 12Z" />
    <path d="M8.5 11h7M8.5 14.5h4" />
  </Stroke>
);

export const IconCalendar = (p) => (
  <Stroke {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
    <path d="M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01" strokeWidth="2.4" />
  </Stroke>
);

export const IconSwap = (p) => (
  <Stroke {...p}>
    <path d="M20 7H6M16 3l4 4-4 4" />
    <path d="M4 17h14M8 13l-4 4 4 4" />
  </Stroke>
);

export const IconTrello = (p) => (
  <Stroke {...p}>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <rect x="6.5" y="6.5" width="4" height="9" rx="1" />
    <rect x="13" y="6.5" width="4" height="5" rx="1" />
  </Stroke>
);

export const IconAsana = (p) => (
  <Stroke {...p}>
    <circle cx="12" cy="7" r="3.5" />
    <circle cx="6" cy="17" r="3.5" />
    <circle cx="18" cy="17" r="3.5" />
  </Stroke>
);

export const IconSheet = (p) => (
  <Stroke {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 10h18M3 15h18M9 4v16" />
  </Stroke>
);

export const IconChevron = ({ size = 14, ...p }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...p}
  >
    <path d="m4 6 4 4 4-4" />
  </svg>
);

export const IconCheck = (p) => (
  <svg
    viewBox="0 0 12 12"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...p}
  >
    <path d="m2.5 6.5 2.5 2.5 4.5-5" />
  </svg>
);

export const IconTick = (p) => (
  <Stroke {...p} strokeWidth="2.5">
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Stroke>
);

export const IconClose = (p) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
    {...p}
  >
    <path d="m3 3 10 10M13 3 3 13" />
  </svg>
);

export const IconX = (p) => (
  <Fill {...p}>
    <path d="M18.2 2.5h3.1l-6.8 7.7 8 11.3h-6.3l-4.9-6.8-5.7 6.8H2.5l7.3-8.3L2.1 2.5h6.4l4.4 6.2 5.3-6.2Zm-1.1 17.1h1.7L7.4 4.3H5.6l11.5 15.3Z" />
  </Fill>
);

export const IconLinkedIn = (p) => (
  <Fill {...p}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.54h.06c.53-1 1.82-2.04 3.75-2.04 4 0 4.74 2.63 4.74 6.05V21h-4v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75V21h-4V9.75Z" />
  </Fill>
);

export const IconGitHub = (p) => (
  <Fill {...p}>
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </Fill>
);

export const IconInstagram = (p) => (
  <Stroke {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </Stroke>
);

export const IconArrowRight = (p) => (
  <Stroke {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Stroke>
);

export const IconArrowUp = (p) => (
  <Stroke {...p}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </Stroke>
);

export const IconPlay = (p) => (
  <Fill {...p}>
    <path d="M7 4.5v15l12.5-7.5L7 4.5Z" />
  </Fill>
);

export const IconPlus = (p) => (
  <Stroke {...p}>
    <path d="M12 5v14M5 12h14" />
  </Stroke>
);

export const IconSearch = (p) => (
  <Stroke {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.2-4.2" />
  </Stroke>
);

export const IconChecklist = (p) => (
  <Stroke {...p}>
    <rect x="4" y="4" width="16" height="16" rx="3" />
    <path d="m8.5 12 2.5 2.5 4.5-5" />
  </Stroke>
);

export const IconClip = (p) => (
  <Stroke {...p}>
    <path d="m20.5 11.5-8.4 8.4a5 5 0 0 1-7.1-7.1l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7l-8.5 8.5a1.7 1.7 0 0 1-2.4-2.4l7.8-7.8" />
  </Stroke>
);

export const IconComment = (p) => (
  <Stroke {...p}>
    <path d="M4 5h16v11H9l-5 4V5Z" />
  </Stroke>
);

export const IconCheckCircle = (p) => (
  <Stroke {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m8.5 12 2.5 2.5 4.5-5" />
  </Stroke>
);

export const IconDoubleCheck = (p) => (
  <Stroke {...p}>
    <path d="m2 13 4 4 8-9M11 16l1 1 8-9" />
  </Stroke>
);
