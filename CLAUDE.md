# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal bilingual (English/Spanish) blog and portfolio ("RigoDev"), built with Next.js 16 (App Router), React 19, Prisma 7 on PostgreSQL, better-auth, next-intl, Tailwind CSS v4 and shadcn/ui. The package manager is pnpm (`pnpm-lock.yaml`, `pnpm-workspace.yaml`).

## Commands

```bash
pnpm dev          # dev server on http://localhost:3000
pnpm build        # production build (also type-checks)
pnpm lint         # Biome: lint + format check + import order (biome.json)
pnpm lint:fix     # Biome with safe fixes applied (formats and sorts imports too)
pnpm format       # Biome formatter only
pnpm typecheck    # tsc --noEmit
pnpm test         # Vitest, all projects (integration needs TEST_DATABASE_URL)
pnpm test:unit    # unit tests only
pnpm test:integration                   # integration tests against TEST_DATABASE_URL
pnpm test:unit -- src/path/to/file.test.ts   # run one test file

pnpm prisma migrate dev --name <name>   # create and apply a migration
pnpm prisma generate                    # regenerate the client into src/generated/prisma
```

Tests use Vitest (`vitest.config.mts`, node environment, `@/` alias) and live next to the code under `src/`. The config defines two projects:

- **unit**: `*.test.ts(x)` files, with no database.
- **integration**: `*.int.test.ts(x)` files, run against a real Postgres at `TEST_DATABASE_URL`.

How the integration project protects real data:

- `src/test/integration/db.ts` refuses to run unless `TEST_DATABASE_URL` is set and names a database ending in `_test`. This matters because the `.env` `DATABASE_URL` is a hosted database.
- The project overrides `DATABASE_URL` with `TEST_DATABASE_URL`, so `src/lib/*` code under test also uses the test database.
- The setup file (`src/test/integration/setup.ts`) truncates every table before each test and mocks `next/cache`.
- Seed data through `testDb` from `@/test/integration/db`.
- Before running the tests, apply migrations with `DATABASE_URL=$TEST_DATABASE_URL pnpm prisma migrate deploy`.

A Husky pre-commit hook (`.husky/pre-commit`, installed by the `prepare` script) runs these steps on staged files, and any failure blocks the commit: `biome lint --staged`, then `biome format --staged`, then a full `tsc --noEmit`, then `vitest related --project unit` for the staged TS files.

CI (`.github/workflows/ci.yml`) runs these jobs on every PR: lint, format, types and unit tests; integration tests against a Postgres service; `next build`; and `pnpm audit --prod --audit-level=high`. `pnpm-workspace.yaml` → `auditConfig.ignoreGhsas` lists advisories that have been reviewed and accepted, each with the reason.

`DATABASE_URL` (Postgres) and `ADMIN_EMAIL` must be set in `.env`. `prisma.config.ts` loads it through `dotenv`.

## Architecture

**Routing and i18n.** All pages live under `src/app/[locale]/`. Locales (`en`, `es`, default `en`) are defined in `src/navigation.ts`, which also exports the locale-aware `Link`, `redirect`, `useRouter` and `usePathname`. `src/i18n/request.ts` loads `messages/<locale>.json`. UI strings come from `getTranslations()` (server) or `useTranslations()` (client), and every new key must be added to both `messages/en.json` and `messages/es.json`.

**Middleware is `src/proxy.ts`.** This is the Next 16 name for `middleware.ts`. It runs next-intl routing and guards every `/admin` path except `/login` by checking the better-auth session. `next.config.ts` redirects `/admin` to `/admin/posts`.

**Data layer.** `src/lib/*.ts` modules are `"use server"` files. They hold both the read queries (`getPosts`, `getPost`, `getCategories`, and so on) and the server actions used with `useActionState` (`createPost(prevState, formData)`, etc.). Actions validate `FormData` with zod, write through Prisma, call `revalidatePath`, and return `{ success }` or `{ error }` objects rather than throwing. `src/lib/prisma.ts` is the singleton client, using the `@prisma/adapter-pg` driver adapter.

**Prisma client location.** The generator outputs to `src/generated/prisma` (import from `@/generated/prisma/client`, not `@prisma/client`). This directory is gitignored and Biome skips it. It is generated in two places: by `postinstall` on a fresh install, and by `pnpm build` (`prisma generate && next build`). The `build` step is needed because pnpm skips `postinstall` when `node_modules` is already up to date, for example when Vercel restores its build cache. Run `pnpm prisma generate` after any change to `prisma/schema.prisma`.

**Bilingual content.** A `Post` stores English in `title`/`description`/`content` and Spanish in `esTitle`/`esDesc`/`esBody`. Pages pick the field based on `locale`, falling back to English. Categories and tags carry a `translationKey` that maps to message keys (for example `HomePage.section${translationKey}Title`).

**Blog posts are MDX stored in the database.** `blog/[category]/[slug]/components/post-detail.tsx` compiles `post.content` at request time with `next-mdx-remote/rsc` and `rehype-slug`. It uses the component map from `src/app/[locale]/mdx-components.tsx`, which pulls from `src/components/mdx/`. The table of contents comes from `extract-headings.ts`. `@next/mdx` is also configured, so `.md`/`.mdx` files work as page extensions.

**Auth.** better-auth with email/password (`src/lib/auth.ts`) uses the Prisma adapter, and its handler lives at `src/app/[locale]/api/auth/[...all]/route.ts`. There is a single admin account: `adminLogin` in `src/lib/auth-server.ts` signs in as `ADMIN_EMAIL`, so only a password is entered.

**Admin area** (`src/app/[locale]/admin/`) manages posts (create/edit with an MDX editor form), visitor messages from `/contact`, topic suggestions from `/suggest`, and analytics.

**UI.** shadcn/ui primitives live in `src/components/ui/` (add more with `pnpm dlx shadcn add <component>`; config in `components.json`). Use `cn()` from `src/lib/utils.ts` to merge class names. Theming uses `next-themes`, and toasts use `sonner`.

## Conventions

- Biome (`biome.json`) handles both linting and formatting; there is no ESLint or Prettier. It uses the recommended rules plus the `next` and `react` domains. Linting is disabled for the shadcn-generated `src/components/ui/`, but those files are still formatted.
- Imports are grouped by Biome's `organizeImports`: node builtins, then packages, then `@/…`, then relative paths, then `import type`. Groups are separated by blank lines. `pnpm lint:fix` sorts them.
- Unused variables and imports, and missing hook dependencies, are errors. When a rule has to be suppressed, use `// biome-ignore <rule>: <real reason>`. Biome rejects a placeholder reason.
- The formatter uses 2-space indentation, double quotes, trailing commas and `lineEnding: "auto"`. The `auto` setting is needed because git checks files out with CRLF on Windows.
- Vercel agent skills (React best practices, composition patterns, web design guidelines) are installed in `.agents/skills/` via `npx skills add vercel-labs/agent-skills`.
