# Feature: security-deps

## Objective
Close the known dependency vulnerabilities (1 critical, 11 high, 4 moderate on `origin/main`) and bring dependencies up to date within safe ranges.

## Problem
`main` runs Astro 7.1.3, which is affected by a critical RCE in AVIF image optimization (fixed in 7.2.8) plus moderate XSS / base-path authorization bypass advisories. Several transitive packages (brace-expansion, nanoid, postcss, js-yaml, tar, sharp, svgo, ...) are also vulnerable and the existing `pnpm-workspace.yaml` overrides are outdated.

## Why
Production deploys to Vercel with image optimization and SSR; the critical RCE and auth bypass are exploitable server-side.

## Scope
- Bump Astro stack (`astro`, `@astrojs/vercel`, `@astrojs/react`, `@clerk/astro`) to latest compatible 7.x-era versions.
- Bump in-range patch/minor dependencies.
- Refresh `pnpm-workspace.yaml` overrides: drop obsolete ones, add only what is needed for remaining transitive advisories.

Out of scope: non-security majors (eslint 10, lucide 1.x, @formkit/tempo 1.x, @nanostores/react 2, prettier plugins, @clerk/clerk-react deprecation).

## Constraints
- Branch `chore/security-deps` created from `origin/main` (not `dev`: `dev` diverged and still pins Astro 6).
- No test runner exists in the project. TDD: strict mode enabled (session config) but runner missing → functional checks only: `pnpm build`, `pnpm lint`, `pnpm audit`.

## Delivery
- Strategy: `ask-on-risk` (default). Forecast: < 100 authored lines (lockfile excluded as generated) → single PR.

## Tasks
- [x] T1 — Bump Astro stack + in-range patch/minor deps (route: inline, single mechanical file `package.json` + generated lockfile) — commit `e418d66`
- [x] T2 — Refresh overrides in `pnpm-workspace.yaml` until audit is clean or residuals are documented (route: inline, single file)

## Acceptance criteria
- `pnpm audit` reports 0 critical / 0 high (residuals documented with reason if any).
- `pnpm build` and `pnpm lint` exit 0.

## Baseline (origin/main @ 55f1da2)
- build: exit 0 · lint: exit 0 · audit: 16 (1 critical, 11 high, 4 moderate)

## Progress / evidence
- T1 (`e418d66`): astro 7.3.3, @astrojs/vercel 11.0.10, @astrojs/react 6.0.6, @clerk/astro 4.1.3 + patch/minor bumps. build exit 0 · lint exit 0 · audit 16 → 3 (2 high brace-expansion@1.1.16 via eslint, 1 moderate postcss@8.5.22 via eslint-plugin-astro; dev-only).
  - Rationale: stayed on astro 7.3.3; 7.3.4 violates the repo `minimumReleaseAge` policy (pnpm auto-added exclusions, reverted).
  - Changelog 7.1.3→7.3.3 reviewed: no breaking changes affecting this project (no `base`, no adapter internals).
  - RDD: assessed `high` (high_risk) → consent granted → 4-lens review approved and acknowledged (lineage `review-827840413bd17ec6`). 7 non-blocking advisory findings, all about this document being stale at commit time; resolved by this update.
- T2: overrides `brace-expansion@1.1.16 → ^1.1.18`, `postcss@<8.5.23 → ^8.5.23` (range selector; exact `@8.5.22` selector did not match; replaces the two redundant exact postcss entries). Resolved brace-expansion@1.1.21 / postcss@8.5.28, both older than the release-age policy window, no exclusions added. build exit 0 · lint exit 0 · audit: **0 vulnerabilities**.

## Next step
Push `chore/security-deps` and open a PR to `main` (user decision). Pending follow-ups (out of scope): `dev` diverged from `main` and still pins Astro 6; `@clerk/clerk-react` deprecated; non-security majors.
