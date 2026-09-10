# Kabin Ghimire — Portfolio

A pixel-art, retro-desktop developer portfolio. Monorepo with a React/Vite frontend and a
minimal Express API backing a CMS-style admin panel (projects, experience, blog, profile,
contact messages).

## Stack

- **client/** — React 18, TypeScript, Vite, Tailwind CSS, React Router, Framer Motion, lucide-react
- **server/** — Express, TypeScript, JWT auth (bcrypt), JSON-file persistence (`server/src/data/db.json`)

No database server required — content lives in a single JSON file that the API reads/writes,
seeded on first boot from `server/src/seed.ts`.

## Getting started

```bash
npm install                 # installs both workspaces
cp server/.env.example server/.env
npm run seed -w server      # creates server/src/data/db.json
npm run dev                 # runs API (:4000) + client (:5173) together
```

Visit `http://localhost:5173`. The Vite dev server proxies `/api/*` to the Express server.

## Admin panel

Visit `/admin/login`.

- **Email:** `ghimirekabin060@gmail.com` (or whatever you set as `ADMIN_EMAIL` in `server/.env`)
- **Password:** `ChangeMe123!` (default — change it)

To set a new password:

```bash
npm run hash -w server -- "your-new-password"
# copy the printed ADMIN_PASSWORD_HASH into server/.env
```

From the admin panel you can manage:

- **Projects** — create/edit/delete portfolio case studies
- **Experience** — the work-history timeline
- **Blog** — write, edit, publish/unpublish, delete posts (public at `/blog`)
- **Messages** — read submissions from the `/contact` form
- **Profile** — hero tagline, about summary, contact details, availability

Changes are written straight to `server/src/data/db.json` and reflected on the live site
immediately (no rebuild needed in dev).

## Design system

Light "paper" ground with a red/pink pixel accent — every border, offset and shadow is a
multiple of the `--pxu` (4px) pixel unit, so nothing renders off-grid. Content sits inside
chunky retro window chrome (`PixelWindow`) with title bars and fake minimise/maximise/close
controls. Fonts: Space Grotesk (display), Inter (body), a pixel face for terminal/labels.

Shared pixel primitives live in `client/src/components/pixel/` — `PixelWindow`, `PixelButton`,
`PixelBadge`, `PixelSprite`, `PixelTerminal`, `PixelNav`, `PixelFooter` and the `sprites.ts`
sprite data. Build new sections from these rather than hand-rolling borders.

The `/admin` CMS deliberately keeps the original dark tool theme, scoped via the
`.admin-shell` class in `client/src/index.css`.

## Production build

```bash
npm run build     # builds server (tsc) then client (tsc + vite)
```

Serve `server/dist` with Node and `client/dist` as static files behind your reverse proxy
of choice, pointing `CLIENT_ORIGIN` / the client's API base at your deployed API URL.
