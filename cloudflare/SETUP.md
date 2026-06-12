# Visitor globe backend - one-time setup

The globe can show everyone who visited antendis.dev in the last 24 hours.
That needs a tiny shared store: a free Cloudflare Worker + KV namespace.
Until this is set up the site quietly falls back to per-browser history.

Takes about 5 minutes, all in the Cloudflare dashboard (free plan is fine).
The site does NOT need its DNS on Cloudflare - a workers.dev URL works.

1. Go to https://dash.cloudflare.com -> Workers & Pages -> Create ->
   Create Worker. Name it `visits`, hit Deploy (the hello-world is fine).
2. Storage & Databases -> KV -> Create namespace. Name it `visits-store`.
3. Back on the `visits` worker: Settings -> Bindings -> Add -> KV namespace.
   Variable name must be exactly `VISITS_KV`. Select `visits-store`. Save.
4. Worker -> Edit code. Delete the boilerplate, paste the whole contents of
   `visits-worker.js` (this folder), hit Deploy.
5. Copy the worker URL it shows, e.g. `https://visits.<account>.workers.dev`.
6. Smoke test from any terminal:
   - `curl -X POST https://visits.<account>.workers.dev/visit`
     -> expect `{"self":{...},"others":[]}`
   - `curl https://visits.<account>.workers.dev/visits`
     -> expect `{"visitors":[{...}]}`
7. Open `config.js` in the repo root and set:
   `visitsApi: "https://visits.<account>.workers.dev"`
   (no trailing slash), then commit and push. GitHub Pages redeploys and the
   globe starts showing real visitors.

Optional, only if antendis.dev DNS is on Cloudflare: worker Settings ->
Domains & Routes -> Add -> Custom domain -> `visits.antendis.dev`, then use
that URL in step 7 instead. Cosmetic only.

Privacy notes: coordinates are rounded to ~11 km at the edge before storage,
only `{time, lat, lon, city, country}` is kept, capped at 200 entries, and
anything older than 24 hours is dropped on every read and write. No IPs.

Free-tier headroom: KV allows 1,000 writes/day - that is ~1,000 new visitor
sessions/day before new dots stop persisting for the day (reads keep working,
so the globe never goes dark).
