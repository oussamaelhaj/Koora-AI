require('dotenv').config();

const express = require('express');
const helmet = require('helmet');

const { FOOTBALL_STORIES } = require('./footballStories');

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

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`koorazone-football-backend listening on port ${port}`);
});
