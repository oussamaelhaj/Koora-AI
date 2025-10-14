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

// Cache en mémoire pour les actualités et les stats
let newsCache = null;
let statsCache = null;

// NOUVEL ENDPOINT POUR LES ACTUALITÉS AUTOMATIQUES
app.get("/latest-news", async (req, res) => {
  const openRouterApiKey = process.env.OPENROUTER_API_KEY;

  if (!openRouterApiKey) {
    console.error("Clé API OpenRouter manquante.");
    return res.status(500).json({ error: "Configuration du serveur incomplète." });
  }

  // Si on a des données en cache, on les renvoie directement
  if (newsCache) {
    return res.json(newsCache);
  }

  try {
    // 1. Construire le prompt pour l'IA avec recherche web
    const prompt = `
      Tu es un commentateur sportif passionné. Cherche sur internet 3 matchs de football importants qui se jouent MAINTENANT ou qui viennent de se terminer.
      Pour chaque match, rédige un "ticket d'actualité" court et dynamique, comme si tu commentais en direct.
      Fournis ta réponse dans un format de tableau JSON strict. Chaque objet doit avoir exactement ces clés : "title" et "excerpt".
      - "title": Le nom des deux équipes qui s'affrontent (ex: "Real Madrid vs FC Barcelona").
      - "excerpt": Un court commentaire de 1-2 phrases sur une action marquante, le score actuel, ou l'enjeu du match (ex: "Quelle tension ! Le score est de 1-1 à la 80ème minute, tout est encore possible !").

      Exemple de format de réponse :
      [
        {
          "title": "Manchester United vs Liverpool",
          "excerpt": "BUT !! Liverpool ouvre le score sur un contre fulgurant ! Le stade est en ébullition !"
        }
      ]
      Ne réponds rien d'autre que le tableau JSON lui-même, sans texte explicatif avant ou après.
    `;

    // 2. Appeler l'IA avec un modèle capable de chercher sur le web
    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
      model: "meta-llama/llama-3-8b-instruct:free", // Modèle gratuit et fiable
      messages: [{ role: "user", content: prompt }]
    }, {
      headers: { "Authorization": `Bearer ${openRouterApiKey}` },
      timeout: 30000 // Ajout d'un timeout de 30 secondes
    });

    // L'IA renvoie une chaîne de caractères qui ressemble à un JSON.
    let rawResponse = response.data?.choices?.[0]?.message?.content;

    // Nettoyage de la réponse pour extraire uniquement le JSON
    // On cherche un bloc de code JSON, même s'il est entouré de ```json ... ```
    const jsonMatch = rawResponse.match(/```json\s*([\s\S]*?)\s*```|(\[[\s\S]*\])/);
    if (!jsonMatch) {
      throw new Error("La réponse de l'IA ne contient pas de JSON valide.");
    }
    // On prend le premier groupe capturé qui n'est pas vide (soit le contenu du bloc de code, soit le tableau directement)
    const jsonString = jsonMatch[1] || jsonMatch[2];

    try {
      const newsData = JSON.parse(jsonString);
      // Vérification supplémentaire : s'assurer que c'est bien un tableau
      if (!Array.isArray(newsData)) {
        throw new Error("Le JSON retourné n'est pas un tableau.");
      }
      newsCache = newsData; // Mettre en cache le résultat
      setTimeout(() => { newsCache = null; }, 1000 * 60 * 10); // Vider le cache après 10 minutes pour des infos plus fraîches
      res.json(newsData);
    } catch (parseError) {
      console.error("Erreur de parsing JSON:", parseError.message);
      console.error("Réponse brute de l'IA qui a causé l'erreur:", rawResponse);
      throw new Error("Le format JSON renvoyé par l'IA est invalide.");
    }
  } catch (error) {
    console.error("Erreur lors de la génération des actualités:", error.response ? error.response.data : error.message);
    // Renvoyer un message d'erreur clair au front-end
    res.status(500).json({ 
      error: "L'assistant IA n'a pas pu générer les actualités. Veuillez réessayer dans un instant." 
    });
  }
});

// NOUVEL ENDPOINT POUR LES STATISTIQUES AUTOMATIQUES
app.get("/latest-stats", async (req, res) => {
  const openRouterApiKey = process.env.OPENROUTER_API_KEY;

  if (!openRouterApiKey) {
    return res.status(500).json({ error: "Configuration du serveur incomplète." });
  }

  // Si on a des données en cache, on les renvoie directement
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
      
      Exemple de format de réponse attendu :
      {
        "topScorers": [
          {"name": "Joueur A", "goals": 30},
          {"name": "Joueur B", "goals": 28}
        ],
        "possession": [
          {"team": "Équipe X", "percentage": 65.5},
          {"team": "Équipe Y", "percentage": 64.2}
        ],
        "goalsByLeague": [
          {"league": "Premier League", "avgGoals": 3.1},
          {"league": "Bundesliga", "avgGoals": 3.0}
        ]
      }
      Ne réponds rien d'autre que l'objet JSON.
    `;

    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
      model: "meta-llama/llama-3-8b-instruct:free", // Modèle gratuit et fiable
      response_format: { "type": "json_object" },
      messages: [{ role: "user", content: prompt }]
    }, {
      headers: { "Authorization": `Bearer ${openRouterApiKey}` },
      timeout: 45000
    });

    let rawResponse = response.data?.choices?.[0]?.message?.content;
    if (!rawResponse) {
      throw new Error("La réponse de l'IA pour les statistiques est vide.");
    }

    try {
      const statsData = JSON.parse(rawResponse);
      // Vérification supplémentaire
      if (typeof statsData !== 'object' || statsData === null || Array.isArray(statsData)) {
        throw new Error("Le JSON retourné pour les statistiques n'est pas un objet valide.");
      }
      statsCache = statsData; // Mettre en cache le résultat
      setTimeout(() => { statsCache = null; }, 1000 * 60 * 60 * 3); // Vider le cache après 3 heures
      res.json(statsData);
    } catch (parseError) {
      console.error("Erreur de parsing JSON pour les statistiques:", parseError.message);
      console.error("Réponse brute de l'IA (stats):", rawResponse);
      throw new Error("Le format JSON renvoyé par l'IA pour les statistiques est invalide.");
    }

  } catch (error) {
    console.error("Erreur lors de la génération des statistiques:", error.response ? error.response.data : error.message);
    res.status(500).json({ 
      error: "L'assistant IA n'a pas pu générer les statistiques. Veuillez réessayer." 
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
    console.error("Erreur lors de l'appel à l'IA ou du scraping:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Une erreur est survenue lors de la génération de la réponse." });
  }
});

app.listen(PORT, () => console.log(`Koora-AI API démarré sur http://localhost:${PORT}`));
