# The Wild Oasis 🏨

An internal hotel management dashboard built for staff to handle day-to-day operations — bookings, cabins, check-ins, and analytics — in one place.

**Live demo → [hms-oasis.netlify.app](https://hms-oasis.netlify.app/)**

![Dashboard Preview](/public/img/dashboard.png)

## Features

**Bookings** — View, filter, sort, and paginate all bookings. Manage the full guest lifecycle: check-in with payment confirmation and optional breakfast upsell, and check-out.

**Cabins** — Manage cabin listings with image uploads, pricing, capacity, and discount configuration.

**Dashboard** — At-a-glance KPIs (sales, occupancy, check-ins) with a today's activity feed, sales chart, and stay duration breakdown, filterable by the last 7, 30, or 90 days.

**Settings** — Configure breakfast pricing, min/max nights, and max guests per booking.

**Auth & Accounts** — Supabase-backed authentication. Staff can update their name, avatar, and password. Existing users can register new accounts.

**UX** — Dark/light/system theme toggle, URL-driven filters and pagination, and toast notifications throughout.

## Tech Stack

|              |                                    |
| ------------ | ---------------------------------- |
| Framework    | React 19 + Vite                    |
| Routing      | React Router v7                    |
| Styling      | Tailwind CSS v4                    |
| Components   | Radix UI / shadcn-ui               |
| Server State | TanStack Query v5                  |
| Tables       | TanStack Table v8                  |
| Forms        | React Hook Form + Zod              |
| Charts       | Recharts                           |
| Backend      | Supabase (Auth, Database, Storage) |

## Getting Started

```bash
git clone https://github.com/your-username/the-wild-oasis.git
cd the-wild-oasis
npm install
```

Create a `.env` file at the root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

```bash
npm run dev
```

## Screenshots

![Bookings](/public/img/bookings.png)
![cabins](/public/img/cabins.png)
