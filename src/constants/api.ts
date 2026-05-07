// KOORAZONE FOOT - API Configuration
// Backend hosted on Render

export const API_BASE_URL = 'https://koora-ai.onrender.com';

export const API_ENDPOINTS = {
  footballStories: `${API_BASE_URL}/football-stories`,
  askAI: `${API_BASE_URL}/ask-ai`,
};

// ScoreBat embed URLs for live scores & goal videos
export const SCOREBAT = {
  goalsVideoFeed: 'https://www.scorebat.com/embed/videofeed/?token=MjE5ODc2XzE3NTEzODExNTBfMmRmYTU1YmVhZmU1ZjVhYmE2NDA2OTk0MGVlNzRmOTY0OWYzZTEwZQ==',
  livescoreFeed: 'https://www.scorebat.com/embed/livescore/?token=MjE5ODc2XzE3NTEzODEwMThfNDU1OWY4NWVhYWQxZGQ4ZDgzOWUwMjE5NjI4MjdhZTM5MTcyMWNiZg==',
};

// LiveScore sidebar
export const LIVESCORE_API = 'https://www.livescore.bz/api.livescore.0.1.js';

// Flag CDN
export const FLAG_CDN = 'https://flagcdn.com/w80';

export const getFlag = (code: string) => `${FLAG_CDN}/${code}.png`;
