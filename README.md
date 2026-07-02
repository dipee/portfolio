# Dipendra Nath — Portfolio

Personal portfolio website for **Dipendra Nath**, a Full-Stack Developer. Built with Next.js and TypeScript, it showcases projects, skills, and background in a fast, responsive interface. **Frontend and backend deploy together** on a single host (e.g. Vercel).

## Features

- **Home** — Hero section, featured projects, and call-to-action links
- **Projects** — Curated work loaded from PostgreSQL
- **Blog** — Published technical articles from the database
- **Skills** — JavaScript ecosystem, Python, DevOps, and database proficiency
- **About** — Career timeline, philosophy, and technical evolution
- **REST API** — `GET /api/projects`, `GET /api/blog`, and detail routes
- SEO-friendly metadata and Open Graph tags
- Material Design–inspired dark theme with Tailwind CSS

## Tech Stack

| Category | Technologies |
|----------|-------------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI | [React 19](https://react.dev/), [Tailwind CSS 3](https://tailwindcss.com/) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Database | [PostgreSQL](https://www.postgresql.org/) via [Prisma 6](https://www.prisma.io/) |
| Fonts | Space Grotesk, Manrope, Material Symbols |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18.18 or later
- npm (included with Node.js)
- A PostgreSQL database ([Neon](https://neon.tech), [Supabase](https://supabase.com), or Vercel Postgres)

### Installation

```bash
git clone https://github.com/dipee/portfolio.git
cd portfolio
npm install
```

### Database setup

1. Copy the environment template:

   ```bash
   cp .env.example .env.local
   ```

2. Set `DATABASE_URL` in `.env.local` to your Postgres connection string. On serverless hosts, prefer the **pooled** connection URL when your provider offers one.

3. Push the schema and seed data:

   ```bash
   npm run db:push
   npm run db:seed
   ```

   For migration history instead of `db:push`:

   ```bash
   npm run db:migrate
   npm run db:seed
   ```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Projects and blog content are read from the database at request time.

### Production Build

```bash
npm run build
npm start
```

Requires `DATABASE_URL` at runtime for project/blog pages and API routes.

### Lint

```bash
npm run lint
```

## API (same deployment as the site)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/projects` | List all projects |
| GET | `/api/projects/[id]` | Single project by id |
| GET | `/api/blog` | List published blog posts |
| GET | `/api/blog/[slug]` | Single published post |

## Project Structure

```
prisma/
├── schema.prisma      # Project & BlogPost models
└── seed.ts            # Initial data
src/
├── app/
│   ├── api/           # REST route handlers
│   ├── blog/          # Blog list & post pages
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about/page.tsx
│   ├── projects/page.tsx
│   └── skills/page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ProjectCard.tsx
└── lib/
    ├── prisma.ts      # Prisma client singleton
    ├── projects.ts    # Project queries
    ├── blog.ts        # Blog queries
    ├── types.ts
    └── data.ts        # Skills, timeline, nav (static)
```

## Customization

- **Projects & blog** — Edit via [Prisma Studio](https://www.prisma.io/studio) (`npx prisma studio`), SQL, or re-run `npm run db:seed` after changing `prisma/seed.ts`
- **`skillSections`**, **`timeline`**, **`navLinks`** — `src/lib/data.ts`
- Site-wide metadata — `src/app/layout.tsx`

## Deployment (AWS Lightsail + GHCR)

Images are **built in GitHub Actions** and pushed to **GitHub Container Registry (GHCR)**. Lightsail only **pulls and runs** the image — no build on the server.

```text
GitHub push → Actions (lint, build, docker push) → GHCR → Lightsail (docker pull & up)
```

### One-time Lightsail setup

1. Create a **$5 Lightsail** instance (Ubuntu, **us-east-1**) and attach a **static IP**
2. Open firewall ports **22**, **80**, **443**
3. SSH in, clone the repo, and create `.env`:

   ```bash
   git clone https://github.com/dipee/portfolio.git ~/portfolio
   cd ~/portfolio
   nano .env
   ```

   ```env
   DATABASE_URL="postgresql://..."
   NEXT_PUBLIC_SITE_URL="https://dipendranath.com.np"
   ```

4. Point your domain A record to the static IP; use **Caddy** on port 443 → `127.0.0.1:3000`

### GitHub Actions CI/CD

Every push to **`main`**:

1. Lints and builds the app
2. Runs `prisma migrate deploy`
3. Builds and pushes `ghcr.io/dipee/portfolio:latest`
4. SSHs to Lightsail → `docker compose pull` → `docker compose up -d`

Add these **repository secrets** (Settings → Secrets and variables → Actions):

| Secret | Description |
|--------|-------------|
| `DATABASE_URL` | Neon Postgres connection string |
| `LIGHTSAIL_HOST` | Static IP of your instance |
| `LIGHTSAIL_SSH_KEY` | Private key contents (`.pem` from Lightsail) |
| `GHCR_TOKEN` | Optional — GitHub PAT with **`read:packages`**. If omitted, the workflow uses **`GITHUB_TOKEN`** automatically |
| `LIGHTSAIL_SSH_USER` | Optional — defaults to `ubuntu` |

Make the GHCR package **public** (Packages → portfolio → Change visibility) to skip `GHCR_TOKEN` on the server.

### Manual deploy on the server

```bash
cd ~/portfolio
export GHCR_TOKEN="your_pat_with_read_packages"
bash scripts/deploy.sh
```

Uses `docker-compose.prod.yml` (pull only, no build).

### Local Docker

```bash
cp .env.example .env   # fill in values
docker compose up -d --build
```

`postinstall` runs `prisma generate` during the build. The app uses Next.js **standalone** output for smaller Docker images.

## License

Private project. All rights reserved.
