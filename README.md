# Dipendra Nath — Portfolio

My personal site. I'm a full-stack developer, and this is where I keep my projects, writing, and a bit about how I got here.

It's a Next.js app with a Postgres backend — frontend and API live in the same deployment. I run it on a small Lightsail box with Docker; content (projects and blog posts) comes from the database, and there's a simple admin panel for managing that without touching the code.

## What's here

- **Home** — intro, a few featured projects, and links to the rest of the site
- **Projects** — work I've done, pulled from Postgres
- **Blog** — technical posts, also from the database
- **Skills** — the stack I work with day to day
- **About** — timeline and a bit of background
- **Admin** (`/admin`) — password-protected panel to add, edit, and remove projects and posts
- Public API for projects and blog if you want to poke at the data

Dark theme, Tailwind, nothing too fancy — just fast and readable.

## Stack

| | |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI | [React 19](https://react.dev/), [Tailwind CSS 3](https://tailwindcss.com/) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Database | [PostgreSQL](https://www.postgresql.org/) + [Prisma 6](https://www.prisma.io/) |
| Fonts | Space Grotesk, Manrope, Material Symbols |

## Running it locally

You'll need Node 18.18+, npm, and a Postgres database (I use [Neon](https://neon.tech); Supabase or Vercel Postgres work fine too).

```bash
git clone https://github.com/dipee/portfolio.git
cd portfolio
npm install
cp .env.example .env.local
```

Fill in `.env.local`:

```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
ADMIN_PASSWORD="something-strong"
ADMIN_SESSION_SECRET="a-long-random-string"
```

On serverless hosts, prefer the **pooled** connection URL if your provider gives you one.

Then set up the database and start the app:

```bash
npm run db:push
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Admin lives at `/admin` — log in with the password you set.

If you prefer migrations over `db:push`:

```bash
npm run db:migrate
npm run db:seed
```

Production build is the usual:

```bash
npm run build
npm start
```

`DATABASE_URL` needs to be set at runtime — project pages, blog, and the API all hit the database.

## API

Same app, same host:

| Method | Path | What it does |
|--------|------|--------------|
| GET | `/api/projects` | All projects |
| GET | `/api/projects/[id]` | One project |
| GET | `/api/blog` | Published posts |
| GET | `/api/blog/[slug]` | One post |

Admin routes under `/api/admin/*` require a session cookie (you get that by logging in at `/admin`).

## Layout of the repo

```
prisma/
├── schema.prisma      # Project & BlogPost models
└── seed.ts            # Starter data
src/
├── app/
│   ├── (admin)/       # Admin UI (login, projects, blog)
│   ├── (site)/        # Public pages
│   └── api/           # Public + admin API routes
├── components/
│   ├── admin/         # Forms, nav, login
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ProjectCard.tsx
└── lib/
    ├── auth/          # Session + admin checks
    ├── prisma.ts
    ├── projects.ts
    ├── blog.ts
    └── data.ts        # Skills, timeline, nav (static)
```

## Tweaking content

- **Projects & blog** — use the admin panel at `/admin`, or open [Prisma Studio](https://www.prisma.io/studio) (`npx prisma studio`), or edit `prisma/seed.ts` and re-seed
- **Skills, timeline, nav links** — `src/lib/data.ts`
- **Site metadata** — `src/app/layout.tsx`

## Deploying (AWS Lightsail + GHCR)

I build the Docker image in GitHub Actions and push it to GitHub Container Registry. The Lightsail instance only pulls and runs it — no build on the server.

```text
push to main → Actions (lint, build, push image) → GHCR → Lightsail pulls & restarts
```

### First-time server setup

1. Spin up a cheap Lightsail instance (Ubuntu, us-east-1) and attach a static IP
2. Open ports 22, 80, and 443
3. SSH in, clone the repo, and create a `.env`:

   ```bash
   git clone https://github.com/dipee/portfolio.git ~/portfolio
   cd ~/portfolio
   nano .env
   ```

   ```env
   DATABASE_URL="postgresql://..."
   NEXT_PUBLIC_SITE_URL="https://dipendranath.com.np"
   ADMIN_PASSWORD="your-strong-password"
   ADMIN_SESSION_SECRET="long-random-string"
   ```

4. Point your domain's A record at the static IP, and put Caddy (or similar) on 443 → `127.0.0.1:3000`

### CI/CD

Every push to `main`:

1. Lints and builds the app
2. Runs `prisma migrate deploy`
3. Builds and pushes `ghcr.io/dipee/portfolio:latest`
4. SSHs into Lightsail, pulls the new image, and restarts the container

Secrets you'll need in the GitHub repo (Settings → Secrets and variables → Actions):

| Secret | What it is |
|--------|------------|
| `DATABASE_URL` | Neon (or other) Postgres URL |
| `LIGHTSAIL_HOST` | Static IP of the instance |
| `LIGHTSAIL_SSH_KEY` | Private key (the `.pem` from Lightsail) |
| `GHCR_TOKEN` | Optional — PAT with `read:packages`. If you skip it, the workflow uses `GITHUB_TOKEN` |
| `LIGHTSAIL_SSH_USER` | Optional — defaults to `ubuntu` |

Make the GHCR package public (Packages → portfolio → Change visibility) if you don't want to deal with `GHCR_TOKEN` on the server.

### Manual deploy

If you need to pull and restart by hand:

```bash
cd ~/portfolio
export GHCR_TOKEN="your_pat_with_read_packages"
bash scripts/deploy.sh
```

That uses `docker-compose.prod.yml` (pull only, no build).

### Local Docker

```bash
cp .env.example .env   # fill in the values
docker compose up -d --build
```

`postinstall` runs `prisma generate`. The image uses Next.js standalone output to keep things small.

## License

Private project. All rights reserved.
