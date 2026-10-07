import {
  IconBoard,
  IconThread,
  IconCalendar,
  IconSwap,
  IconTrello,
  IconAsana,
  IconSheet,
  IconX,
  IconLinkedIn,
  IconGitHub,
  IconInstagram,
} from './components/Icons.jsx';

/**
 * Every destination outside this page. Anything left as null is hidden
 * (nav items, footer links, footer columns, socials, Schedule demo).
 * '#' marks a placeholder that shows but goes nowhere yet.
 */
export const URLS = {
  pricing: '#', // set to '#pricing' and restore <Pricing /> in App.jsx to bring the section back
  resources: '#',
  demo: '#',
  integrations: '#',
  about: '#',
  careers: '#',
  blog: '#',
  contact: '#',
  privacy: '#',
  terms: '#',
  security: '#',
  x: '#',
  linkedin: '#',
  github: '#',
  instagram: '#',
};

const withHref = (links) => links.filter((l) => l.href);

export const NAV_LINKS = withHref([
  { id: 'top', label: 'Product', href: '#top' },
  { id: 'features', label: 'Features', href: '#features' },
  { id: 'pricing', label: 'Pricing', href: URLS.pricing },
  { id: 'resources', label: 'Resources', href: URLS.resources },
]);

/* ---------- People ---------- */
export const ME = 'AL';

export const PEOPLE = {
  AL: 'var(--lime)',
  MK: 'var(--chip)',
  JR: 'var(--chip)',
  EK: 'var(--chip)',
  JF: 'var(--chip)',
  SC: 'var(--chip)',
};

/* ---------- Hero board ---------- */
export const COLUMN_NAMES = ['To do', 'In progress', 'Done'];

export const BOARD_FILTERS = [
  { id: 'all', label: 'All tasks' },
  { id: 'mine', label: 'My tasks' },
  { id: 'sprint', label: 'Sprint 14' },
];

export const INITIAL_TASKS = [
  {
    id: 1,
    title: 'Design system tokens sync',
    tag: 'Design',
    date: 'Tomorrow',
    meta: { icon: 'checklist', text: '3/8' },
    who: 'MK',
    col: 0,
    sprint: true,
  },
  {
    id: 2,
    title: 'Competitor audit synthesis',
    tag: 'Research',
    date: 'Oct 24',
    meta: { icon: 'clip', text: '2 briefs' },
    who: 'JR',
    col: 0,
    sprint: true,
  },
  {
    id: 3,
    title: 'Dark mode explorations',
    tag: 'Design',
    date: 'Nov 3',
    meta: { icon: 'comment', text: '4' },
    who: 'AL',
    col: 0,
    sprint: false,
  },
  {
    id: 4,
    title: 'Prototype design tokens',
    tag: 'Sprint Goal',
    goal: true,
    date: 'Sprint 14',
    progress: 100,
    meta: { icon: 'comment', text: '8' },
    who: 'AL',
    col: 1,
    sprint: true,
  },
  {
    id: 5,
    title: 'Postgres database indexing',
    tag: 'Engineering',
    date: 'Oct 22',
    meta: { icon: 'done', text: '2 completed' },
    who: 'EK',
    col: 1,
    sprint: true,
  },
  {
    id: 6,
    title: 'User interview synthesis',
    tag: 'User Research',
    date: 'Oct 18',
    meta: { icon: 'comment', text: '3' },
    doneText: 'Completed yesterday',
    who: 'AL',
    col: 2,
    sprint: true,
  },
  {
    id: 7,
    title: 'Stripe billing integration',
    tag: 'Backend',
    date: 'Oct 19',
    meta: { icon: 'checklist', text: '6/6' },
    doneText: 'Finalized Oct 19',
    who: 'EK',
    col: 2,
    sprint: true,
  },
  {
    id: 8,
    title: 'Onboarding email sequence',
    tag: 'Growth',
    date: 'Oct 11',
    meta: { icon: 'comment', text: '5' },
    doneText: 'Shipped Oct 11',
    who: 'JF',
    col: 2,
    sprint: false,
  },
  {
    id: 9,
    title: 'Sprint 13 retro notes',
    tag: 'Ops',
    date: 'Oct 9',
    meta: { icon: 'clip', text: '1 doc' },
    doneText: 'Completed Oct 9',
    who: 'AL',
    col: 2,
    sprint: false,
  },
  {
    id: 10,
    title: 'Marketing site audit',
    tag: 'Web',
    date: 'Oct 6',
    meta: { icon: 'checklist', text: '9/9' },
    doneText: 'Completed Oct 6',
    who: 'MK',
    col: 2,
    sprint: false,
  },
];

export const NEW_TASK_TITLES = [
  'Draft launch checklist',
  'Review onboarding copy',
  'Audit empty states',
  'Plan retro agenda',
];

/* ---------- Features ---------- */
export const FEATURES = [
  {
    id: 'board',
    num: '01',
    title: 'Boards that move at your speed',
    text: 'Plan sprints and track tasks without hunting through spreadsheets. Drag, drop, and ship with fluid instant feedback.',
    Icon: IconBoard,
  },
  {
    id: 'threads',
    num: '02',
    title: 'Threads, not another inbox',
    text: 'Keep project conversations attached to the work itself, so context never gets lost across fragmented notification silos.',
    Icon: IconThread,
  },
  {
    id: 'timeline',
    num: '03',
    title: 'One timeline for the whole team',
    text: 'Every deadline, release target, and milestone in one shared view. Everyone sees what’s next without scheduling meetings.',
    Icon: IconCalendar,
  },
  {
    id: 'import',
    num: '04',
    title: 'Works the way you already do',
    text: 'Import from Trello, Asana, or a spreadsheet in minutes. Zero painful onboarding, frictionless velocity from day one.',
    Icon: IconSwap,
  },
];

export const MINI_BOARD = [
  {
    name: 'To do',
    cards: [
      { title: 'Write release notes', tag: 'Docs', who: 'JR' },
      { title: 'Set up referral emails', tag: 'Growth', who: 'MK' },
    ],
  },
  {
    name: 'In progress',
    cards: [
      { title: 'Redesign pricing page', tag: 'Web', who: 'AL' },
      { title: 'Fix checkout bug', tag: 'Payments', who: 'EK' },
    ],
  },
  {
    name: 'Done',
    cards: [
      { title: 'Onboarding survey', tag: 'Web', who: 'SC' },
      { title: 'Add Stripe test mode', tag: 'Payments', who: 'EK' },
    ],
  },
];

export const THREAD_MESSAGES = [
  {
    who: 'MK',
    name: 'Mika',
    time: '9:12',
    text: 'New pricing layout is in. Can someone check the annual toggle?',
  },
  {
    who: 'SC',
    name: 'Sam',
    time: '9:40',
    text: 'On it. The yearly price wraps on small phones, I’ll attach a screenshot.',
  },
  {
    who: 'JR',
    name: 'Jordan',
    time: '10:05',
    text: 'Once that’s fixed I’ll move this to Done and tell the launch channel.',
  },
];

/* start and width are percentages of the track */
export const TIMELINE_ROWS = [
  { name: 'Sarah', bar: 'Design tokens', tone: 'ink', start: 1, width: 60 },
  { name: 'Alex', bar: 'Webhook Sync', tone: 'grey', start: 15, width: 45 },
  { name: 'Maya', bar: 'QA Automation', tone: 'lime', start: 8, width: 72 },
];

export const TIMELINE_TODAY = 0.46;

export const IMPORT_SOURCES = [
  { value: 'Trello', label: 'Trello', Icon: IconTrello },
  { value: 'Asana', label: 'Asana', Icon: IconAsana },
  { value: 'spreadsheet', label: 'Spreadsheet', Icon: IconSheet },
];

export const importSteps = (source) => [
  `Connected to ${source}`,
  'Found 48 tasks and 3 boards',
  'Matched 6 teammates by email',
  'Kept due dates, labels and comments',
];

/* ---------- Hero intro: the tools Novi replaces ---------- */
export const INTRO_TABS = ['Slack', 'Docs', 'Jira', 'Sheets', 'Email'];

/* ---------- Customers (fictional companies and people) ---------- */
export const LOGOS = [
  'Lumen',
  'Fieldnote',
  'Northbeam',
  'Parcel',
  'Oakline',
  'Brightwork',
  'Tidewater',
  'Kiln',
];

export const TESTIMONIALS = [
  {
    quote:
      'We dropped three tools in a week. Standups got shorter because the board already answers ‘where is this at?’',
    name: 'Priya Natarajan',
    role: 'Founder, Fieldnote',
    who: 'PN',
  },
  {
    quote:
      'Client feedback finally lives on the task it’s about. Nobody digs through email before a handoff anymore.',
    name: 'Marco Bellini',
    role: 'Studio lead, Parcel',
    who: 'MB',
  },
  {
    quote:
      'The Trello import took four minutes. We were planning the next sprint in Novi the same afternoon.',
    name: 'Hana Okafor',
    role: 'Product manager, Lumen',
    who: 'HO',
  },
];

/* ---------- Pricing (per person, per month) ---------- */
export const FREE_SEATS = 5;

export const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    blurb: 'For tiny teams finding their rhythm.',
    monthly: 0,
    annual: 0,
    cta: 'Start free',
    perks: [
      'Up to 5 people',
      'Unlimited boards and tasks',
      'Threads on every task',
      'Import from Trello and Asana',
    ],
  },
  {
    id: 'team',
    name: 'Team',
    blurb: 'For teams shipping every week.',
    featured: true,
    monthly: 9,
    annual: 7,
    cta: 'Start 14-day trial',
    perks: [
      'Everything in Starter',
      'Shared timeline and milestones',
      'Guests for clients and contractors',
      'Sprint reports',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    blurb: 'For agencies juggling many clients.',
    monthly: 16,
    annual: 13,
    cta: 'Try Business free',
    perks: [
      'Everything in Team',
      'Separate client workspaces',
      'SSO and audit log',
      'Priority support',
    ],
  },
];

/* ---------- Footer ---------- */
export const FOOTER_LINKS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Boards', href: '#features' },
      { label: 'Timeline', href: '#features' },
      { label: 'Integrations', href: URLS.integrations },
      { label: 'Pricing', href: URLS.pricing },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: URLS.about },
      { label: 'Careers', href: URLS.careers, badge: 'Hiring' },
      { label: 'Blog', href: URLS.blog },
      { label: 'Contact', href: URLS.contact },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: URLS.privacy },
      { label: 'Terms', href: URLS.terms },
      { label: 'Security', href: URLS.security },
    ],
  },
]
  .map((group) => ({ ...group, links: withHref(group.links) }))
  .filter((group) => group.links.length);

export const LEGAL_LINKS = withHref([
  { label: 'Privacy', href: URLS.privacy },
  { label: 'Terms', href: URLS.terms },
]);

export const SOCIALS = withHref([
  { label: 'Novi on X', href: URLS.x, Icon: IconX },
  { label: 'Novi on LinkedIn', href: URLS.linkedin, Icon: IconLinkedIn },
  { label: 'Novi on GitHub', href: URLS.github, Icon: IconGitHub },
  { label: 'Novi on Instagram', href: URLS.instagram, Icon: IconInstagram },
]);
