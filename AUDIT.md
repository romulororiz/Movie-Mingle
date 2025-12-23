# Codebase Audit — Movie Mingle

## SECTION 1 — Executive Summary
- **Health Scores (0–10):** Architecture 5, Security 4, Performance 5, Maintainability 4, DX 5, UI/UX 6.
- **Top 10 Issues (impact first):**
  1. TMDB API routes fetch directly with unvalidated env keys and no upstream error handling, risking broken pages and leakage of API key usage patterns.
  2. TypeScript strictness disabled (`strict: false`, `allowJs: true`), encouraging runtime bugs and weak type coverage.
  3. API handlers pull IDs from URL path splitting, bypassing Next.js route params and lacking validation.
  4. No caching/revalidation on TMDB fetches; every request hits the external API with unbounded pagination.
  5. Sparse logging/observability—errors return generic text without context or structured logs.
  6. Security posture thin: no rate limiting or auth on API routes, JWT session callbacks trust DB values without soft validation.
  7. Build/CI hygiene minimal; no lint/type/test automation beyond `next lint`, and no test suite.
  8. Configuration management ad-hoc; environment variables not centralized or schema-validated.
  9. UX resilience weak: loading/error states appear minimal; global layout assumes `user!` non-null.
  10. Documentation boilerplate; lacks runbook, architecture notes, or onboarding guidance.

## SECTION 2 — Findings (Detailed)
1. **External API error handling is shallow** (Architecture, High)
   - **Evidence:** TMDB search route returns raw JSON without status checks and catches everything with a generic 500 message; no input validation on `q` or `page` query params. `app/api/search/route.ts` lines 6–23.
   - **Impact:** Upstream 4xx/5xx or malformed queries propagate undefined data to clients, yielding confusing UI and wasting API quota.
   - **Recommendation:** Validate inputs (zod), check `searchRes.ok`, return structured error JSON, and add minimal logging. Consider caching with `revalidate` headers.
   - **Effort/Risk:** S / Low.

2. **Route params parsed manually** (Maintainability, Medium)
   - **Evidence:** Movie detail API parses ID via `url.pathname.split('/')[3]` instead of Next.js route params, with no number validation. `app/api/movies/[movieId]/route.ts` lines 6–23.
   - **Impact:** Fragile against path changes and allows non-numeric IDs to reach TMDB, causing inconsistent failures.
   - **Recommendation:** Use `context.params.movieId` (Next.js 13 handler signature), guard with zod, and return 400 on invalid IDs.
   - **Effort/Risk:** S / Low.

3. **Environment and secret handling lacks validation** (Security, High)
   - **Evidence:** TMDB API key pulled directly from `process.env` in many routes without schema validation or default rejection; errors surface at runtime. Example in `app/api/search/route.ts` lines 13–18.
   - **Impact:** Misconfiguration causes silent failures; missing key might trigger runtime exceptions. Secrets may also leak via error pages if not handled.
   - **Recommendation:** Add centralized env validation (e.g., `@t3-oss/env-nextjs`), fail fast at startup, and avoid inline string interpolation when key is absent.
   - **Effort/Risk:** M / Low.

4. **Type safety disabled** (DX/Maintainability, High)
   - **Evidence:** `tsconfig.json` sets `strict: false` and `allowJs: true`, with `skipLibCheck: true`. Lines 3–23.
   - **Impact:** Reduced catch of null/undefined and implicit any, increasing runtime defects and refactor risk.
   - **Recommendation:** Enable `strict`, disable `allowJs`, and address resulting errors incrementally. Keep `skipLibCheck` only if necessary.
   - **Effort/Risk:** M / Medium.

5. **Global layout assumes user object** (Architecture/UIUX, Medium)
   - **Evidence:** `app/layout.tsx` calls `<Header user={user!} />` without null handling after `getCurrentUser`. Lines 36–47.
   - **Impact:** Unauthenticated sessions or auth failures cause runtime errors and broken initial render.
   - **Recommendation:** Pass nullable user to Header and render guest-safe UI; add suspense/loading states.
   - **Effort/Risk:** S / Low.

6. **JWT callback trusts database values blindly** (Security, Medium)
   - **Evidence:** In `lib/auth.ts`, user email/picture from DB assigned directly to token without sanitization; missing handling for soft-deleted/blocked users. Lines 24–53.
   - **Impact:** Stale/invalid users may receive active sessions; profile poisoning possible if stored data contains unexpected values.
   - **Recommendation:** Add user status checks, minimal validation, and include `emailVerified` gating. Consider using `session.token.sub` and Prisma select projections.
   - **Effort/Risk:** M / Medium.

7. **No caching or pagination limits on TMDB calls** (Performance, Medium)
   - **Evidence:** External fetches (e.g., movie detail route) simply proxy TMDB responses without `next: { revalidate }` or cache headers and accept unbounded `page` input. `app/api/movies/[movieId]/route.ts` lines 11–20.
   - **Impact:** Higher latency, API quota pressure, and potential denial of service from large page numbers.
   - **Recommendation:** Set reasonable `page` bounds, add caching/revalidation per endpoint, and consider server-side rate limiting.
   - **Effort/Risk:** M / Medium.

8. **Testing and CI absent** (DX, High)
   - **Evidence:** No tests present; package scripts lack test command beyond `lint`; repo lacks CI config. `package.json` lines 9–23.
   - **Impact:** Regressions ship unnoticed; low confidence in refactors and deployments.
   - **Recommendation:** Add unit tests for utilities, integration tests for API routes (MSW), and GitHub Actions running lint/test/build.
   - **Effort/Risk:** M / Medium.

9. **Config/documentation minimal** (Maintainability, Low)
   - **Evidence:** README is default Next.js template with no project-specific setup or env requirements. `README.md` lines 1–34.
   - **Impact:** Onboarding friction; hidden operational steps for Prisma/TMDB keys/auth.
   - **Recommendation:** Update README with architecture diagram, env vars, run commands, seed data, and deployment notes.
   - **Effort/Risk:** S / Low.

10. **Prisma schema lacks indexes for common lookups** (Performance, Medium)
    - **Evidence:** `Bookmark` uses composite unique on `movieId,userId` but `UserPreferredGenre` and `BookmarkGenre` only have unique/index on relations; no explicit index on `userId` for bookmark filtering. `prisma/schema.prisma` lines 36–80.
    - **Impact:** User-specific queries may scan tables, slowing dashboards as data grows.
    - **Recommendation:** Add indexes on `Bookmark.userId` and `UserPreferredGenre.userId` to speed retrieval; ensure migrations created.
    - **Effort/Risk:** M / Medium.

## SECTION 3 — Modernization Plan (3 Options)
- **Option A (2–7 days, minimal risk):**
  - Add env validation module; fail fast when TMDB/Google/DB vars missing.
  - Harden API routes with input validation, status checks, and basic caching.
  - Enable `strict` TypeScript gradually with `noImplicitAny` and targeted suppressions.
  - Add lint/type CI (GitHub Actions) and write smoke tests for utils and one API route.
  - Success: clean lint/type runs, API routes return structured errors, CI green.

- **Option B (2–6 weeks, best ROI):**
  - Introduce app-wide error boundary and loading states; make layout/header auth-safe.
  - Add React Query for client data fetching with caching where SSR not used.
  - Expand tests (unit for utils, integration for auth/session, e2e via Playwright).
  - Implement rate limiting (e.g., Upstash Redis) and pagination bounds on APIs.
  - Instrument logging/metrics (Vercel OG logs or OpenTelemetry) and add Prisma migration workflow.
  - Success: measurable reduced API latency, stable auth flows, 70%+ critical-path test coverage.

- **Option C (6–16 weeks, full modernization):**
  - Upgrade to Next.js 14+ with App Router caching strategies, Server Actions where appropriate, and React 19 if stable.
  - Adopt design system (e.g., Radix + Tailwind tokens) with Storybook for components.
  - Move to typed API layer (tRPC/REST with zod schemas) and shared DTOs.
  - Introduce feature flags, Sentry + APM, and full accessibility audit.
  - Success: predictable release train with feature flags, monitored SLOs, robust design system, and high lighthouse scores.

## SECTION 4 — Concrete Code Improvements (examples)
- Harden TMDB search route:
  ```diff
  export async function GET(request: Request) {
-   const url = new URL(request.url);
-   const q = url.searchParams.get('q');
-   const pageNum = url.searchParams.get('page') || 1;
-   try {
-     const searchRes = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&query=${q}&include_adult=false&language=en-US&page=${pageNum}`);
-     const searchResData = (await searchRes.json()) as SearchData;
-     return new Response(JSON.stringify(searchResData));
-   } catch (error) {
-     return new Response('Could not fetch movies.', { status: 500 });
-   }
+   const url = new URL(request.url);
+   const q = z.string().min(1).parse(url.searchParams.get('q'));
+   const page = Number(url.searchParams.get('page') ?? 1);
+   const pageNum = clamp(page, 1, 50);
+   const tmdbKey = env.TMDB_API_KEY;
+   const searchRes = await fetch(
+     `https://api.themoviedb.org/3/search/multi?api_key=${tmdbKey}&query=${encodeURIComponent(q)}&include_adult=false&language=en-US&page=${pageNum}`,
+     { next: { revalidate: 300 } }
+   );
+   if (!searchRes.ok) {
+     return Response.json({ message: 'TMDB search failed' }, { status: searchRes.status });
+   }
+   const searchResData = (await searchRes.json()) as SearchData;
+   return Response.json(searchResData, { status: 200 });
  }
  ```
- Make layout auth-safe:
  ```diff
- const user = await getCurrentUser();
- ...
- <Header user={user!} />
+ const user = await getCurrentUser();
+ ...
+ <Header user={user ?? null} />
  ```
- Strengthen tsconfig:
  ```diff
- "strict": false,
- "allowJs": true,
- "skipLibCheck": true,
+ "strict": true,
+ "allowJs": false,
+ "skipLibCheck": false,
  ```

## SECTION 5 — UI/UX & Feature Roadmap
- **UX issues:** sparse loading/error states; unauthenticated header crash risk; limited empty states for searches/bookmarks; lacks accessibility cues (aria labels, focus states).
- **Design system suggestions:** codify Tailwind tokens (spacing/typography/colors), use Radix primitives with consistent variants, add global motion guidelines.
- **Feature ideas (ranked by impact):**
  1. Personalized recommendations via stored preferences (KPI: session length ↑, Complexity: M).
  2. Social feed for friends’ reviews (KPI: DAU/WAU ↑, Complexity: M).
  3. Watchlist with reminders (KPI: return rate ↑, Complexity: M).
  4. In-app notifications for releases/bookmark activity (KPI: engagement ↑, Complexity: M).
  5. Advanced filters (year/genre/rating sliders) powered by Prisma prefs (KPI: search-to-save rate ↑, Complexity: S).
  6. Offline-friendly poster caching (KPI: mobile bounce ↓, Complexity: M).
  7. Accessibility audit + keyboard shortcuts (KPI: task success rate ↑, Complexity: S).
  8. User-generated lists with sharing (KPI: shares ↑, Complexity: M).
  9. Session heatmaps/analytics dashboard for admins (KPI: operational insight, Complexity: L).
  10. Integration with streaming availability APIs (KPI: click-through to watch ↑, Complexity: M).

## SECTION 6 — Task List for Jira/GitHub Issues
1. **Epic: Stabilize External API Layer (P0, M, FE/BE)**
   - Story: Validate TMDB inputs and handle errors per endpoint (acceptance: 400 on bad params, 5xx mapped, responses logged).
   - Tasks: Add zod schemas; clamp pagination; add `Response.json` with status; tests for success/error.
2. **Epic: Improve Auth Reliability (P0, M, BE)**
   - Story: Make layout/header handle null users (acceptance: no runtime error when signed out).
   - Tasks: Update layout and Header props; add guest header UI; add Playwright test.
3. **Epic: Strengthen Type Safety (P1, M, FE/BE)**
   - Story: Enable TS strict mode (acceptance: build passes with strict on key modules).
   - Tasks: Update tsconfig; fix priority errors; add lint rule for no implicit any.
4. **Epic: Observability & CI (P1, M, DevOps)**
   - Story: Add GitHub Actions running lint/type/test (acceptance: CI required for PR merge).
   - Tasks: Create workflow; add test script; configure cache.
5. **Epic: Performance & Caching (P2, M, FE/BE)**
   - Story: Introduce caching/revalidation on TMDB endpoints (acceptance: repeat calls hit cache; page param limited).
   - Tasks: Add `next` revalidate options; bound page; add benchmarks.
6. **Epic: Data Layer Indexing (P2, S, BE)**
   - Story: Add indexes for user-centric queries (acceptance: Prisma migration adds indexes on Bookmark.userId, UserPreferredGenre.userId).
   - Tasks: Update schema; run migration; verify query plans.
7. **Epic: Documentation & Onboarding (P3, S, FE/BE)**
   - Story: Replace README with project-specific instructions (acceptance: includes env vars, run steps, Prisma setup).
   - Tasks: Draft README; add architecture overview diagram link.
