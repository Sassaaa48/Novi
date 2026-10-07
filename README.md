# Novi landing page

A responsive landing page for **Novi**, a project and task management tool for small, fast moving teams.
Built with React 18 and Vite, with plain CSS. No UI libraries.

## Run it

Requires Node 18 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview    # serve the production build locally
npm run format     # format everything with Prettier (format:check to verify)
```

## Deploy

- **Vercel / Netlify:** import the repo. Build command `npm run build`, output directory `dist`.
- **GitHub Pages:** set `base: '/<repo-name>/'` in `vite.config.js`, build, and publish `dist`.

## What's on the page

| Section      | What it does                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nav          | Floating sticky pill with a segmented link group (highlights Features while that section is in view), Log in (opens the sign-in dialog) and Start free. Collapses to a menu icon below 820px. Closes on Escape or link tap.                                                                                                                                                                                                                                                                                                                       |
| Hero         | Centred headline, two buttons and a live demo board. On load, the headline rises in word by word, then the tools Novi replaces (Slack, Docs, Jira, Sheets, Email) collapse into the board. Drag cards between columns, tap a card's circle (or the Done chip on a finished task), filter by All / My tasks / Sprint 14, search, or add cards with +. **See how it works** plays a guided demo: a ghost cursor drags a card, filters the board and ships a task, with a caption for each step. Any click, key, scroll or touch hands control back. |
| Features     | Scroll-driven list beside a sticky canvas. Whichever feature crosses the middle of the screen becomes active, or click one. On phones, tapping a feature scrolls its demo into view. Each has a working demo: a sprint board, a task thread you can reply to, an animated timeline, and a simulated Trello/Asana/spreadsheet import.                                                                                                                                                                                                              |
| CTA band     | White card with Start free trial and Schedule demo.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Signup modal | Start free and Log in open a native `<dialog>` (sign-up or sign-in copy) with email validation.                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Footer       | Full-width dark panel with rounded top corners: tagline, three link groups (Product, Company, Legal), product-updates signup, social icons, the large `novi` wordmark, and a back-to-top button.                                                                                                                                                                                                                                                                                                                                                  |

## Project structure

```
src/
  main.jsx                 entry, imports the stylesheets
  App.jsx                  page layout and signup modal state
  data.js                  all copy, demo data and link lists
  components/
    Nav.jsx  Hero.jsx  HeroBoard.jsx  Features.jsx  CtaBand.jsx
    Customers.jsx  Pricing.jsx   built but not on the page right now
    Footer.jsx  SignupForm.jsx  SignupDialog.jsx
    Logo.jsx  Icons.jsx
    panels/                Panel (shared wrapper), BoardPanel, ThreadsPanel,
                           TimelinePanel, ImportPanel
  hooks/useEmailForm.js    validation shared by both signup forms
  hooks/useReveal.js       fades sections up the first time they scroll into view
  styles/                  base, nav, hero, features, sections, cta, modal, footer
```

## Links

Every destination outside the page lives in the `URLS` object at the top of `src/data.js`.
Anything set to `null` is hidden: nav items, footer links, whole footer columns, social icons,
the Privacy/Terms links and Schedule demo. Items set to `'#'` show as placeholders. Fill in a real URL to link them.

## Design decisions

- **Colour:** a warm off-white page, near-black ink and a single lime accent for actions, progress and the brand mark. The footer inverts to a dark card. Everything is defined as CSS variables in `base.css`.
- **Type:** Inter for UI and body text, Instrument Serif (often italic) for editorial headlines, JetBrains Mono for small technical labels. All have fallbacks.
- **Hero:** the product itself is the hero graphic. A working board says more about a task tool than an illustration would.
- **Motion:** one page-load story that acts out the headline: the words rise in, then five app tabs collapse into the board and its cards rise. Sections fade up once as they scroll in. After that, motion answers a user action: moving a card, switching a feature, sending a reply, running an import, changing a price. Everything respects `prefers-reduced-motion`.
- **Features as a scroll story:** on wide screens the canvas stays put while the list scrolls, and a lime rail shows progress. Below 900px it becomes a simple stacked list with tap-to-switch.

## Technical decisions

- **Styling:** plain CSS with design tokens (CSS variables), one stylesheet per section. Each file keeps its own media queries, so a section's layout lives in one place. On a bigger app I'd move to CSS Modules for scoped class names. Formatted with Prettier.
- **State:** local `useState` only. The page is small enough that a store would add weight and no clarity.
- **Accessibility:**
  - Each feature title is a real `<h3>` containing a disclosure button (`aria-expanded`, `aria-controls`) for its demo panel.
  - Every interactive element has a visible focus ring.
  - Cards can be moved with the keyboard through their circle button, not only by dragging.
  - The modal uses native `<dialog>` for focus trapping and Escape.
  - Status messages use `aria-live`, and `prefers-reduced-motion` is respected.
  - Text colours meet WCAG AA contrast (4.5:1), including the faded, inactive features.
- **Responsive:** breakpoints at 1020px, 820px and 640px. The footer collapses to two columns on phones.
- **Panels stay mounted** (hidden, not unmounted) so a reply you typed or an import you ran isn't lost when you switch tabs.
- **No backend:** signup forms validate the email and show a success message only.
- **Drag and drop** uses pointer events, so it works with mouse and touch. On touch, press and hold to pick a card up, so ordinary swipes still scroll. Dragging near the top or bottom of the screen auto-scrolls.

## Ideas for next steps

- Persist the demo board in `localStorage`.
- A dark theme.
- A ⌘K command palette, to show off the keyboard-first side of the product.
# Novi
