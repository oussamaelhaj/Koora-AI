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
let statsCache = null;
let onThisDayCache = null;
let playerOfTheDayCache = null;

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
      Tu es un conteur passionné par l'histoire du football. Raconte 5 histoires courtes et fascinantes sur des moments légendaires ou des joueurs iconiques (différentes des faits surprenants).
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

// NOUVEL ENDPOINT : "Ce jour-là dans l'histoire"
app.get("/on-this-day", async (req, res) => {
  const openRouterApiKey = process.env.OPENROUTER_API_KEY;

  if (!openRouterApiKey) {
    return res.status(500).json({ error: "Configuration du serveur incomplète." });
  }

  // Utiliser le cache s'il existe
  if (onThisDayCache) {
    return res.json(onThisDayCache);
  }

  try {
    const today = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
    const prompt = `
      Raconte-moi un seul événement marquant de l'histoire du football qui s'est passé le ${today}.
      Fournis ta réponse dans un format JSON strict avec les clés "title" et "event".
      - "title": Le titre de l'événement (ex: "La naissance d'une légende").
      - "event": Une description courte et captivante de l'événement.
      Ne réponds rien d'autre que l'objet JSON.
    `;

    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
      model: "mistralai/mistral-7b-instruct:free",
      response_format: { "type": "json_object" },
      messages: [{ role: "user", content: prompt }]
    }, {
      headers: { "Authorization": `Bearer ${openRouterApiKey}` },
      timeout: 30000
    });

    const onThisDayData = JSON.parse(response.data?.choices?.[0]?.message?.content);
    onThisDayCache = onThisDayData;
    setTimeout(() => { onThisDayCache = null; }, 1000 * 60 * 60 * 24); // Vider le cache après 24 heures
    res.json(onThisDayData);
  } catch (error) {
    console.error("Erreur lors de la génération de 'On This Day':", error.message);
    res.status(500).json({ error: "Impossible de générer l'histoire du jour." });
  }
});

// NOUVEL ENDPOINT : "Joueur du Jour"
app.get("/player-of-the-day", async (req, res) => {
  const openRouterApiKey = process.env.OPENROUTER_API_KEY;

  if (!openRouterApiKey) {
    return res.status(500).json({ error: "Configuration du serveur incomplète." });
  }

  if (playerOfTheDayCache) {
    return res.json(playerOfTheDayCache);
  }

  try {
    const prompt = `
      Tu es un biographe sportif. Choisis un joueur de football légendaire (mort ou vivant) et fournis des informations à son sujet au format JSON strict.
      L'objet doit avoir les clés "name", "bio", "achievements" (un tableau de 3 exploits), et "image_prompt" (une description simple pour une image, ex: "Zinedine Zidane celebrating a goal").
      Ne réponds rien d'autre que l'objet JSON.
    `;

    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
      model: "mistralai/mistral-7b-instruct:free",
      response_format: { "type": "json_object" },
      messages: [{ role: "user", content: prompt }]
    }, {
      headers: { "Authorization": `Bearer ${openRouterApiKey}` },
      timeout: 30000
    });

    const playerData = JSON.parse(response.data?.choices?.[0]?.message?.content);
    if (typeof playerData !== 'object' || !playerData.name) {
      throw new Error("La réponse de l'IA pour le joueur du jour est invalide.");
    }

    playerOfTheDayCache = playerData;
    setTimeout(() => { playerOfTheDayCache = null; }, 1000 * 60 * 60 * 24); // Cache de 24 heures
    res.json(playerData);
  } catch (error) {
    console.error("Erreur lors de la génération du 'Joueur du Jour':", error.message);
    res.status(500).json({ error: "Impossible de générer le joueur du jour." });
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
