// Cloudflare Worker: 24-hour visitor log for the antendis.dev globe.
//
// Storage: one KV namespace bound as VISITS_KV, single key "visits" holding a
// JSON array of { t, lat, lon, city, country } - newest first, max 200 kept.
// Geo comes from request.cf at the edge and is rounded to 1 decimal (~11 km)
// before it is persisted. No IP addresses or user agents are ever stored.

const DAY_MS = 24 * 60 * 60 * 1000;
const MAX_ENTRIES = 200;
const ALLOWED_ORIGINS = [
  'https://antendis.dev',
  'https://www.antendis.dev',
  'http://localhost:8123'
];

function corsHeaders(request) {
  const origin = request.headers.get('Origin');
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Vary': 'Origin'
  };
}

function json(body, request, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: Object.assign({ 'Content-Type': 'application/json' }, corsHeaders(request))
  });
}

async function loadRecent(env) {
  let entries;
  try {
    entries = JSON.parse(await env.VISITS_KV.get('visits')) || [];
  } catch (e) {
    entries = [];
  }
  const cutoff = Date.now() - DAY_MS;
  return entries.filter(v => v && typeof v.t === 'number' && v.t > cutoff);
}

function selfFromRequest(request) {
  const cf = request.cf || {};
  // request.cf reports latitude/longitude as strings.
  const lat = parseFloat(cf.latitude);
  const lon = parseFloat(cf.longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  return {
    t: Date.now(),
    lat: Math.round(lat * 10) / 10,
    lon: Math.round(lon * 10) / 10,
    city: cf.city || '',
    country: cf.country || ''
  };
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(request) });
    }

    if (request.method === 'POST' && pathname === '/visit') {
      const others = await loadRecent(env);
      const self = selfFromRequest(request);
      if (self) {
        try {
          await env.VISITS_KV.put('visits', JSON.stringify([self].concat(others).slice(0, MAX_ENTRIES)));
        } catch (e) {
          // KV write limit hit; the visit is simply not persisted.
        }
      }
      return json({ self: self, others: others }, request);
    }

    if (request.method === 'GET' && pathname === '/visits') {
      return json({ visitors: await loadRecent(env) }, request);
    }

    return json({ error: 'not found' }, request, 404);
  }
};
