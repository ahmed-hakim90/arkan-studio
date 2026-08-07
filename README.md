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
- Supabase persistence for leads + admin dashboard at `/admin`
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

## Information architecture

- `/` — 12-section home narrative
- `/work` — Systems Atlas
- `/work/[slug]` — System Control Room + X-Ray
- `/capabilities` — Capability anatomy
- `/approach` — How a system becomes operational
- `/studio` — Six Arkan + team network
- `/start` — Project Builder + live blueprint

## Content

- Projects: [`src/content/projects.ts`](src/content/projects.ts)
- Team: [`src/content/team.ts`](src/content/team.ts)
- Copy: [`messages/ar.json`](messages/ar.json), [`messages/en.json`](messages/en.json)

## Brand

- Light architectural editorial interface (`#F3F5F8` / navy `#0B1F3A` / signal `#D7042A`)
- Typography: Geist Sans + IBM Plex Sans Arabic + Geist Mono
- Signal red = action / selection / flow — not decoration
