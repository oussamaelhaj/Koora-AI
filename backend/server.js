require('dotenv').config();

const express = require('express');
const helmet = require('helmet');

const { fetchTopScorers } = require('./footballApi');
const { FOOTBALL_STORIES } = require('./footballStories');

// Lazy: only touched inside refreshScorers(), so a missing/invalid
// FIREBASE_SERVICE_ACCOUNT can't crash the whole process at boot — routes
// that don't need Firestore (like /football-stories, /api/health) still work.
let firebaseAdmin = null;
function getDb() {
  try {
    if (!firebaseAdmin) firebaseAdmin = require('./firebase-admin');
    return firebaseAdmin.firestore();
  } catch (err) {
    console.error('[firestore] unavailable — set FIREBASE_SERVICE_ACCOUNT to enable top scorers:', err.message);
    return null;
  }
}

// --- Quota budget (API-Football free tier = 100 requests/day) -------------
// Live scores and standings are fetched client-side from worldcup26.ir now
// (see football_theme.xml), so this backend only polls top scorers: 1 call
// per league below, every STANDINGS_POLL_HOURS. Plenty of headroom to add
// more leagues or poll more often than the old live+standings setup allowed.
const STANDINGS_POLL_HOURS = Number(process.env.STANDINGS_POLL_HOURS || 6);

// League ids per API-Football (e.g. 39 = Premier League, 140 = LaLiga).
// See https://www.api-football.com/documentation-v3#tag/Leagues for the full list.
const LEAGUES = (process.env.FOOTBALL_LEAGUES || '39:Premier League,140:LaLiga')
  .split(',')
  .map((entry) => {
    const [id, name] = entry.split(':');
    return { id: Number(id), name: (name || id).trim() };
  });
const SEASON = Number(process.env.FOOTBALL_SEASON || new Date().getFullYear());

async function refreshScorers() {
  const db = getDb();
  if (!db) return;
  for (const league of LEAGUES) {
    try {
      const topScorers = await fetchTopScorers(league.id, SEASON);
      await db.collection('football').doc(`topScorers_${league.id}`).set({
        league: league.name,
        leagueId: league.id,
        players: topScorers,
        updatedAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
      });
      console.log(`[scorers] wrote league ${league.name}`);
    } catch (err) {
      console.error(`[scorers] refresh failed for league ${league.name}:`, err.message);
    }
  }
}

const app = express();
app.disable('x-powered-by');
app.use(helmet());

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'koorazone-football-backend', time: new Date().toISOString() });
});

// Served to the KOORAZONE FOOT mobile app (src/services/api.ts). Public,
// read-only, no CORS restriction needed — this is editorial content, not
// user data.
app.get('/football-stories', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.json(FOOTBALL_STORIES);
});

// Manual trigger for testing/debugging — guard with a shared secret so it
// can't be used to burn through the daily API quota by anyone who finds the URL.
function requireRefreshToken(req, res, next) {
  const expected = process.env.REFRESH_TOKEN;
  if (expected && req.query.token !== expected) {
    return res.status(403).json({ error: 'Invalid or missing token' });
  }
  next();
}

app.get('/api/football/refresh-scorers', requireRefreshToken, async (req, res) => {
  await refreshScorers();
  res.json({ ok: true });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`koorazone-football-backend listening on port ${port}`);
});

// Prime Firestore on boot, then keep polling on the schedule above. Because
// this is a long-lived process (not a one-shot script), a free external
// pinger (e.g. cron-job.org hitting /api/health every 5-10min) is what keeps
// Render's free web service from idling — see football-backend/README.md.
refreshScorers();
setInterval(refreshScorers, STANDINGS_POLL_HOURS * 60 * 60 * 1000);
