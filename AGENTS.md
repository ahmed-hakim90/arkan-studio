<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

This repo is a single Next.js 16 (App Router) app — the ARKAN Studio bilingual (AR default / EN, RTL) marketing site + admin CMS. Package manager is npm (only `package-lock.json` is present). Standard commands live in `package.json` and `README.md`; use those rather than duplicating here.

- Run dev: `npm run dev` (Turbopack, http://localhost:3000). Root `/` 307-redirects to `/ar`; locales are `/ar` and `/en`.
- Lint / build / start: see `package.json` scripts (`npm run lint`, `npm run build`, `npm run start`).
- `npm run lint` currently reports pre-existing `react-hooks/set-state-in-effect` errors (Next 16's stricter React lint) in several components plus one unused-var warning. These are not environment problems — do not "fix" them as part of unrelated work.
- `npm ci` does NOT work here: the committed `package-lock.json` is out of sync with `package.json` (e.g. missing `@swc/helpers`). Use `npm install`, which reconciles it. `npm install` under this image's npm also strips `libc` fields the lockfile was authored with, so it always leaves a cosmetic `package-lock.json` diff — leave it uncommitted unless you are intentionally updating deps.
- Supabase is OPTIONAL for local dev. With no `NEXT_PUBLIC_SUPABASE_*` env set, public pages render from file fallbacks in `src/content/` + `messages/`, and `POST /api/contact` returns `200 {ok:true}` while logging "supabase env missing — request not persisted" (leads are not stored). The `/admin` CMS, lead persistence, and `npm run seed:cms` require a configured hosted Supabase project (URL + anon/publishable key, an Auth user listed in `admin_users`, and a `media` storage bucket). There are no SQL migrations in the repo, so the schema must already exist in that Supabase project.
- `next dev` rewrites the `BEGIN/END:nextjs-agent-rules` block at the top of this file and `CLAUDE.md`; commit those regenerations with your work to keep the tree clean.
