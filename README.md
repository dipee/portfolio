# Dipendra Nath — Portfolio

Personal portfolio website for **Dipendra Nath**, a Full-Stack Developer. Built with Next.js and TypeScript, it showcases projects, skills, and background in a fast, responsive interface.

## Features

- **Home** — Hero section, featured projects, and call-to-action links
- **Projects** — Curated work with tags, categories, and GitHub/live links
- **Skills** — JavaScript ecosystem, Python, DevOps, and database proficiency
- **About** — Career timeline, philosophy, and technical evolution
- SEO-friendly metadata and Open Graph tags
- Material Design–inspired dark theme with Tailwind CSS

## Tech Stack

| Category | Technologies |
|----------|-------------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI | [React 19](https://react.dev/), [Tailwind CSS 3](https://tailwindcss.com/) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Fonts | Space Grotesk, Manrope, Material Symbols |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18.18 or later
- npm (included with Node.js)

### Installation

```bash
git clone https://github.com/dipee/portfolio.git
cd portfolio
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout, metadata, Navbar & Footer
│   ├── globals.css      # Global styles and design tokens
│   ├── page.tsx         # Home page
│   ├── about/page.tsx   # About page
│   ├── projects/page.tsx
│   └── skills/page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ProjectCard.tsx
└── lib/
    └── data.ts          # Projects, skills, timeline, and nav links
```

## Customization

Most content is centralized in `src/lib/data.ts`:

- **`projects`** — Add or edit portfolio entries (title, description, tags, links)
- **`skillSections`** — Update skill categories and proficiency levels
- **`timeline`** — Modify career milestones on the About page
- **`navLinks`** — Change navigation items

Site-wide metadata (title, description, keywords) lives in `src/app/layout.tsx`.

## Deployment

This project is optimized for [Vercel](https://vercel.com/):

1. Push the repository to GitHub
2. Import the project in Vercel
3. Deploy — no extra configuration required

It also works on any platform that supports Next.js (Netlify, Railway, self-hosted Node, etc.).

## License

Private project. All rights reserved.
