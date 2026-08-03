<h1 align="center">Venture</h1>

<p align="center">
  A landing page and app shell for <strong>ComplyEasy AI</strong> — a compliance tracker that keeps businesses on top of licenses, certificates, and regulatory deadlines.<br/>
  Built with React, TypeScript, and Vite.
</p>

<p align="center">
  🚧 <strong>Work in progress.</strong> This README describes the project as it stands right now and will be updated as features land — see <a href="#status--roadmap">Status &amp; roadmap</a> for what's real vs. planned.
</p>

## Table of contents

- [Overview](#overview)
- [Status & roadmap](#status--roadmap)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Routes](#routes)
- [Styling](#styling)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Overview

Venture is the codebase for **ComplyEasy AI**, a product aimed at businesses that need to track compliance certificates, licenses, and regulatory deadlines without falling back on spreadsheets and sticky notes. The pitch: track everything in one place, get intelligent reminders before things expire, and ask an AI assistant plain-English questions about your compliance status.

Right now the repo is a single-page marketing/landing experience plus routing stubs for the parts of the app that don't exist yet. There's no backend, no auth, and no real dashboard — this is the shell the product will be built into.

## Status & roadmap

This project changes shape often, so treat anything below as a snapshot rather than a promise.

**What's built:**
- Landing page (`/`) — hero section, feature grid, navbar, all styled with Tailwind
- Client-side routing scaffolding via `react-router-dom`

**What's stubbed (routes exist, no real content yet):**
- `/login` — renders a placeholder heading only
- `/dashboard` — renders a placeholder heading only

**What's not started:**
- Authentication / accounts
- Any backend or database
- The actual certificate/license tracking functionality
- Reminders/notifications
- The AI compliance assistant
- Pricing page (linked from the navbar, route doesn't exist yet)
- A `/register` route (linked from the landing page's CTA, route doesn't exist yet)

If you're reading this some time after it was written, the code is the source of truth over this list — check `src/App.tsx` for the current routes.

## Tech stack

| Layer | Technology |
|---|---|
| Framework | [React](https://react.dev) 19 |
| Build tool | [Vite](https://vitejs.dev) |
| Language | TypeScript |
| Routing | [react-router-dom](https://reactrouter.com) v6 |
| Styling | [Tailwind CSS](https://tailwindcss.com) v4 (via `@tailwindcss/vite`) |
| Linting | ESLint (`typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`) |

## Getting started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Installation

```bash
git clone https://github.com/DRmadebot/Projects.git
cd Projects/Venture
npm install
```

### Running the app

```bash
npm run dev
```

This starts the Vite dev server (with hot module reload) and prints a local URL — open it in your browser to view the landing page.

No environment variables or API keys are required yet, since there's no backend to talk to.

## Project structure

```
Venture/
├── src/
│   ├── pages/
│   │   └── Landing.tsx        The marketing landing page (hero + feature grid)
│   ├── components/
│   │   ├── Navbar.tsx         Top nav: logo, Features/Pricing links, Login/Get Started
│   │   └── FeatureCard.tsx    Reusable card for a single feature (title + description)
│   ├── assets/                 Hero image and Vite/React starter icons
│   ├── App.tsx                 Route definitions (BrowserRouter + Routes)
│   ├── main.tsx                 App entry point, mounts <App/> to #root
│   ├── index.css                Tailwind import
│   └── App.css                  Leftover styling from the Vite starter template (currently unused)
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── index.html                   HTML entry point, page title still "venture"
├── vite.config.ts               Vite config (React + Tailwind plugins)
├── eslint.config.js
└── tsconfig*.json
```

## Routes

Defined in `src/App.tsx`:

| Path | Renders |
|---|---|
| `/` | `Landing` — the full marketing page |
| `/login` | Placeholder `<h1>Login page</h1>` |
| `/dashboard` | Placeholder `<h1>Dashboard</h1>` |

The navbar and landing page also link out to `/register`, `/features`, and `/pricing`, which don't have routes defined yet — clicking those in the current build will render nothing (no matching `<Route>`, no catch-all/404 page either).

## Styling

Styling is done entirely with Tailwind utility classes inline in components — there's no separate design system or component library yet. `src/App.css` is left over from the default Vite + React starter template and isn't imported anywhere, so it currently has no effect; it's flagged here so nobody spends time debugging styles that live in a dead file.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check (`tsc -b`) then build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

## Contributing

This is early and moving fast — if you're picking up work here, it's worth confirming with whoever's driving the project before starting on anything not listed under "What's not started" above, since priorities are likely to shift. Run `npm run lint` before submitting a PR.

## License

No license file yet — treat this as all-rights-reserved until one is added.