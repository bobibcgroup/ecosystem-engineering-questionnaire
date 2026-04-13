# Ecosystem Engineering Questionnaire

A full-stack strategic questionnaire application for Saudi Bridge ecosystem engineering. Covers 17 sections and 60+ questions across positioning, pipeline, narrative, distribution, and sustainability.

## Quick Setup (5 commands)

```bash
git clone https://github.com/bobibcgroup/ecosystem-engineering-questionnaire.git
cd ecosystem-engineering-questionnaire
npm install
npx prisma generate && npx prisma db push
npm run dev
```

## Running Locally

```bash
# 1. Copy environment file
cp .env.example .env.local

# 2. Edit .env.local with your passwords
# APP_PASSWORD — used by respondents to access the questionnaire
# ADMIN_PASSWORD — used to access the admin dashboard
# NEXTAUTH_SECRET — any long random string (generate one: openssl rand -base64 32)

# 3. Set up the database
npx prisma generate
npx prisma db push

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Changing Passwords

Edit `.env.local`:

```env
APP_PASSWORD="your-new-password"
ADMIN_PASSWORD="your-new-admin-password"
```

Restart the dev server for changes to take effect.

## Accessing Admin

1. Go to [http://localhost:3000/login](http://localhost:3000/login)
2. Enter the `ADMIN_PASSWORD` (default: `admin2024`)
3. You will be redirected to the admin dashboard at `/admin`

The admin dashboard shows all respondents, their completion percentage, and submission status.

## Exporting Responses

From the admin dashboard:
- **Export CSV** — one row per respondent, one column per question
- **Export JSON** — structured JSON with sections and Q&A pairs
- **Copy All** — copies the full JSON to clipboard

You can also view individual respondent detail pages and print them.

## Tech Stack

- **Next.js 16** — App Router, server components, API routes
- **TypeScript** — strict mode throughout
- **Tailwind CSS v4** — utility-first styling
- **Framer Motion** — step transitions and animations
- **Prisma + SQLite** — local database, zero setup
- **NextAuth.js v4** — credentials-based password auth
- **papaparse** — CSV export

## Deployment Notes (Vercel)

When deploying to Vercel, SQLite will not persist across deployments because the filesystem is ephemeral. For production use, switch to a persistent database:

- **Vercel Postgres** (Neon) — recommended for Vercel deployments
- **Supabase** — PostgreSQL-compatible alternative
- **PlanetScale** — MySQL-compatible alternative

Change `prisma/schema.prisma` datasource provider from `sqlite` to `postgresql` and update `DATABASE_URL` accordingly.

Environment variables to set in Vercel:
```
DATABASE_URL=<your-production-db-url>
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>
APP_PASSWORD=<your-app-password>
ADMIN_PASSWORD=<your-admin-password>
```
