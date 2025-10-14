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
  const openRouterApiKey = process.env.OPENROUTER_API_KEY;

  if (!openRouterApiKey) {
    console.error("Clé API OpenRouter manquante dans les variables d'environnement.");
    return res.status(500).json({ error: "Configuration du serveur incomplète." });
  }

  // Si on a des données en cache, on les renvoie directement
  if (newsCache && !force) { // Ignorer le cache si force=true
    return res.json(newsCache);
  }

  try {
    // 1. Construire le prompt pour l'IA
    const prompt = `
      Tu es un journaliste sportif. Cherche sur internet les 4 dernières actualités importantes du football mondial (transferts, résultats marquants, blessures de joueurs clés).
      Pour chaque actualité, rédige un titre et un court résumé.
      Fournis ta réponse dans un format de tableau JSON strict. Chaque objet doit avoir les clés "title" et "excerpt".
      Exemple: [{"title": "Mbappé au Real Madrid", "excerpt": "Le transfert est officiel, l'attaquant français rejoint le club espagnol pour 5 saisons."}]
      Ne réponds rien d'autre que le tableau JSON.
    `;

    // 2. Appeler l'IA
    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
      model: "mistralai/mistral-7b-instruct:free", // Modèle gratuit et stable
      messages: [{ role: "user", content: prompt }]
    }, {
      headers: { "Authorization": `Bearer ${openRouterApiKey}` },
      timeout: 30000
    });

    let rawResponse = response.data?.choices?.[0]?.message?.content;
    const jsonMatch = rawResponse.match(/(\[[\s\S]*\])/);
    if (!jsonMatch) throw new Error("La réponse de l'IA pour les news ne contient pas de JSON valide.");
    
    const newsData = JSON.parse(jsonMatch[0]);
    if (!Array.isArray(newsData)) throw new Error("Le JSON des news n'est pas un tableau.");

    newsCache = newsData;
    setTimeout(() => { newsCache = null; }, 1000 * 60 * 10); // Cache de 10 minutes
    res.json(newsData);

  } catch (error) {
    console.error("Erreur lors de la génération des actualités:", error.message);
    res.status(500).json({ 
      error: "Impossible de générer les actualités pour le moment." 
    });
  }
});

// Endpoint pour les statistiques
app.get("/latest-stats", async (req, res) => {
  const openRouterApiKey = process.env.OPENROUTER_API_KEY;

  if (!openRouterApiKey) {
    console.error("Clé API OpenRouter manquante dans les variables d'environnement.");
    return res.status(500).json({ error: "Configuration du serveur incomplète." });
  }

  if (statsCache) {
    return res.json(statsCache);
  }

  try {
    const prompt = `
      Cherche sur internet les statistiques de football les plus récentes pour la saison en cours.
      Fournis les informations dans un format JSON strict avec exactement ces trois clés : "topScorers", "possession", "goalsByLeague".
      - "topScorers": un tableau des 5 meilleurs buteurs d'un grand championnat européen (ex: La Liga), chaque objet avec "name" et "goals".
      - "possession": un tableau des 5 équipes avec la meilleure possession de balle en Europe, chaque objet avec "team" et "percentage".
      - "goalsByLeague": un tableau des 5 grands championnats européens, chaque objet avec "league" et "avgGoals".
      Ne réponds rien d'autre que l'objet JSON.
    `;

    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
      model: "mistralai/mistral-7b-instruct:free", // Modèle gratuit et stable
      response_format: { "type": "json_object" },
      messages: [{ role: "user", content: prompt }]
    }, {
      headers: { "Authorization": `Bearer ${openRouterApiKey}` },
      timeout: 45000
    });

    const statsData = JSON.parse(response.data?.choices?.[0]?.message?.content);
    statsCache = statsData;
    setTimeout(() => { statsCache = null; }, 1000 * 60 * 60 * 3); // Cache de 3 heures
    res.json(statsData);

  } catch (error) {
    console.error("Erreur lors de la génération des statistiques:", error.message);
    res.status(500).json({ 
      error: "Impossible de générer les statistiques pour le moment." 
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
      model: "mistralai/mistral-7b-instruct:free", // Modèle gratuit et stable
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
