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
- [ ] T1 — Bump Astro stack + in-range patch/minor deps (route: inline, single mechanical file `package.json` + generated lockfile)
- [ ] T2 — Refresh overrides in `pnpm-workspace.yaml` until audit is clean or residuals are documented (route: inline, single file)

## Acceptance criteria
- `pnpm audit` reports 0 critical / 0 high (residuals documented with reason if any).
- `pnpm build` and `pnpm lint` exit 0.

## Baseline (origin/main @ 55f1da2)
- build: exit 0 · lint: exit 0 · audit: 16 (1 critical, 11 high, 4 moderate)

## Progress / evidence
(pending)

## Next step
T1.
