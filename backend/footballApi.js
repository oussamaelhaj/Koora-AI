// Thin wrapper around API-Football (api-football.com / API-SPORTS direct plan).
// Free tier: 100 requests/day. Live scores and standings now come straight from
// worldcup26.ir's free public API on the client side (see football_theme.xml),
// so this backend only still needs top scorers — API-Football's one endpoint
// worldcup26.ir doesn't expose yet.
const BASE_URL = 'https://v3.football.api-sports.io';

function apiKey() {
  const key = (process.env.FOOTBALL_API_KEY || '').trim();
  if (!key) throw new Error('FOOTBALL_API_KEY is not set.');
  return key;
}

async function callApi(path) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'x-apisports-key': apiKey() },
  });
  if (!res.ok) {
    throw new Error(`API-Football request failed: ${res.status} ${res.statusText} (${path})`);
  }
  const body = await res.json();
  if (Array.isArray(body.errors) ? body.errors.length : Object.keys(body.errors || {}).length) {
    throw new Error(`API-Football returned errors for ${path}: ${JSON.stringify(body.errors)}`);
  }
  return body.response;
}

async function fetchTopScorers(leagueId, season) {
  const response = await callApi(`/players/topscorers?league=${leagueId}&season=${season}`);
  return response.slice(0, 10).map((entry) => ({
    name: entry.player?.name || '',
    photo: entry.player?.photo || '',
    club: entry.statistics?.[0]?.team?.name || '',
    goals: entry.statistics?.[0]?.goals?.total ?? 0,
  }));
}

module.exports = { fetchTopScorers };
