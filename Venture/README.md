<h1 align="center">Venture</h1>

<p align="center">
  A React/TypeScript frontend and FastAPI backend for <strong>ComplyEasy AI</strong> — a compliance tracker that keeps businesses on top of licenses, certificates, and regulatory deadlines.
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
- [Backend API](#backend-api)
- [Styling](#styling)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Overview

Venture is the codebase for **ComplyEasy AI**, a product aimed at businesses that need to track compliance certificates, licenses, and regulatory deadlines without falling back on spreadsheets and sticky notes. The pitch: track everything in one place, get intelligent reminders before things expire, and ask an AI assistant plain-English questions about your compliance status.

The repo now has two moving parts: a Vite/React frontend (marketing page + login/register/dashboard) and a FastAPI backend (`backend/`) with user accounts, JWT auth, and certificate storage backed by SQLite. The dashboard pulls live stats and certificate data from the API.

## Status & roadmap

This project changes shape often, so treat anything below as a snapshot rather than a promise.

**What's built:**
- Landing page (`/`) — hero section, feature grid, navbar, all styled with Tailwind
- Login (`/login`) — real form, posts credentials to the backend, stores the returned JWT in `localStorage`, redirects to `/dashboard`
- Register (`/register`) — form with client-side validation (required fields, password match, min length), but **does not yet call the backend** — submitting doesn't create an account
- Dashboard (`/dashboard`) — fetches live stats and certificate data from `GET /dashboard` and renders them via `StatCard`/`CertificateCard` components
- Backend API (FastAPI + SQLite via SQLAlchemy):
  - `POST /register` — creates a user (bcrypt-hashed password)
  - `POST /login` — verifies credentials, returns a JWT access token
  - `GET /protected` — example authenticated route
  - `GET /dashboard` — computes active/expiring/expired counts and a compliance score for the logged-in user's certificates
  - `POST /certificates` / `GET /certificates` — create and list certificates for the logged-in user

**What's stubbed or incomplete:**
- `ProtectedRoute` hardcodes `isAuthenticated = true` — the dashboard route isn't actually gated by the JWT yet, so route protection doesn't do anything real
- Register page doesn't submit to `POST /register` — the backend endpoint exists but the frontend form isn't wired to it
- No logout logic — the sidebar has a Logout button with no handler
- "Add Certificate" button on the dashboard has no handler yet — there's no UI flow for creating a certificate, even though the backend endpoint exists
- No token refresh/expiry handling on the frontend

**What's not started:**
- The AI compliance assistant (linked in the dashboard sidebar, no functionality behind it)
- Reminders/notifications
- Pricing page (linked from the navbar, route doesn't exist yet)
- Any automated tests

If you're reading this some time after it was written, the code is the source of truth over this list — check `src/App.tsx` for frontend routes and `backend/main.py` for API endpoints.

## Tech stack

**Frontend**

| Layer | Technology |
|---|---|
| Framework | [React](https://react.dev) 19 |
| Build tool | [Vite](https://vitejs.dev) |
| Language | TypeScript |
| Routing | [react-router-dom](https://reactrouter.com) v6 |
| HTTP client | [axios](https://axios-http.com) |
| Styling | [Tailwind CSS](https://tailwindcss.com) v4 (via `@tailwindcss/vite`) |
| Linting | ESLint (`typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`) |

**Backend**

| Layer | Technology |
|---|---|
| Framework | [FastAPI](https://fastapi.tiangolo.com) |
| ORM | SQLAlchemy |
| Database | SQLite (`complyeasy.db`) |
| Auth | JWT (`python-jose`) + bcrypt password hashing (`passlib`) |
| Server | Uvicorn |

## Getting started

### Prerequisites

- Node.js (LTS recommended)
- Python 3.10+ and pip
- npm

### Frontend setup

```bash
git clone https://github.com/DRmadebot/Projects.git
cd Projects/Venture
npm install
npm run dev
```

This starts the Vite dev server (with hot module reload) and prints a local URL — open it in your browser.

### Backend setup

```bash
cd Projects/Venture/backend
pip install -r requirements.txt
```

Create a `.env` file in `backend/` with a JWT signing secret:

```
SECRET_KEY=your-secret-key-here
```

Then start the API:

```bash
uvicorn main:app --reload
```

By default this serves on `http://127.0.0.1:8000`, which is the base URL the frontend's `src/api/api.ts` is hardcoded to point at. CORS is currently locked to `http://localhost:5173` (the default Vite dev server origin) in `backend/main.py`.

The SQLite database file (`complyeasy.db`) is created automatically on first run if it doesn't exist, and tables are created from the SQLAlchemy models on startup.

## Project structure

```
Venture/
├── backend/
│   ├── main.py                  FastAPI app, routes, CORS config
│   ├── models.py                SQLAlchemy models: User, Certificate
│   ├── schemas.py                Pydantic schemas: UserCreate, LoginRequest
│   ├── database.py               SQLAlchemy engine/session setup (SQLite)
│   ├── auth.py                   Password hashing (bcrypt via passlib)
│   ├── security.py               JWT creation/verification
│   ├── requirements.txt
│   └── complyeasy.db             SQLite database file
├── src/
│   ├── pages/
│   │   ├── Landing.tsx            Marketing landing page (hero + feature grid)
│   │   ├── Login.tsx              Login form, calls POST /login, stores JWT
│   │   ├── Register.tsx           Register form (validation only, not wired to API yet)
│   │   └── Dashboard.tsx          Fetches and renders stats + certificates from GET /dashboard
│   ├── components/
│   │   ├── Navbar.tsx              Top nav: logo, Features/Pricing links, Login/Get Started
│   │   ├── FeatureCard.tsx         Reusable card for a single feature (title + description)
│   │   ├── StatCard.tsx            Dashboard stat tile (title, value, description)
│   │   ├── CertificateCard.tsx     Dashboard certificate tile
│   │   └── ProtectedRoute.tsx      Route guard (currently hardcoded to always allow access)
│   ├── api/
│   │   └── api.ts                  Axios instance, base URL http://127.0.0.1:8000, attaches JWT from localStorage
│   ├── assets/                     Hero image and Vite/React starter icons
│   ├── App.tsx                     Route definitions (BrowserRouter + Routes)
│   ├── main.tsx                    App entry point, mounts <App/> to #root
│   ├── index.css                   Tailwind import
│   └── App.css                     Leftover styling from the Vite starter template (currently unused)
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── index.html                     HTML entry point, page title still "venture"
├── vite.config.ts                 Vite config (React + Tailwind plugins)
├── eslint.config.js
└── tsconfig*.json
```

## Routes

Defined in `src/App.tsx`:

| Path | Renders | Notes |
|---|---|---|
| `/` | `Landing` — the full marketing page | |
| `/login` | `Login` | Posts to backend `/login`, stores JWT, redirects to `/dashboard` |
| `/register` | `Register` | Client-side validation only; not yet connected to backend `/register` |
| `/dashboard` | `Dashboard` (wrapped in `ProtectedRoute`) | Fetches live data from `/dashboard`; route guard is currently a no-op |

The navbar and landing page also link out to `/pricing`, which doesn't have a route defined yet — clicking it in the current build will render nothing (no matching `<Route>`, no catch-all/404 page either).

## Backend API

Base URL: `http://127.0.0.1:8000` (CORS restricted to `http://localhost:5173`)

| Method & path | Auth required | Description |
|---|---|---|
| `GET /` | No | Health check, returns a status message |
| `POST /register` | No | Create a user (`name`, `email`, `password`) |
| `POST /login` | No | OAuth2 password form (`username` = email, `password`); returns a bearer JWT |
| `GET /protected` | Yes | Example route that just confirms the token is valid |
| `GET /dashboard` | Yes | Returns compliance stats and the caller's certificates |
| `POST /certificates` | Yes | Create a certificate (`name`, `authority`, `expiry_date`) for the caller |
| `GET /certificates` | Yes | List the caller's certificates |

Authenticated routes expect `Authorization: Bearer <token>`. Compliance score and status (`Active` / `Expiring Soon` / `Expired`) are computed server-side on every `GET /dashboard` call based on each certificate's `expiry_date` relative to the current time.

## Styling

Styling is done entirely with Tailwind utility classes inline in components — there's no separate design system or component library yet. `src/App.css` is left over from the default Vite + React starter template and isn't imported anywhere, so it currently has no effect; it's flagged here so nobody spends time debugging styles that live in a dead file.

## Scripts

**Frontend** (run from `Venture/`)

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check (`tsc -b`) then build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

**Backend** (run from `Venture/backend/`)

| Command | Description |
|---|---|
| `uvicorn main:app --reload` | Start the FastAPI dev server with auto-reload |

## Contributing

This is early and moving fast — if you're picking up work here, it's worth confirming with whoever's driving the project before starting on anything not listed under "What's not started" above, since priorities are likely to shift. Run `npm run lint` before submitting a PR, and don't commit `backend/.env` or `backend/complyeasy.db`.

## License

No license file yet — treat this as all-rights-reserved until one is added.
