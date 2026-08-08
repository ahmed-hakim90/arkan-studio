# ARKAN / أركان

Digital flagship — bilingual (AR/EN), Systems Atlas, Control Rooms with System X-Ray, and interactive Project Builder.

**Concept:** SYSTEMS, EXPOSED.  
**Promise:** نبني أنظمة تشغّل شغلك / Systems that run the business.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- next-intl (Arabic default + English, RTL)
- Framer Motion
- Zod-validated contact/blueprint API with honeypot, origin check, webhook SSRF guard, and rate limit
- Supabase CMS: projects, team, settings, site copy, media + leads at `/admin`
- Security headers (CSP, HSTS, frame deny, Permissions-Policy)

## Develop

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/ar`.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run seed:cms` | Reseed Supabase CMS from file content |

## Admin

Open `/admin` after setting Supabase env vars (auth user must exist in `admin_users`).

| Path | Control |
|------|---------|
| `/admin` | Dashboard — stats, latest leads, shortcuts |
| `/admin/leads` | Pipeline + quick status chips + notes |
| `/admin/projects` | Filters, publish toggle, Control Room editor tabs |
| `/admin/team` | Accordion members + photo path preview |
| `/admin/settings` | Brand/contact/social + sticky save + preview |
| `/admin/copy` | Namespaced bilingual copy (sticky chips + accordion) |
| `/admin/media` | Drag-drop upload + path/URL copy |

## Information architecture

- `/` — 12-section home narrative
- `/work` — Systems Atlas
- `/work/[slug]` — System Control Room + X-Ray
- `/capabilities` — Capability anatomy
- `/approach` — How a system becomes operational
- `/studio` — Six Arkan + team network
- `/team` — Who we are, what we do, how we work, links
- `/start` — Project Builder + live blueprint

## Content

Live source of truth: Supabase (`projects`, `team_members`, `site_settings`, `site_copy`, `media_assets`).  
File fallbacks: [`src/content/projects.ts`](src/content/projects.ts), [`src/content/team.ts`](src/content/team.ts), [`messages/*.json`](messages/).

## Brand

- Blueprint Lab interface (`#F3F5F8` paper / `#0B1220` ink / signal `#155EEF`)
- Typography: Syne (display) + Manrope (body) + IBM Plex Sans Arabic + IBM Plex Mono
- Volt blue = action / selection / flow — not decoration
