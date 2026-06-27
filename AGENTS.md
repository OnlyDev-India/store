# AGENTS.md — Medusa DTC Starter

## Repo overview

Monorepo (npm workspaces, Turbo orchestrator) with two apps under `apps/`:

| Package | Directory | Tech |
|---|---|---|
| `@dtc/backend` | `apps/backend` | Medusa v2, port 9000 |
| `@dtc/storefront` | `apps/storefront` | Next.js 15 App Router, Turbopack dev, port 8000 |

Package manager: **npm** (`npm@10.9.2`). Despite `bun.lock` existing, do not use bun.

## Commands

```bash
npm run dev              # starts both apps via turbo
npm run build            # turbo build (depends on ^build)
npm run lint             # turbo lint
npm run test             # turbo test (backend tests only)
npm run backend:seed     # turbo seed --filter=@dtc/backend
npm run backend:dev      # turbo dev --filter=@dtc/backend
npm run storefront:dev   # turbo dev --filter=@dtc/storefront
```

## Project structure

```
apps/backend/src/
  api/              # Custom API routes (store/ and admin/)
  admin/            # Admin dashboard widgets & pages (React)
  jobs/             # Scheduled jobs
  links/            # Module links
  modules/          # Custom modules (razorpay, invoice-generator)
  subscribers/      # Event subscribers
  workflows/        # Workflows (generate-invoice-pdf, etc.)

apps/storefront/src/
  app/[countryCode]/ # Next.js App Router, country-based routing
  lib/               # Config, hooks, data, context, utilities
  modules/           # UI modules (cart, checkout, products, etc.)
  middleware.ts      # Region detection, geo-redirect
```

## Setup

1. `docker compose up -d` in `apps/backend` (PostgreSQL 16)
2. `cp apps/backend/.env.template apps/backend/.env` and set `DATABASE_URL`
3. `npm run backend:seed` (runs `medusa db:migrate` + seed)
4. `cp apps/storefront/.env.template apps/storefront/.env.local` and set `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`
5. `npm run dev` to run both

## Testing

Backend only. Uses **Jest + @swc/jest** (decorators enabled). Select tests via `TEST_TYPE`:

```bash
cd apps/backend
TEST_TYPE=unit npm run test:unit                         # src/**/__tests__/*.unit.spec.[jt]s
TEST_TYPE=integration:modules npm run test:integration:modules  # src/modules/*/__tests__/
TEST_TYPE=integration:http npm run test:integration:http        # integration-tests/http/*.spec.[jt]s
```

All three use `--runInBand --forceExit`. Integration tests load env from `integration-tests/setup.js`.

## Key quirks

- **Storefront**: ESLint and TS checks are skipped during `next build` (config in `next.config.js`). Run `next lint` separately.
- **Storefront**: Prettier uses `semi: false` (only prettier config in repo, under `apps/storefront/`).
- **Backend**: TypeScript outputs to `.medusa/server/`. The `.medusa/` directory is excluded from npm workspaces.
- **Backend**: Module resolution is `Node16` with `emitDecoratorMetadata`/`experimentalDecorators` enabled.
- **Root package.json** has `pnpm.overrides` for `@types/react` — a leftover, do not use pnpm.
- **No integration test fixtures** exist yet — `integration-tests/` directory is empty/missing.

## Custom modules (backend)

- `src/modules/razorpay`: Custom payment provider integrated in `medusa-config.ts`
- `src/modules/invoice-generator`: Custom module for PDF invoice generation
- `src/workflows/generate-invoice-pdf.ts`: Workflow that queries order + countries, generates PDF via pdfmake
- `src/subscribers/order-placed.ts` and `order-updated.ts`: Event-driven subscribers

## Available agent skills (from `skills-lock.json`)

Located in `.agents/skills/`:
- `building-with-medusa` / `building-storefronts` / `building-admin-dashboard-customizations`
- `db-generate` / `db-migrate` / `new-user`
- `storefront-best-practices`
- `next-dev-loop` / `next-cache-components-adoption` / `next-cache-components-optimizer`

Load via: `@skills <skill-name>` in chat.
