# koorazone-football-backend

Polls API-Football on a schedule and caches **top scorers only** into the
`koorazone-e59a7` Firestore project. The KOORAZONE Blogger theme
(`football_theme.xml`, maintained separately from this repo) reads that
Firestore data client-side for the Top Scorers widget.

This lives in `backend/` inside the **Koora-AI** repo, alongside the
KOORAZONE FOOT mobile app (Expo/React Native) at the repo root — same brand,
separate codebases. This service does not serve the mobile app's
`/football-stories` or `/ask-ai` endpoints; see `src/services/api.ts` at the
repo root for those (currently OpenRouter direct + local fallback).

Live scores and standings no longer go through this backend at all — they're
fetched directly in the browser from
[worldcup26.ir](https://github.com/rezarahiminia/livescoreFootball), a free,
keyless football API with open CORS. That API doesn't expose top scorers yet,
which is the one thing this backend still exists for.

## 1. Get a free API-Football key

1. Go to https://dashboard.api-football.com/register and create a free account
   (this is the direct API-SPORTS dashboard, not the RapidAPI marketplace —
   simpler auth header, same data).
2. Once logged in, your API key is on the dashboard home page.
3. Free tier = 100 requests/day. This backend only polls top scorers now (1
   call per tracked league, every `STANDINGS_POLL_HOURS`), so you're nowhere
   near the limit — plenty of room to track more leagues or poll more often.

## 2. Generate a Firebase service account key (koorazone-e59a7)

1. https://console.firebase.google.com/project/koorazone-e59a7/settings/serviceaccounts/adminsdk
2. Click **Generate new private key** — downloads a JSON file. Keep it secret,
   never commit it.
3. Base64-encode it (more reliable than pasting raw JSON into a dashboard field):
   - macOS/Linux: `base64 -i service-account.json | pbcopy`
   - Windows PowerShell: `[Convert]::ToBase64String([IO.File]::ReadAllBytes("service-account.json")) | Set-Clipboard`

## 3. Publish the Firestore rules

Firebase Console → koorazone-e59a7 → Firestore Database → Rules → paste the
contents of `firestore.rules` → **Publish**.

## 4. Deploy to Render (free)

This repo already has a Render service at `koora-ai.onrender.com`. Since it
wasn't originally created from this `render.yaml`, Render won't auto-adopt it —
pick one:

- **Reuse the existing service (simplest):** Render dashboard → the
  `koora-ai` service → Settings → set **Root Directory** to `backend`,
  **Build Command** to `npm install`, **Start Command** to `npm start`,
  **Health Check Path** to `/api/health`. Redeploy.
- **Or start fresh via Blueprint:** Render dashboard → New → Blueprint →
  select this GitHub repo. It reads `render.yaml` at the repo root and
  creates a new service from `backend/`. Delete the old manually-configured
  service afterwards if you no longer need it (this changes its URL).

Either way, set these env vars on the service (never commit them):
   - `FIREBASE_SERVICE_ACCOUNT` — the base64 string from step 2
   - `FOOTBALL_API_KEY` — from step 1
   - `REFRESH_TOKEN` — any random string, only needed if you want to hit the
     manual `/api/football/refresh-scorers` route yourself
3. Deploy. Check `/api/health` on the assigned `*.onrender.com` URL.

## 5. Keep the free Render service awake (also free)

Render's free web services spin down after 15 minutes idle. A free external
pinger both keeps it awake and gives you an outside confirmation it's alive:

1. https://cron-job.org → free account → **Create cronjob**
2. URL: `https://<your-service>.onrender.com/api/health`
3. Interval: every 5–10 minutes.

The backend's own internal timer (`STANDINGS_POLL_HOURS`) keeps polling
API-Football as long as the process stays up — this ping is only about
preventing Render from putting the process to sleep.

## Firestore documents this writes

- `football/topScorers_<leagueId>` — `{ league, players: [...], updatedAt }`

Change tracked leagues via the `FOOTBALL_LEAGUES` env var (`id:Name` pairs,
comma-separated). League ids: https://www.api-football.com/documentation-v3#tag/Leagues

## Live scores & standings (no backend involved)

The Blogger theme fetches these straight from `https://worldcup26.ir/get/soccer/...`
in the browser, not through this service — see the theme's script block right
after its Firebase one. To track different leagues, edit the
`KZ_SCORE_LEAGUES` / `KZ_TABLE_LEAGUE` arrays there using slugs from
`GET https://worldcup26.ir/get/soccer/leagues?kind=club&available=true`.
