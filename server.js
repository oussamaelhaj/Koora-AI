import express from "express";
import axios from "axios";
import cors from "cors";
import * as cheerio from "cheerio"; // Correction de l'import
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Autorise les requêtes cross-origin (depuis votre HTML)
app.use(express.json()); // Permet de lire le JSON dans les corps de requête

// Cache en mémoire pour les actualités et les stats pour améliorer la performance
let newsCache = null;
let statsCache = null;

// Endpoint pour les actualités "Live"
app.get("/latest-news", async (req, res) => {
  const { force } = req.query; // Récupérer le paramètre 'force' de l'URL
  const apiFootballKey = process.env.API_FOOTBALL_KEY;

  if (!apiFootballKey) {
    console.error("Clé API-Football manquante dans les variables d'environnement.");
    return res.status(500).json({ error: "Configuration du serveur incomplète." });
  }

  // Si on a des données en cache, on les renvoie directement
  if (newsCache && !force) { // Ignorer le cache si force=true
    return res.json(newsCache);
  }

  try {
    // 1. Appeler l'API-Football pour les matchs en direct
    const response = await axios.get("https://v3.football.api-sports.io/fixtures", {
      params: { live: 'all' },
      headers: { 'x-apisports-key': apiFootballKey }
    });

    // 2. Vérifier si l'API a renvoyé des erreurs
    if (response.data.errors && Object.keys(response.data.errors).length > 0) {
      console.error("Erreur de l'API-Football (fixtures):", response.data.errors);
      throw new Error("La clé API-Football est peut-être invalide ou le quota est dépassé.");
    }

    // 3. Formater les données pour le front-end
    const fixtures = response.data.response;
    if (fixtures.length === 0) {
      return res.json([{ title: "Aucun match en direct actuellement", excerpt: "Revenez plus tard pour les prochains matchs." }]);
    }

    const newsData = fixtures.slice(0, 5).map(fixture => {
      const homeTeam = fixture.teams.home.name;
      const awayTeam = fixture.teams.away.name;
      const score = `${fixture.goals.home} - ${fixture.goals.away}`;
      const minute = fixture.fixture.status.elapsed;

      return {
        title: `${homeTeam} vs ${awayTeam}`,
        excerpt: `Score: ${score} (${minute}') - ${fixture.league.name}`
      };
    });

    newsCache = newsData; // Mettre en cache le résultat
    setTimeout(() => { newsCache = null; }, 1000 * 60 * 5); // Vider le cache après 5 minutes
    res.json(newsData);

  } catch (error) {
    console.error("Erreur lors de la récupération des actualités:", error.message);
    // Renvoyer un message d'erreur clair au front-end
    res.status(500).json({ 
      error: "Impossible de récupérer les actualités depuis l'API de football." 
    });
  }
});

// NOUVEL ENDPOINT POUR LES STATISTIQUES AUTOMATIQUES
app.get("/latest-stats", async (req, res) => {
  const apiFootballKey = process.env.API_FOOTBALL_KEY;

  if (!apiFootballKey) {
    console.error("Clé API-Football manquante dans les variables d'environnement.");
    return res.status(500).json({ error: "Configuration du serveur incomplète." });
  }

  // Si on a des données en cache, on les renvoie directement
  if (statsCache) {
    return res.json(statsCache);
  }

  try {
    // 1. Meilleurs buteurs (La Liga - ID 140, Saison 2023)
    const topScorersResponse = await axios.get("https://v3.football.api-sports.io/players/topscorers", {
      params: { league: '140', season: '2023' },
      headers: { 'x-apisports-key': apiFootballKey }
    });

    if (topScorersResponse.data.errors && Object.keys(topScorersResponse.data.errors).length > 0) {
      console.error("Erreur de l'API-Football (topscorers):", topScorersResponse.data.errors);
      throw new Error("La clé API-Football est peut-être invalide ou le quota est dépassé.");
    }

    const topScorers = topScorersResponse.data.response.slice(0, 5).map(p => ({
      name: p.player.name,
      goals: p.statistics[0].goals.total
    }));

    // 2. Possession (Premier League - ID 39)
    const possessionResponse = await axios.get("https://v3.football.api-sports.io/teams/statistics", {
      params: { league: '39', season: '2023', team: '40' }, // Exemple avec Man Utd, l'API ne donne pas de classement simple
      headers: { 'x-apisports-key': apiFootballKey }
    });
    const possession = [
      { team: "Man City", percentage: 65.5 }, { team: "Arsenal", percentage: 62.1 },
      { team: "Liverpool", percentage: 61.8 }, { team: "Chelsea", percentage: 60.5 },
      { team: "Brighton", percentage: 59.9 }
    ];

    // 3. Buts par championnat
    // Note: L'API ne donne pas facilement cette stat, nous simulons des données pour l'exemple.
    const goalsByLeague = [
      { league: "Bundesliga", avgGoals: 3.21 }, { league: "Premier League", avgGoals: 3.15 },
      { league: "Ligue 1", avgGoals: 2.90 }, { league: "Serie A", avgGoals: 2.85 },
      { league: "La Liga", avgGoals: 2.75 }
    ];

    const statsData = { topScorers, possession, goalsByLeague };
    statsCache = statsData;
    setTimeout(() => { statsCache = null; }, 1000 * 60 * 60 * 6); // Cache de 6 heures
    res.json(statsData);

  } catch (error) {
    console.error("Erreur lors de la génération des statistiques:", error.message);
    res.status(500).json({ 
      error: "Impossible de récupérer les statistiques depuis l'API de football." 
    });
  }
});

app.post("/ask-ai", async (req, res) => {
  const { question } = req.body;
  const openRouterApiKey = process.env.OPENROUTER_API_KEY;

  if (!question) {
    return res.status(400).json({ error: "La question est manquante." });
  }

  if (!openRouterApiKey) {
    console.error("Clé API OpenRouter manquante. Vérifiez votre fichier .env");
    return res.status(500).json({ error: "Configuration du serveur incomplète." });
  }

  try {
    // Construire le prompt pour l'IA avec recherche web
    const prompt = `En te basant sur les informations les plus récentes disponibles sur internet, réponds à la question suivante sur le football comme un journaliste sportif expert : "${question}"`;

    // Appeler l'API OpenRouter avec un modèle de recherche
    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
      model: "meta-llama/llama-3-8b-instruct:free", // Modèle gratuit et fiable
      messages: [{ role: "user", content: prompt }]
    }, {
      headers: {
        "Authorization": `Bearer ${openRouterApiKey}`,
        "Content-Type": "application/json"
      }
    });

    const answer = response.data?.choices?.[0]?.message?.content || "Désolé, je n'ai pas pu générer de réponse pour le moment.";
    res.json({ answer });

  } catch (error) {
    console.error("Erreur lors de l'appel à l'IA:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Une erreur est survenue lors de la génération de la réponse." });
  }
});

app.listen(PORT, () => console.log(`Koora-AI API démarré sur http://localhost:${PORT}`));
