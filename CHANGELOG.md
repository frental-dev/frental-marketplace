# Changelog

All notable changes to the Frental marketplace frontend.

## [0.2.0]

### Added
- Mobile navigation menu — previously every nav link, the city selector,
  and the Saved link were completely inaccessible below the `sm`/`md`
  breakpoints, with no alternative way to reach them
- Collapsible filters on the Properties search page for small screens, so
  listings aren't pushed below the fold by the full filter panel
- `ErrorBoundary` — a render error anywhere in the tree now shows a
  recoverable fallback instead of a blank white page
- Optional Sentry error tracking via `VITE_SENTRY_DSN` (see
  `src/observability.js`) — contributes zero bytes to the bundle when unset
  (verified via build output), code-splits into its own chunk when configured
- App version displayed in the footer, injected from `package.json` at
  build time (`vite.config.js`)

### Fixed
- `API_BASE` now points at `/api/v1` (the backend's versioned API root) —
  was still pointing at the unversioned `/api`
- Pagination buttons and the property-card save button were below the
  44px minimum touch target (36px and 32px respectively) — both fixed

### Changed
- Default `API_BASE` fallback updated to the new Render account's prod
  service name — **set `VITE_API_BASE_URL` explicitly in Vercel rather
  than relying on this guess**

## [0.1.0]

Initial marketplace: Home, Properties search, Property detail, Agent
profile/directory, Saved properties, About/Contact/How It Works, List
Your Property.
