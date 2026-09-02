# Frental Marketplace (Website)

React + Tailwind CSS marketplace site, consuming the public, unauthenticated
endpoints of the Frental backend (`/api/marketplace/*`, `/api/agents/public/*`,
`/api/leads/public`). This is the public-facing website only — it never
handles agent login, property creation, or anything requiring auth. That's
the mobile app's job.

## Pages — all built and wired to the live API

| Route | What it does |
|---|---|
| `/` | Home page matching the provided mockup — hero search, trust badges, browse-by-house-type, Featured/Recent Properties |
| `/properties` | Full search with sidebar filters (estate, city, house type, rent range), real pagination, URL-synced state (shareable/bookmarkable search links) |
| `/properties/:id` | Listing detail — media gallery (photos + video), price/description/features, agent card with click-to-chat WhatsApp link, inquiry form |
| `/agents` | Agents directory — **see limitation below** |
| `/agents/:slug` | An agent's public page — their info + all their available listings |
| `/about` | Static About page |
| `/how-it-works` | Static explainer, adapted from the original Frental product pitch |
| `/contact` | Static contact channels — **see limitation below** |
| `/list-your-property` | Explains that listing happens via the agent mobile app, with a WhatsApp CTA to get onboarded |
| `/saved` | Properties saved (heart icon) on this device — see note below |

## Known limitations (deliberate — adapted the frontend rather than changing the backend)

**Agents directory (`/agents`) has no real backend support.** The API only
has `GET /api/agents/public/:slug` (lookup by known slug) — there's no
"list all agents" endpoint. This page works around that by fetching a large
page of properties and deduplicating the `agent` object embedded in each
result. That means: only agents with at least one `AVAILABLE` listing show
up, and if there are ever 100+ distinct agents, some won't appear on one
page. This is a reasonable stopgap, not a real directory — if this page
matters long-term, the clean fix is a dedicated
`GET /api/marketplace/agents` backend endpoint rather than growing the
page-size workaround further. See the comment at the top of
`src/pages/AgentsDirectory.jsx`.

**The navbar's city dropdown has the same kind of workaround.** No
`GET /api/marketplace/cities` endpoint exists either, so
`src/hooks/useCities.js` derives the list by sampling a page of properties
and deduping the `city` field. Fine for a handful of cities at current
scale; a dedicated endpoint would be the clean long-term fix if listings
ever span many cities.

**Contact page (`/contact`) doesn't submit anywhere.** The backend's only
public inquiry endpoint, `POST /api/leads/public`, requires a `propertyId`
— it's built for "ask about this listing," not a general contact form.
Rather than add a backend endpoint for this, the Contact page just lists
direct channels (email/phone/WhatsApp) instead of pretending to have a
working form. If a real "contact us" inbox becomes important, that's a
small, deliberate backend addition — a generic lead/message endpoint with
no `propertyId` requirement.

**Property cards don't show bed/bath icons like the mockup.** The backend's
`features` field is a free-form string array (e.g. `["parking", "borehole"]`),
not structured bedroom/bathroom counts — so features render as plain text
tags rather than icon+number pairs. Fixable by either standardizing what
strings agents enter, or adding real `bedrooms`/`bathrooms` fields to the
Property model — flag to the backend owner if this matters enough to change.

**"Saved" properties work per-browser via localStorage — no account or
backend involvement.** The heart icon on each property card toggles a
saved state (`src/hooks/useSavedProperties.js`); `/saved` reads that list
and fetches each property individually (no batch-fetch-by-ids endpoint
exists, so it's one call per saved item via `Promise.allSettled` — a
removed/unavailable listing just quietly drops off the list rather than
breaking the page). This is entirely device-local: saved properties won't
follow a visitor across browsers or devices, since there's no visitor
account system, by design.

## Setup

```bash
npm install
cp .env.example .env   # defaults to the production backend if you skip this
npm run dev
```

## API contract this depends on

See the backend's own README (section 3) for the full endpoint reference.
Every property's `media` array already includes a ready-to-use `url` and
`thumbnailUrl` per image — the frontend never needs to know whether a given
image is being served from Cloudinary or MinIO/R2 fallback, that's resolved
server-side.

## Design notes

Built to match the provided mockup as closely as possible with Tailwind
utility classes — brand green (`brand-700`, `#186339`) for the logo, active
nav state, and primary buttons. Inner pages (Properties, Agents, static
pages) reuse the same Navbar/Footer and color system but weren't in the
original mockup, so their layout is a straightforward extension of the
established style rather than a pixel-matched design. The Home page hero
image is a placeholder Unsplash photo; swap `src/components/Hero.jsx`'s
image URL for real brand photography when available.
