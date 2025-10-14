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

// Endpoint pour les "Faits Surprenants"
app.get("/latest-news", async (req, res) => {
  const openRouterApiKey = process.env.OPENROUTER_API_KEY;

  if (!openRouterApiKey) {
    console.error("Clé API OpenRouter manquante dans les variables d'environnement.");
    return res.status(500).json({ error: "Configuration du serveur incomplète." });
  }

  if (newsCache) {
    return res.json(newsCache);
  }

  try {
    const prompt = `
      Tu es un expert en football. Raconte 5 faits surprenants ou records incroyables de l'histoire du football.
      Chaque fait doit avoir un titre et un court résumé.
      Fournis ta réponse dans un format de tableau JSON strict. Chaque objet doit avoir les clés "title" et "excerpt".
      Exemple: [{"title": "Le but le plus rapide", "excerpt": "Le but le plus rapide de l'histoire a été marqué en seulement 2.4 secondes par Nawaf Al-Abed."}]
      Ne réponds rien d'autre que le tableau JSON.
    `;

    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
      model: "mistralai/mistral-7b-instruct:free",
      messages: [{ role: "user", content: prompt }]
    }, {
      headers: { "Authorization": `Bearer ${openRouterApiKey}` },
      timeout: 30000
    });

    let rawResponse = response.data?.choices?.[0]?.message?.content;
    const jsonMatch = rawResponse.match(/(\[[\s\S]*\])/);
    if (!jsonMatch) throw new Error("La réponse de l'IA pour les faits ne contient pas de JSON valide.");
    
    const newsData = JSON.parse(jsonMatch[0]);
    newsCache = newsData;
    setTimeout(() => { newsCache = null; }, 1000 * 60 * 60 * 24); // Cache de 24 heures
    res.json(newsData);
  } catch (error) {
    console.error("Erreur lors de la génération des faits surprenants:", error.message);
    res.status(500).json({ error: "Impossible de générer les faits surprenants." });
  }
});
// Endpoint pour les histoires du football
app.get("/football-stories", async (req, res) => {
  const openRouterApiKey = process.env.OPENROUTER_API_KEY;

  if (!openRouterApiKey) {
    console.error("Clé API OpenRouter manquante dans les variables d'environnement.");
    return res.status(500).json({ error: "Configuration du serveur incomplète." });
  }

  // Utiliser le cache s'il existe
  if (statsCache) {
    return res.json(statsCache);
  }

  try {
    const prompt = `
      Tu es un conteur passionné par l'histoire du football. Raconte 10 histoires courtes et fascinantes sur des moments légendaires, des joueurs iconiques ou des faits surprenants du football.
      Fournis ta réponse dans un format de tableau JSON strict. Chaque objet doit avoir les clés "title" et "story".
      - "title": Un titre accrocheur pour l'histoire (ex: "La Main de Dieu").
      - "story": L'histoire racontée en 2-4 phrases concises et captivantes.
      Ne réponds rien d'autre que l'objet JSON.
    `;

    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
      model: "mistralai/mistral-7b-instruct:free", // Modèle gratuit et stable
      messages: [{ role: "user", content: prompt }]
    }, {
      headers: { "Authorization": `Bearer ${openRouterApiKey}` },
      timeout: 45000
    });

    let rawResponse = response.data?.choices?.[0]?.message?.content;
    const jsonMatch = rawResponse.match(/(\[[\s\S]*\])/);
    if (!jsonMatch) throw new Error("La réponse de l'IA pour les histoires ne contient pas de JSON valide.");
    
    const storiesData = JSON.parse(jsonMatch[0]);
    statsCache = storiesData; // On réutilise le même cache
    setTimeout(() => { statsCache = null; }, 1000 * 60 * 60 * 24); // Vider le cache après 24 heures
    res.json(storiesData);

  } catch (error) {
    console.error("Erreur lors de la génération des histoires:", error.message);
    res.status(500).json({ 
      error: "Impossible de générer les histoires pour le moment." 
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
