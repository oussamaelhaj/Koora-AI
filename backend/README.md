# koorazone-football-backend

Serves `GET /football-stories` to the KOORAZONE FOOT mobile app
(`src/services/api.ts` at the repo root) — a small curated list of football
history/trivia, hardcoded in `footballStories.js`. That's it.

No API key, no database, no external service of any kind. Everything else
football-related in this project is free and keyless too:

- **Live scores & standings** (KOORAZONE Blogger theme, `football_theme.xml`,
  maintained separately from this repo): fetched client-side straight from
  [worldcup26.ir](https://github.com/rezarahiminia/livescoreFootball), no key.
- **Recent results** (same Blogger theme, sidebar widget): same API, same
  client-side fetch.
- **Ask AI** (mobile app): calls OpenRouter directly from the app — see
  `src/services/api.ts` — not through this backend.

## Local development

```
cd backend
npm install
npm start
```

Check `http://localhost:3001/api/health` and
`http://localhost:3001/football-stories`.

## Deploy to Render (free)

This repo already has a Render service at `koora-ai.onrender.com`. Since it
wasn't originally created from `render.yaml`, Render won't auto-adopt it —
pick one:

- **Reuse the existing service (simplest):** Render dashboard → the
  `koora-ai` service → Settings → set **Root Directory** to `backend`,
  **Build Command** to `npm install`, **Start Command** to `npm start`,
  **Health Check Path** to `/api/health`. Redeploy. No env vars needed.
- **Or start fresh via Blueprint:** Render dashboard → New → Blueprint →
  select this GitHub repo. It reads `render.yaml` at the repo root and
  creates a new service from `backend/`.

## Adding more stories

Edit the `FOOTBALL_STORIES` array in `footballStories.js` — no redeploy
config needed, just commit and push.
