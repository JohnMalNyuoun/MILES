# MILES

MILES is a monorepo with an Express + MongoDB backend and a React + Vite frontend.

## Repository Layout

- `Backend/`: API server, database models, controllers, routes, seed/create scripts.
- `Frontend/MILES/`: React app (Vite).
- `render.yaml`: deployment configuration.

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB connection string

## Environment Variables

Create `Backend/.env` with at least:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
MILES_REGISTRATION_SECRET=your_org_admin_secret
ADMIN_REGISTRATION_SECRET=your_org_admin_secret
OFFICIAL_MILES_EMAIL=milesproject@gmail.com
GMAIL_USER=milesproject@gmail.com
GMAIL_APP_PASSWORD=your_gmail_app_password
```

Notes:

- `MILES_REGISTRATION_SECRET` and `ADMIN_REGISTRATION_SECRET` are both checked in the code path for admin-related registration flows.
- `OFFICIAL_MILES_EMAIL` is used by the locked official admin registration route.
- `GMAIL_USER` + `GMAIL_APP_PASSWORD` enable the real outbound mailer (welcome emails to subscribers, programme invitations, and password-reset codes). `GMAIL_APP_PASSWORD` must be a [Google App Password](https://myaccount.google.com/apppasswords), not your normal Gmail password.

## Install

From repo root:

```bash
npm run install:all
```

## Run Modes

### 1. Full development (recommended)

From `Backend/`:

```bash
npm run dev:full
```

This runs:

- Backend API on `http://localhost:3000`
- Frontend Vite dev server on `http://localhost:5173`

The frontend API proxy now reads `VITE_BACKEND_URL` (defaults to `http://localhost:3000`).

Use port `5173` for live frontend changes (HMR).

### 2. One-port/backend-served frontend

From repo root:

```bash
npm run start:one-port
```

Important:

- Backend serves static files from `Frontend/MILES/dist`.
- Source edits in `Frontend/MILES/src` are not visible until rebuilding frontend.
- Rebuild frontend when using one-port mode:

```bash
npm --prefix Frontend/MILES run build
```

## Common Scripts

### Root

- `npm run install:all`: install backend + frontend dependencies.
- `npm run build`: install frontend deps and build frontend.
- `npm run start`: build frontend then start backend.
- `npm run start:one-port`: install all, build frontend, then start backend.

### Backend (`Backend/package.json`)

- `npm start`: start server.
- `npm run dev`: watch mode for backend.
- `npm run dev:full`: backend + frontend dev together.
- `npm run seed:team`: upsert default leadership team.
- `npm run seed:projects`: seed project records.
- `npm run create:admin -- "Name" "username" "email@example.com" "password"`: create admin login account in `User` collection.

## Data and Auth Notes (Important for Contributors)

Current code has two admin-related collections and flows:

- `User` collection:
	- Used for login at `POST /api/auth/login`.
	- JWT currently issues role as admin for successful login.
	- Used by dashboard login and most admin dashboard authorization checks.

- `Admin` collection:
	- Used by `POST /api/auth/register-new-admin` (official admin profile flow).
	- Also used by pending action/verification style logic in admin workflows.

If you refactor auth later, coordinate both flows to avoid contributor confusion.

## Key API Areas

- Auth:
	- `POST /api/auth/register`
	- `POST /api/auth/login`
	- `POST /api/auth/register-new-admin`
- Admin:
	- `GET /api/admin/dashboard`
	- `POST /api/admin/users/admin`
	- pending actions routes in `Backend/routes/adminRoutes.js`
- Content CMS:
	- `GET /api/content`
	- admin update routes in content/admin routes
- Team:
	- `GET /api/team?profile=team|mothers`
- Workshops:
	- `GET/POST/PUT/DELETE /api/workshops`
	- `GET/POST/DELETE /api/workshop-posts`

## Team Data Recovery / Reseed

If team records are accidentally removed:

```bash
cd Backend
npm run seed:team
```

This upserts the default leadership members defined in `Backend/scripts/seedTeam.js`.

## Frontend Admin Dashboard Notes

- Main dashboard cards are in `Frontend/MILES/src/components/AdminDashboard.jsx`.
- Styling is centralized in `Frontend/MILES/src/App.css`.
- If dashboard layout changes do not appear on integrated backend port, rebuild frontend dist.
- Team members can be added from admin in the `Add Team Member` dashboard section.

## Deployment

- Render deployment config is in `render.yaml`.
- Ensure required environment variables are configured in Render dashboard.

## Contributor Checklist

- Keep backend and frontend changes in sync when feature behavior spans both.
- For UI work: validate in Vite dev mode and one-port built mode.
- For API/schema changes: update docs and any related seed scripts.
- Avoid direct database mutations outside scripts unless required for urgent maintenance.