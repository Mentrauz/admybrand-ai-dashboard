# Analytics Insights Dashboard 📊

A polished analytics experience for digital marketing teams built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**. It ships with real-time-like KPI cards, live charts, rich tables, and themed navigation across multiple analytics surfaces.

## What’s inside
- **Landing & marketing**: animated hero, feature highlights, testimonial and CTA sections (`/`).
- **Interactive dashboards**: KPI cards with live updates, charts (line/bar/pie), and customer data tables with filtering, sorting, pagination, and CSV export (`/dashboard`, `/analytics`).
- **Domain pages**: dedicated views for revenue, users, reports, and profile management (`/revenue`, `/users`, `/reports`, `/dashboard/profile`).
- **Theming & UX**: light/dark toggle, responsive layouts, animated transitions, and mobile-ready navigation drawer.
- **Data layer**: API routes backed by MongoDB when available, with automatic mock-data fallback so the UI stays functional without a database.

## Tech Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui (Radix primitives) + next-themes
- Recharts for visualizations, date-fns for date handling
- Mongoose for persistence (optional; mocked data when no DB)

## Getting Started
### Prerequisites
- Node.js **18.17+**
- npm

### Setup
```bash
git clone <repo-url>
cd analytics-dashboard
npm install

# start dev server (Turbo)
npm run dev
```
Visit http://localhost:3000.

### Build & serve production
```bash
npm run build
npm start
```

## Environment
Create `.env.local` (only needed if you want real MongoDB persistence):
```bash
MONGODB_URI=mongodb://localhost:27017/analytics-dashboard
```
- If `MONGODB_URI` is unset or the DB is unreachable, the API automatically serves and updates mock data so the UI still works.

## Scripts
- `npm run dev` — start Next.js dev server (Turbo)
- `npm run build` — production build
- `npm run start` — start built app
- `npm run lint` — lint with Next.js defaults

## API Routes (app/api)
- `GET /api/dashboard` — returns KPI, revenue, traffic, and performance data (seeds collections when empty; falls back to mock data if no DB).
- `PUT /api/dashboard` — simulates live updates (used by the frontend polling interval for KPI/cards/charts).
- `POST /api/dashboard` — background trigger to refresh data without returning payload.
- `GET /api/customers` — paginated + filterable customers.
  - Query params: `page`, `limit`, `search`, `status`, `region`, `sortField`, `sortOrder`.
  - Responds with `{ data, pagination: { total, page, limit, totalPages } }`; uses mock data when DB is unavailable.
- `POST /api/customers` — create a customer record (requires DB connectivity).

## UI Routes
- `/` — Landing page with CTAs into the dashboard.
- `/dashboard` — Core dashboard shell with KPI cards, charts, data table, notifications/settings trays, and theme toggle.
- `/analytics` — Tabbed deep-dive analytics (overview/traffic/performance/insights) reusing live cards, charts, and table.
- `/revenue` — Revenue KPIs, streams, customer segments, and forecasting views.
- `/users` — User metrics, segmentation, engagement, and directory views.
- `/reports` — Generated/scheduled reports, templates, and categories with export controls.
- `/dashboard/profile` — Profile and account preferences page.

## Data & Live Behavior
- KPI cards poll `PUT /api/dashboard` every ~8s; charts poll every ~10s for fresh data.
- Customer table fetches on filter/sort/page changes and supports CSV export from the UI.
- All data interactions degrade gracefully to mock datasets when MongoDB is not configured.

## Customization
- Colors and design tokens: `tailwind.config.ts`
- UI primitives: `components/ui/`
- Charts/tables/KPI logic: `components/charts-section.tsx`, `components/data-table-section.tsx`, `components/kpi-cards.tsx`
- Navigation and theming: `components/app-sidebar.tsx`, `components/theme-provider.tsx`

## Deployment
Optimized for Vercel (Next.js 14). Ensure `MONGODB_URI` is set in the host environment if you want persistent data; otherwise the app will serve mock data.

## Contributing
1. Create a feature branch
2. Make your changes + add tests/docs as needed
3. Open a PR
