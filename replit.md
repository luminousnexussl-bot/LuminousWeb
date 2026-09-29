# Luminous Nexus Corporate Website

A premium responsive corporate website for Luminous Nexus (Pvt) Ltd, a Sri Lankan–Czech business group working across technology, international trade and emerging ventures.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/luminous-nexus/src/App.tsx` — single-page corporate website and interactive UI behavior
- `artifacts/luminous-nexus/src/index.css` — site tokens, responsive layout, motion, and visual system
- `artifacts/luminous-nexus/public/` — production-ready logo asset variants
- `attached_assets/` — supplied source brief and original logo asset
- `artifacts/luminous-nexus/index.html` — SEO metadata and social sharing metadata

## Architecture decisions

- Presentation-first static React/Vite artifact; no backend or database is needed for the corporate brochure experience.
- The supplied logo is the source for the brand's navy/luminous-blue visual language.
- Tourism and agriculture remain explicitly labelled as developing ventures to avoid unsupported operational claims.
- CSS and inline SVG visuals keep the page self-contained and avoid fragile external image dependencies.

## Product

- Presents the group's positioning, business areas, technology capabilities, trade/export categories, emerging ventures, locations, and working approach.
- Provides responsive anchor navigation, mobile menu behavior, portfolio capability filtering, and a contact form success state.
- Communicates verified scope without invented clients, awards, statistics, addresses, or export markets.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
